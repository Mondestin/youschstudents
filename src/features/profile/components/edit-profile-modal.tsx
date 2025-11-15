'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Form schema - All fields are required and validated
const editProfileSchema = z.object({
  phone: z
    .string({ required_error: 'Le numéro de téléphone est requis' })
    .trim()
    .min(1, { message: 'Le numéro de téléphone est requis' }),
  address: z.object({
    street: z
      .string({ required_error: 'La rue est requise' })
      .trim()
      .min(1, { message: 'La rue est requise' }),
    city: z
      .string({ required_error: 'La ville est requise' })
      .trim()
      .min(1, { message: 'La ville est requise' }),
    postalCode: z
      .string({ required_error: 'Le code postal est requis' })
      .trim()
      .min(1, { message: 'Le code postal est requis' }),
    country: z
      .string({ required_error: 'Le pays est requis' })
      .trim()
      .min(1, { message: 'Le pays est requis' })
  }),
  emergencyContact: z.object({
    name: z
      .string({ required_error: 'Le nom est requis' })
      .trim()
      .min(1, { message: 'Le nom est requis' }),
    relationship: z
      .string({ required_error: 'La relation est requise' })
      .trim()
      .min(1, { message: 'La relation est requise' }),
    phone: z
      .string({ required_error: 'Le numéro de téléphone est requis' })
      .trim()
      .min(1, { message: 'Le numéro de téléphone est requis' }),
    email: z
      .string({ required_error: 'L\'email est requis' })
      .trim()
      .min(1, { message: 'L\'email est requis' })
      .email({ message: 'Veuillez entrer une adresse email valide' })
  })
});

type EditProfileFormValues = z.infer<typeof editProfileSchema>;

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: {
    phone: string;
    address: {
      street: string;
      city: string;
      postalCode: string;
      country: string;
    };
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
      email: string;
    };
  };
  onSave: (data: EditProfileFormValues) => void;
}

export default function EditProfileModal({
  open,
  onOpenChange,
  initialData,
  onSave
}: EditProfileModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    mode: 'onBlur', // Validate on blur for better UX
    defaultValues: {
      phone: initialData.phone,
      address: initialData.address,
      emergencyContact: initialData.emergencyContact
    }
  });

  // Reset form when modal opens/closes or initialData changes
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      form.reset({
        phone: initialData.phone,
        address: initialData.address,
        emergencyContact: initialData.emergencyContact
      });
    }
    onOpenChange(newOpen);
  };

  const onSubmit = async (data: EditProfileFormValues) => {
    setIsLoading(true);
    try {
      // TODO: Implement API call to save profile data
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      onSave(data);
      toast.success('Profil mis à jour avec succès');
      handleOpenChange(false);
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du profil');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier le profil</DialogTitle>
          <DialogDescription>
            Mettez à jour vos informations de contact et votre contact d'urgence
          </DialogDescription>
        </DialogHeader>

        <Form form={form as any} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Phone Number Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Informations de contact</h3>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+33 6 12 34 56 78"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Adresse</h3>
            <FormField
              control={form.control}
              name="address.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rue</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Rue de la République"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address.postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code postal</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="75001"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ville</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Paris"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pays</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="France"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Emergency Contact Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contact d'urgence</h3>
            <FormField
              control={form.control}
              name="emergencyContact.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Marie Dupont"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyContact.relationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relation</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mère, Père, Conjoint, etc."
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyContact.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+33 6 98 76 54 32"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyContact.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="marie.dupont@email.com"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              {isLoading ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

