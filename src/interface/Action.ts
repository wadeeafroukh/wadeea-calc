export interface Action {
  _id: string;
  userId?: string;
  paymentMethod: "cash" | "visa";
  type: "income" | "expense" | "transfer" | "debtPayment";
  description: string;
  category: "games" | "weekends" | "food" | "else";
  transferTo?: "cash" | "visa";
  debtId?: string;
  amount: number;
  createdAt: string;
  updatedAt?: string;
  isTransferred: boolean;
}

export interface Balance {
  cashBucket: number;
  bankBucket: number;
}

export interface Debt {
  _id: string;
  userId?: string;
  name: string;
  amount: number;
  isPaid: boolean;
  category: "family" | "vehicles" | "study" | "else";
  createdAt: string;
  updatedAt?: string;
}

export interface ActionState {
  actions: Action[];
  debts: Debt[];
  balance: Balance;
}
