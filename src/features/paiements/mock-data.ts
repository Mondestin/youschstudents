import { Payment, PaymentStats } from './types';

export const mockPaymentStats: PaymentStats = {
  totalPaid: 2450.00,
  totalPending: 850.00,
  totalOverdue: 0,
  nextPayment: {
    amount: 425.00,
    dueDate: '2024-12-15',
    description: 'Frais de scolarité - Trimestre 2'
  }
};

export const mockPayments: Payment[] = [
  {
    id: '1',
    description: 'Frais de scolarité - Trimestre 1',
    amount: 425.00,
    status: 'paid',
    dueDate: '2024-09-15',
    paidDate: '2024-09-10',
    paymentMethod: 'Virement bancaire',
    receiptUrl: '/receipts/1.pdf'
  },
  {
    id: '2',
    description: 'Frais d\'inscription',
    amount: 150.00,
    status: 'paid',
    dueDate: '2024-09-01',
    paidDate: '2024-08-28',
    paymentMethod: 'Carte bancaire',
    receiptUrl: '/receipts/2.pdf'
  },
  {
    id: '3',
    description: 'Frais de laboratoire',
    amount: 75.00,
    status: 'paid',
    dueDate: '2024-10-01',
    paidDate: '2024-09-28',
    paymentMethod: 'Espèces',
    receiptUrl: '/receipts/3.pdf'
  },
  {
    id: '4',
    description: 'Frais de bibliothèque',
    amount: 50.00,
    status: 'paid',
    dueDate: '2024-10-15',
    paidDate: '2024-10-12',
    paymentMethod: 'Virement bancaire',
    receiptUrl: '/receipts/4.pdf'
  },
  {
    id: '5',
    description: 'Frais de scolarité - Trimestre 2',
    amount: 425.00,
    status: 'pending',
    dueDate: '2024-12-15',
    paymentMethod: undefined
  },
  {
    id: '6',
    description: 'Frais d\'examen',
    amount: 200.00,
    status: 'pending',
    dueDate: '2024-12-20',
    paymentMethod: undefined
  },
  {
    id: '7',
    description: 'Frais de matériel pédagogique',
    amount: 175.00,
    status: 'pending',
    dueDate: '2025-01-10',
    paymentMethod: undefined
  }
];

