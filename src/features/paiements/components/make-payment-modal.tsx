'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { toast } from 'sonner';

// Payment categories with their amounts
const PAYMENT_CATEGORIES = [
  { id: 'tuition', label: 'Frais de scolarité', amount: 425.00 },
  { id: 'registration', label: "Frais d'inscription", amount: 150.00 },
  { id: 'laboratory', label: 'Frais de laboratoire', amount: 75.00 },
  { id: 'library', label: 'Frais de bibliothèque', amount: 50.00 },
  { id: 'exam', label: "Frais d'examen", amount: 200.00 },
  { id: 'materials', label: 'Frais de matériel pédagogique', amount: 175.00 }
];

interface MakePaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentSuccess?: () => void;
}

export default function MakePaymentModal({
  open,
  onOpenChange,
  onPaymentSuccess
}: MakePaymentModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedCategoryData = PAYMENT_CATEGORIES.find(cat => cat.id === selectedCategory);
  const amount = selectedCategoryData?.amount || 0;

  const handlePayment = async (method: 'airtelmoney' | 'mobilemoney') => {
    if (!selectedCategory) {
      toast.error('Veuillez sélectionner une catégorie de frais');
      return;
    }

    setIsProcessing(true);
    try {
      // TODO: Implement payment processing API call
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      toast.success(`Paiement de ${amount.toLocaleString('fr-FR')} FCFA effectué avec succès via ${method === 'airtelmoney' ? 'Airtel Money' : 'Mobile Money'}`);
      onOpenChange(false);
      setSelectedCategory('');
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
    } catch (error) {
      toast.error('Erreur lors du traitement du paiement');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setSelectedCategory('');
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Faire un paiement</DialogTitle>
          <DialogDescription>
            Sélectionnez la catégorie de frais et choisissez votre méthode de paiement
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie de frais *</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {PAYMENT_CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount Display */}
          {selectedCategory && (
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Montant à payer</span>
                <span className="text-2xl font-bold text-primary">
                  {amount.toLocaleString('fr-FR')} FCFA
                </span>
              </div>
            </div>
          )}

          {/* Payment Methods */}
          {selectedCategory && (
            <div className="space-y-3">
              <Label>Méthode de paiement</Label>
              <div className="grid grid-cols-2 gap-3">
                {/* Airtel Money Button */}
                <Button
                  variant="outline"
                  className="h-auto flex-col gap-2 p-4 hover:bg-muted"
                  onClick={() => handlePayment('airtelmoney')}
                  disabled={isProcessing}
                >
                  <div className="relative h-12 w-24">
                    <Image
                      src="/airtelmoney.png"
                      alt="Airtel Money"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium">Airtel Money</span>
                </Button>

                {/* Mobile Money Button */}
                <Button
                  variant="outline"
                  className="h-auto flex-col gap-2 p-4 hover:bg-muted"
                  onClick={() => handlePayment('mobilemoney')}
                  disabled={isProcessing}
                >
                  <div className="relative h-12 w-24">
                    <Image
                      src="/mobilemoney.png"
                      alt="Mobile Money"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium">Mobile Money</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

