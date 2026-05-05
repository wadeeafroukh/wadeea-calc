import { FunctionComponent, useState } from "react";
import { Action, Debt } from "../interface/Action";

interface Props {
  actions: Action[];
  debts: Debt[];
  onAddAction: (data: any) => Promise<void>;
  onUpdateAction: (id: string, data: any) => Promise<void>;
  onDeleteAction: (id: string) => Promise<void>;
}

const emptyForm = {
  paymentMethod: "cash",
  type: "income",
  description: "",
  category: "else",
  transferTo: "",
  debtId: "",
  amount: "",
};

const ActionsSection: FunctionComponent<Props> = ({
  actions,
  debts,
  onAddAction,
  onUpdateAction,
  onDeleteAction,
}) => {
  const [form, setForm] = useState<any>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const amount = Number(form.amount);
    if (!form.description || amount <= 0) return;

    const payload: any = {
      paymentMethod: form.paymentMethod,
      type: form.type,
      description: form.description,
      category: form.category,
      amount,
    };

    if (form.type === "transfer") {
      payload.transferTo = form.transferTo || null;
    }

    if (form.type === "debtPayment") {
      payload.debtId = form.debtId || null;
    }

    if (editingId) {
      await onUpdateAction(editingId, payload);
      setEditingId(null);
    } else {
      await onAddAction(payload);
    }

    setForm(emptyForm);
  }

  function handleEdit(action: Action) {
    setEditingId(action._id);

    setForm({
      paymentMethod: action.paymentMethod,
      type: action.type,
      description: action.description,
      category: action.category,
      transferTo: action.transferTo || "",
      debtId: action.debtId || "",
      amount: String(action.amount),
    });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  return (
    <div className="card shadow-sm border-0 p-4">
      <h4 className="fw-bold mb-3">
        {editingId ? "Edit Action" : "Add Action"}
      </h4>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-12 col-md-6">
          <select
            className="form-select"
            value={form.paymentMethod}
            onChange={(e) =>
              setForm({ ...form, paymentMethod: e.target.value })
            }
          >
            <option value="cash">Cash</option>
            <option value="visa">Visa</option>
          </select>
        </div>

        <div className="col-12 col-md-6">
          <select
            className="form-select"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="transfer">Transfer</option>
            <option value="debtPayment">Debt Payment</option>
          </select>
        </div>

        <div className="col-12">
          <input
            className="form-control"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="col-12 col-md-6">
          <select
            className="form-select"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="games">Games</option>
            <option value="weekends">Weekends</option>
            <option value="food">Food</option>
            <option value="else">Else</option>
          </select>
        </div>

        <div className="col-12 col-md-6">
          <input
            type="number"
            className="form-control"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
        </div>

        {form.type === "transfer" && (
          <div className="col-12">
            <select
              className="form-select"
              value={form.transferTo}
              onChange={(e) => setForm({ ...form, transferTo: e.target.value })}
            >
              <option value="">Transfer To</option>
              <option value="cash">Cash</option>
              <option value="visa">Visa</option>
            </select>
          </div>
        )}

        {form.type === "debtPayment" && (
          <div className="col-12">
            <select
              className="form-select"
              value={form.debtId}
              onChange={(e) => setForm({ ...form, debtId: e.target.value })}
            >
              <option value="">Choose Debt</option>
              {debts
                .filter((debt) => !debt.isPaid)
                .map((debt) => (
                  <option key={debt._id} value={debt._id}>
                    {debt.name} - ₪{debt.amount}
                  </option>
                ))}
            </select>
          </div>
        )}

        <div className="col-12 d-flex gap-2">
          <button className="btn btn-primary flex-grow-1" type="submit">
            {editingId ? "Update" : "Add"}
          </button>

          {editingId && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>Description</th>
              <th>Type</th>
              <th>Method</th>
              <th>Category</th>
              <th>Amount</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>

          <tbody>
            {actions.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted py-4">
                  No actions yet
                </td>
              </tr>
            ) : (
              actions.map((action) => (
                <tr key={action._id}>
                  <td>{action.description}</td>
                  <td>
                    <span className="badge bg-light text-dark">
                      {action.type}
                    </span>
                  </td>
                  <td>{action.paymentMethod}</td>
                  <td>{action.category}</td>
                  <td
                    className={
                      action.type === "income"
                        ? "text-success fw-bold"
                        : "text-danger fw-bold"
                    }
                  >
                    ₪{action.amount}
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-warning me-2"
                      onClick={() => handleEdit(action)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDeleteAction(action._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActionsSection;
