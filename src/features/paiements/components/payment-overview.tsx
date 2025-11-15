'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconCreditCard, IconCheck, IconClock, IconAlertCircle } from '@tabler/icons-react';
import { PaymentStats } from '../types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface PaymentOverviewProps {
  stats: PaymentStats;
}

export default function PaymentOverview({ stats }: PaymentOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Paid */}
      <Card className="py-3 gap-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4">
          <CardTitle className="text-sm font-medium">Total Payé</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-0">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold">
              {stats.totalPaid.toLocaleString('fr-FR')} €
            </span>
            <IconCheck className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Paiements effectués
          </p>
        </CardContent>
      </Card>

      {/* Pending Payments */}
      <Card className="py-3 gap-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4">
          <CardTitle className="text-sm font-medium">En Attente</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-0">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold">
              {stats.totalPending.toLocaleString('fr-FR')} €
            </span>
            <IconClock className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Paiements à venir
          </p>
        </CardContent>
      </Card>

      {/* Overdue Payments */}
      <Card className="py-3 gap-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4">
          <CardTitle className="text-sm font-medium">En Retard</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-0">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold">
              {stats.totalOverdue.toLocaleString('fr-FR')} €
            </span>
            <IconAlertCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Paiements en retard
          </p>
        </CardContent>
      </Card>

      {/* Next Payment */}
      <Card className="py-3 gap-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4">
          <CardTitle className="text-sm font-medium">Prochain Paiement</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pt-0">
          {stats.nextPayment ? (
            <>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold">
                  {stats.nextPayment.amount.toLocaleString('fr-FR')} €
                </span>
                <IconCreditCard className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.nextPayment.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Échéance: {format(new Date(stats.nextPayment.dueDate), 'd MMM yyyy', { locale: fr })}
              </p>
            </>
          ) : (
            <div className="text-xs text-muted-foreground">
              Aucun paiement à venir
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

