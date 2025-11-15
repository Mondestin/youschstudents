'use client';

import { useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import PaymentOverview from '@/features/paiements/components/payment-overview';
import PaymentsTable from '@/features/paiements/components/payments-table';
import PaymentCalendar from '@/features/paiements/components/payment-calendar';
import MakePaymentModal from '@/features/paiements/components/make-payment-modal';
import { mockPaymentStats, mockPayments } from '@/features/paiements/mock-data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { IconHistory, IconCalendar, IconCreditCard } from '@tabler/icons-react';

export default function RapportPaiementsPage() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleMakePayment = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    // TODO: Refresh payment data after successful payment
    console.log('Payment successful, refresh data...');
  };
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rapport de paiements</h1>
            <p className="text-muted-foreground">
              Gérez et consultez vos paiements et factures
            </p>
          </div>
        </div>

        {/* Payment Overview */}
        <PaymentOverview stats={mockPaymentStats} />

        {/* Main Content */}
        <Tabs defaultValue="history" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="h-auto bg-transparent p-0 gap-0 border-b border-border rounded-none border-t-0 border-l-0 border-r-0">
              <TabsTrigger 
                value="history"
                className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
              >
                <IconHistory className="h-4 w-4 mr-2" />
                Historique
              </TabsTrigger>
              <TabsTrigger 
                value="schedule"
                className="rounded-none border-0 border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
              >
                <IconCalendar className="h-4 w-4 mr-2" />
                Calendrier
              </TabsTrigger>
            </TabsList>
            <div className="flex justify-end">
              <Button onClick={handleMakePayment}>
                <IconCreditCard className="h-4 w-4 mr-2" />
                Faire un paiement
              </Button>
            </div>
          </div>

          <TabsContent value="history" className="space-y-4">
            <PaymentsTable payments={mockPayments} />
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <PaymentCalendar payments={mockPayments} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Make Payment Modal */}
      <MakePaymentModal
        open={isPaymentModalOpen}
        onOpenChange={setIsPaymentModalOpen}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </PageContainer>
  );
}
