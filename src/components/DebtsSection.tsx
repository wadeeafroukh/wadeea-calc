import { FunctionComponent, useState } from "react";
import { Debt } from "../interface/Action";

interface DebtsSectionProps {
  debts: Debt[];
  onAddDebt: (debtPayload: any) => Promise<void>;
  onDeleteDebt: (debtId: string) => Promise<void>;
}

const DebtsSection: FunctionComponent<DebtsSectionProps> = ({
  debts,
  onAddDebt,
  onDeleteDebt,
}) => {
  const [debtForm, setDebtForm] = useState({
    name: "",
    amount: "",
    category: "else" as Debt["category"],
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const amount = Number(debtForm.amount);
    if (!debtForm.name || amount <= 0) return;

    await onAddDebt({
      name: debtForm.name,
      amount,
      category: debtForm.category,
      isPaid: false,
    });

    setDebtForm({
      name: "",
      amount: "",
      category: "else",
    });
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h3 className="h4 fw-bold mb-3">Debts</h3>

        <form onSubmit={handleSubmit} className="row g-3 mb-4">
          <div className="col-12">
            <label className="form-label">Debt Name</label>
            <input
              className="form-control"
              value={debtForm.name}
              onChange={(e) =>
                setDebtForm({ ...debtForm, name: e.target.value })
              }
              placeholder="Family, study, vehicle..."
            />
          </div>

          <div className="col-12">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="form-control"
              value={debtForm.amount}
              onChange={(e) =>
                setDebtForm({ ...debtForm, amount: e.target.value })
              }
              placeholder="0"
            />
          </div>

          <div className="col-12">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={debtForm.category}
              onChange={(e) =>
                setDebtForm({
                  ...debtForm,
                  category: e.target.value as Debt["category"],
                })
              }
            >
              <option value="family">Family</option>
              <option value="vehicles">Vehicles</option>
              <option value="study">Study</option>
              <option value="else">Else</option>
            </select>
          </div>

          <div className="col-12">
            <button className="btn btn-dark w-100" type="submit">
              Add Debt
            </button>
          </div>
        </form>

        {debts.length === 0 ? (
          <p className="text-muted mb-0">No debts yet</p>
        ) : (
          <div className="list-group">
            {debts.map((debt) => (
              <div
                key={debt._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <div className="fw-semibold">{debt.name}</div>
                  <small className="text-muted">
                    {debt.category} · {debt.isPaid ? "Paid" : "Open"}
                  </small>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <strong>₪{debt.amount}</strong>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDeleteDebt(debt._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DebtsSection;
