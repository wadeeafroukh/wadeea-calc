import { useEffect, useState } from "react";
import { getStats } from "../service/actionServices";

interface StatsBlock {
  totalIncome: number;
  totalExpense: number;
  net: number;
}

interface StatsResponse {
  weeklyStats: StatsBlock;
  monthlyStats: StatsBlock;
}

export default function StatsPage() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getStats();
        setStats(data);
      } catch (err) {
        setError("Failed to load stats");
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) return <div className="stats-message">Loading stats...</div>;
  if (error) return <div className="stats-message error">{error}</div>;
  if (!stats) return <div className="stats-message">No stats found</div>;

  return (
    <main className="stats-page">
      <section className="stats-header">
        <p className="stats-label">Financial Overview</p>
        <h1>Your Stats</h1>
        <p className="stats-subtitle">
          Track your income, expenses, and net balance weekly and monthly.
        </p>
      </section>

      <section className="stats-grid">
        <StatsCard title="This Week" stats={stats.weeklyStats} />
        <StatsCard title="This Month" stats={stats.monthlyStats} />
      </section>
    </main>
  );
}

function StatsCard({ title, stats }: { title: string; stats: StatsBlock }) {
  return (
    <article className="stats-card">
      <h2>{title}</h2>

      <div className="stats-row income">
        <span>Total Income</span>
        <strong>₪{stats.totalIncome}</strong>
      </div>

      <div className="stats-row expense">
        <span>Total Expense</span>
        <strong>₪{stats.totalExpense}</strong>
      </div>

      <div
        className={`stats-row net ${stats.net >= 0 ? "positive" : "negative"}`}
      >
        <span>Net</span>
        <strong>₪{stats.net}</strong>
      </div>
    </article>
  );
}
