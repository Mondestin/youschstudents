export interface Payment {
  id: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
  paymentMethod?: string;
  receiptUrl?: string;
}

export interface PaymentStats {
  totalPaid: number;
  totalPending: number;
  totalOverdue: number;
  nextPayment?: {
    amount: number;
    dueDate: string;
    description: string;
  };
}

