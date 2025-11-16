'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IconX, IconCheck } from '@tabler/icons-react';
import { toast } from 'sonner';

interface SignatureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSign: () => void;
  subjectTitle: string;
}

export default function SignatureModal({
  open,
  onOpenChange,
  onSign,
  subjectTitle
}: SignatureModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureCode, setSignatureCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [hasDrawnSignature, setHasDrawnSignature] = useState(false);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setHasDrawnSignature(false);
  }, []);

  // Generate random 4-digit code when modal opens
  useEffect(() => {
    if (open) {
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedCode(code);
      setSignatureCode('');
      setHasDrawnSignature(false);
      clearCanvas();
    }
  }, [open, clearCanvas]);

  // Initialize canvas
  useEffect(() => {
    if (!open) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Wait for next frame to ensure canvas is rendered
    const timeoutId = setTimeout(() => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size accounting for device pixel ratio
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Set display size
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      // Set internal size (multiplied by DPR for crisp rendering)
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Scale context to account for device pixel ratio
      // This ensures 1 unit in context = 1 pixel on screen
      ctx.scale(dpr, dpr);

      // Set drawing style
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [open]);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    let clientX: number;
    let clientY: number;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    // Return coordinates relative to the canvas display size
    // The context is already scaled by DPR, so we don't multiply here
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    // Check for signature after a short delay to ensure canvas is updated
    setTimeout(() => {
      checkSignature();
    }, 50);
  };

  const checkSignature = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      setHasDrawnSignature(false);
      return false;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setHasDrawnSignature(false);
      return false;
    }
    
    // Get image data from the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Count non-transparent pixels (checking RGB channels, not alpha)
    // A signature should have a meaningful amount of drawn pixels
    let drawnPixels = 0;
    const minPixelsForSignature = 50; // Minimum number of pixels to consider it a signature
    
    for (let i = 0; i < data.length; i += 4) {
      // Check if pixel is not white/transparent (R, G, B channels)
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      
      // Consider it drawn if alpha > 0 and it's not white (255, 255, 255)
      if (a > 0 && !(r === 255 && g === 255 && b === 255)) {
        drawnPixels++;
      }
    }
    
    const hasSig = drawnPixels >= minPixelsForSignature;
    setHasDrawnSignature(hasSig);
    return hasSig;
  }, []);

  const handleSubmit = () => {
    // Re-check signature before submitting to ensure it's still valid
    const hasSignature = checkSignature();
    
    if (!hasSignature) {
      toast.error('Veuillez dessiner votre signature');
      return;
    }

    // Signature is valid - code validation removed, any code is accepted
    toast.success('Signature enregistrée avec succès');
    onSign();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Signer l'assiduité</DialogTitle>
          <DialogDescription>
            Dessinez votre signature et entrez le code de validation pour {subjectTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Canvas */}
          <div className="border-2 border-dashed border-border rounded-lg p-2">
            <canvas
              ref={canvasRef}
              className="w-full h-48 cursor-crosshair touch-none bg-white rounded"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">Dessinez votre signature ci-dessus</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCanvas}
                className="text-xs"
              >
                <IconX className="h-4 w-4 mr-1" />
                Effacer
              </Button>
            </div>
          </div>

          {/* Code Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Entrez le code de validation</label>
            <Input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={signatureCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                setSignatureCode(value);
              }}
              placeholder="0000"
              className="text-center text-2xl font-bold tracking-widest"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
          >
            <IconCheck className="h-4 w-4 mr-2" />
            Valider la signature
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

