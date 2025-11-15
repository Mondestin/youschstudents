'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Payment } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { IconDownload, IconFileText } from '@tabler/icons-react';

interface ReceiptsListProps {
  payments: Payment[];
}

export default function ReceiptsList({ payments }: ReceiptsListProps) {
  // Filter only paid payments with receipts
  const receipts = payments.filter(
    (payment) => payment.status === 'paid' && payment.receiptUrl
  );

  const handleDownload = (receiptUrl: string, description: string) => {
    // In a real app, this would download the receipt
    // For now, we'll just log it
    console.log('Download receipt:', receiptUrl, description);
    // You could create a download link:
    // const link = document.createElement('a');
    // link.href = receiptUrl;
    // link.download = `${description}.pdf`;
    // link.click();
  };

  if (receipts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reçus de paiement</CardTitle>
          <CardDescription>
            Téléchargez vos reçus de paiement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground">
            <IconFileText className="h-12 w-12 mb-4 opacity-50" />
            <p>Aucun reçu disponible</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reçus de paiement</CardTitle>
        <CardDescription>
          Téléchargez vos reçus de paiement ({receipts.length} reçu(s) disponible(s))
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {receipts.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <IconFileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{payment.description}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Payé le {payment.paidDate && format(new Date(payment.paidDate), 'd MMMM yyyy', { locale: fr })}
                    {payment.paymentMethod && ` • ${payment.paymentMethod}`}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-lg">
                    {payment.amount.toLocaleString('fr-FR')} €
                  </div>
                  <Badge variant="outline" className="mt-1 bg-green-50 text-green-700 border-green-200">
                    Payé
                  </Badge>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="ml-4"
                onClick={() => handleDownload(payment.receiptUrl!, payment.description)}
              >
                <IconDownload className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

