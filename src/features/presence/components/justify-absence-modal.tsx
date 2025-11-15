'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { FileUploader } from '@/components/file-uploader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { IconCalendar } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

// Available subjects
const SUBJECTS = ['Mathématiques', 'Physique', 'Français', 'Anglais', 'Histoire'];

// Form schema
const justifyAbsenceSchema = z.object({
  scope: z.enum(['whole_day', 'subject'], {
    required_error: 'Veuillez sélectionner une option'
  }),
  subject: z.string().optional(),
  startDate: z.date({
    required_error: 'La date de début est requise'
  }),
  endDate: z.date({
    required_error: 'La date de fin est requise'
  }).optional(),
  note: z
    .string()
    .min(1, { message: 'La note est requise' })
    .trim()
    .min(1, { message: 'La note est requise' }),
  files: z.array(z.instanceof(File)).optional()
}).refine((data) => {
  if (data.endDate && data.endDate < data.startDate) {
    return false;
  }
  return true;
}, {
  message: 'La date de fin doit être après la date de début',
  path: ['endDate']
}).refine((data) => {
  if (data.scope === 'subject' && !data.subject) {
    return false;
  }
  return true;
}, {
  message: 'Veuillez sélectionner une matière',
  path: ['subject']
});

type JustifyAbsenceFormValues = z.infer<typeof justifyAbsenceSchema>;

interface JustifyAbsenceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: JustifyAbsenceFormValues) => void;
}

export default function JustifyAbsenceModal({
  open,
  onOpenChange,
  onSubmit
}: JustifyAbsenceModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<JustifyAbsenceFormValues>({
    resolver: zodResolver(justifyAbsenceSchema),
    mode: 'onBlur',
    defaultValues: {
      scope: 'whole_day',
      subject: undefined,
      startDate: undefined,
      endDate: undefined,
      note: '',
      files: []
    }
  });

  // Reset form when modal opens/closes
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      form.reset({
        scope: 'whole_day',
        subject: undefined,
        startDate: undefined,
        endDate: undefined,
        note: '',
        files: []
      });
      setFiles([]);
    }
    onOpenChange(newOpen);
  };

  const handleFormSubmit = async (data: JustifyAbsenceFormValues) => {
    setIsLoading(true);
    try {
      // Add files to form data
      const formData = {
        ...data,
        files: files.length > 0 ? files : undefined
      };
      
      // TODO: Implement API call to submit absence justification
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      onSubmit(formData);
      toast.success('Absence justifiée avec succès');
      handleOpenChange(false);
    } catch (error) {
      toast.error('Erreur lors de la justification de l\'absence');
    } finally {
      setIsLoading(false);
    }
  };

  // Update form files when files state changes
  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
    form.setValue('files', newFiles, { shouldValidate: false });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Justifier une absence</DialogTitle>
          <DialogDescription>
            Remplissez le formulaire pour justifier votre absence. Ajoutez des documents justificatifs si nécessaire.
          </DialogDescription>
        </DialogHeader>

        <Form form={form as any} onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Scope Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Portée de l'absence</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="scope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type d'absence *</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        // Clear subject when switching to whole_day
                        if (value === 'whole_day') {
                          form.setValue('subject', undefined);
                        }
                      }}
                      value={field.value}
                      disabled={isLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le type d'absence" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="whole_day">Journée entière</SelectItem>
                        <SelectItem value="subject">Matière spécifique</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch('scope') === 'subject' && (
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matière *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une matière" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SUBJECTS.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          {/* Date Range Selection */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Période d'absence</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date de début *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                            disabled={isLoading}
                          >
                            {field.value ? (
                              format(field.value, 'PPP', { locale: fr })
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                            <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date de fin (optionnel)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                            disabled={isLoading || !form.watch('startDate')}
                          >
                            {field.value ? (
                              format(field.value, 'PPP', { locale: fr })
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                            <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const startDate = form.watch('startDate');
                            if (startDate && date < startDate) return true;
                            return date > new Date();
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Laissez vide si l'absence est d'un seul jour
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Note */}
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note / Raison *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Expliquez la raison de votre absence..."
                    className="min-h-[100px]"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Décrivez la raison de votre absence en détail
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* File Upload */}
          <div className="space-y-2">
            <FormLabel>Documents justificatifs (optionnel)</FormLabel>
            <FileUploader
              value={files}
              onValueChange={handleFilesChange}
              accept={{
                'image/*': ['.png', '.jpg', '.jpeg'],
                'application/pdf': ['.pdf']
              }}
              maxSize={5 * 1024 * 1024} // 5MB
              maxFiles={5}
              multiple={true}
              disabled={isLoading}
            />
            <FormDescription>
              Vous pouvez ajouter jusqu'à 5 fichiers (images ou PDF, max 5MB chacun)
            </FormDescription>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Envoi en cours...' : 'Justifier l\'absence'}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

