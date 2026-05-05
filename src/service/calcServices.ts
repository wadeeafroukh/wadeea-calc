import { Balance, Action } from "../interface/Action";
import { Debt } from "../interface/Action";

export function calcBalance(actions: Action[], debts: Debt[]) {
  const balance: Balance = {
    cashBucket: 0,
    bankBucket: 0,
  };
  actions.forEach((action) => {
    if (action.type === "income") {
      action.paymentMethod === "cash"
        ? (balance.cashBucket += action.amount)
        : (balance.bankBucket += action.amount);
    } else if (action.type === "expense") {
      action.paymentMethod === "cash"
        ? (balance.cashBucket -= action.amount)
        : (balance.bankBucket -= action.amount);
    } else if (action.type === "transfer") {
      switchBalance(balance, action);
    } else if (action.type === "debtPayment") {
      calcDebt(debts, balance, action);
    }
  });
  return balance;
}
export function calcTotal(actions: Action[]) {
  const result = actions.reduce(
    (acc, action) => {
      if (action.type === "income") {
        acc.totalIncome += action.amount;
      } else if (action.type === "expense" || action.type === "debtPayment") {
        acc.totalExpense += action.amount;
      }
      return acc;
    },
    { totalIncome: 0, totalExpense: 0 },
  );
  const net = result.totalIncome - result.totalExpense;
  return {
    totalIncome: result.totalIncome,
    totalExpense: result.totalExpense,
    net,
  };
}
export function actionDetails(actions: Action[], debts: Debt[]) {
  return calcBalance(actions, debts);
}
// Balance calculation for transfer actions
export function switchBalance(balance: Balance, action: Action) {
  if (action.type === "transfer" && action.transferTo === "cash") {
    balance.bankBucket -= action.amount;
    balance.cashBucket += action.amount;
  } else if (action.type === "transfer" && action.transferTo === "visa") {
    balance.cashBucket -= action.amount;
    balance.bankBucket += action.amount;
  }
}

// Debts calculation

export function calcDebt(debts: Debt[], balance: Balance, action: Action) {
  if (!action.debtId || action.amount <= 0) return;

  const debt = debts.find((d) => d._id === action.debtId);
  if (!debt || debt.isPaid || debt.amount <= 0) return;

  // VISA (overdraft allowed)
  if (action.paymentMethod === "visa") {
    const paymentAmount = Math.min(action.amount, debt.amount);

    balance.bankBucket -= paymentAmount;
    debt.amount -= paymentAmount;

    if (debt.amount <= 0) {
      debt.amount = 0;
      debt.isPaid = true;
    }
  }

  // CASH (partial payment, no negative)
  else if (action.paymentMethod === "cash") {
    const paymentAmount = Math.min(
      action.amount,
      debt.amount,
      balance.cashBucket,
    );

    if (paymentAmount <= 0) return;

    balance.cashBucket -= paymentAmount;
    debt.amount -= paymentAmount;

    if (debt.amount <= 0) {
      debt.amount = 0;
      debt.isPaid = true;
    }
  }
}
// Actions logic
export function addAction(actions: Action[], action: Action, debts: Debt[]) {
  if (!actions) return;
  actions.push(action);
  return calcBalance(actions, debts);
}
export function updateAction(
  actions: Action[],
  id: string,
  newAction: Action,
  debts: Debt[],
) {
  let indexToUpdate = actions.findIndex((act) => act._id === id);
  if (indexToUpdate === -1) return;
  actions[indexToUpdate] = newAction;
  return calcBalance(actions, debts);
}

export function deleteAction(actions: Action[], id: string, debts: Debt[]) {
  let indexToDelete = actions.findIndex((act) => act._id === id);
  if (indexToDelete === -1) return;
  actions.splice(indexToDelete, 1);
  return calcBalance(actions, debts);
}

// Debts logic
export function addDebt(debts: Debt[], debt: Debt, actions: Action[]) {
  if (!debts) return;

  debts.push(debt);
  return calcBalance(actions, debts);
}
export function updatedebt(
  debts: Debt[],
  id: string,
  newDebt: Debt,
  actions: Action[],
) {
  let indexToUpdate = debts.findIndex((act) => act._id === id);
  if (indexToUpdate === -1) return;
  debts[indexToUpdate] = newDebt;
  return calcBalance(actions, debts);
}

export function deletedebt(debts: Debt[], id: string, actions: Action[]) {
  let indexToDelete = debts.findIndex((debt) => debt._id === id);
  if (indexToDelete === -1) return;
  debts.splice(indexToDelete, 1);
  return calcBalance(actions, debts);
}
