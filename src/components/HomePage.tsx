import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { Action, Debt } from "../interface/Action";
import { isLoggedIn } from "../service/userServices";

import {
  getActions,
  addAction as addApiAction,
  deleteAction as deleteApiAction,
  updateAction as updateApiAction,
  getDebts,
  addDebt as addApiDebt,
  deleteDebt as deleteApiDebt,
} from "../service/actionServices";

import {
  calcBalance,
  deleteAction as deleteLocalAction,
  updateAction as updateLocalAction,
  deletedebt as deleteLocalDebt,
} from "../service/calcServices";

import ActionsSection from "./ActionsSection";
import DebtsSection from "./DebtsSection";

const HomePage: FunctionComponent = () => {
  const [actions, setActions] = useState<Action[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const member = isLoggedIn();

  const balance = useMemo(() => {
    return calcBalance(
      [...actions],
      debts.map((d) => ({ ...d })),
    );
  }, [actions, debts]);

  useEffect(() => {
    async function loadData() {
      if (!member) return;

      try {
        setLoading(true);
        const [a, d] = await Promise.all([getActions(), getDebts()]);
        setActions(a);
        setDebts(d);
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [member]);

  // ================== ACTIONS ==================

  async function handleAddAction(payload: any) {
    try {
      if (member) {
        const created = await addApiAction(payload);
        setActions((prev) => [...prev, created]);
        return;
      }

      const local: Action = {
        ...payload,
        _id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        isTransferred: false,
      };

      setActions((prev) => [...prev, local]);
    } catch (err: any) {
      console.log("Add Action Error:", err.response?.data);
      setError(err.response?.data || "Failed to add action");
    }
  }

  async function handleUpdateAction(id: string, payload: any) {
    try {
      if (member) {
        const updated = await updateApiAction(id, payload);
        setActions((prev) => prev.map((a) => (a._id === id ? updated : a)));
        return;
      }

      const updatedLocal: Action = {
        ...payload,
        _id: id,
        createdAt: new Date().toISOString(),
        isTransferred: false,
      };

      const next = [...actions];
      updateLocalAction(next, id, updatedLocal, debts);
      setActions(next);
    } catch {
      setError("Failed to update action");
    }
  }

  async function handleDeleteAction(id: string) {
    try {
      if (member) {
        await deleteApiAction(id);
        setActions((prev) => prev.filter((a) => a._id !== id));
        return;
      }

      const next = [...actions];
      deleteLocalAction(next, id, debts);
      setActions(next);
    } catch {
      setError("Failed to delete action");
    }
  }

  // ================== DEBTS ==================

  async function handleAddDebt(payload: any) {
    try {
      if (member) {
        const created = await addApiDebt(payload);
        setDebts((prev) => [...prev, created]);
        return;
      }

      const local: Debt = {
        ...payload,
        _id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };

      setDebts((prev) => [...prev, local]);
    } catch {
      setError("Failed to add debt");
    }
  }

  async function handleDeleteDebt(id: string) {
    try {
      if (member) {
        await deleteApiDebt(id);
        setDebts((prev) => prev.filter((d) => d._id !== id));
        return;
      }

      const next = [...debts];
      deleteLocalDebt(next, id, actions);
      setDebts(next);
    } catch {
      setError("Failed to delete debt");
    }
  }

  return (
    <main className="bg-body-secondary min-vh-100 py-4">
      <div className="container">
        <h1 className="fw-bold mb-4">My Calculator</h1>

        {error && <div className="alert alert-danger">{error}</div>}
        {loading && <div className="alert alert-info">Loading...</div>}

        {/* ===== BALANCE ===== */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 p-3">
              <p className="text-muted mb-1">Cash</p>
              <h2>₪{balance.cashBucket}</h2>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm border-0 p-3">
              <p className="text-muted mb-1">Bank</p>
              <h2>₪{balance.bankBucket}</h2>
            </div>
          </div>
        </div>

        {/* ===== ACTIONS ===== */}
        <div className="mb-5">
          <ActionsSection
            actions={actions}
            debts={debts}
            onAddAction={handleAddAction}
            onUpdateAction={handleUpdateAction}
            onDeleteAction={handleDeleteAction}
          />
        </div>

        {/* ===== DEBTS ===== */}
        <DebtsSection
          debts={debts}
          onAddDebt={handleAddDebt}
          onDeleteDebt={handleDeleteDebt}
        />
      </div>
    </main>
  );
};

export default HomePage;
