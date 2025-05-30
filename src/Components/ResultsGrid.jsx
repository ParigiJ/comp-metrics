import Overview from "../features/stock/Overview";
import KeyDataTable from "../features/stock/KeyDataTable";
import EarningsTable from "../features/stock/EarningsTable";

export default function ResultsGrid({ data }) {
  if (!data) return null;

  const { overview, earnings } = data;

  const ticker = overview.Symbol;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6 bg-white p-6 rounded-xl shadow">
        <Overview {...overview} />
        <KeyDataTable overview={overview} />
      </div>

      <div className="space-y-4 bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold">
          {earnings ? `${ticker} Earnings` : "Earnings"}
        </h2>
        <EarningsTable earnings={earnings.annualEarnings} />
      </div>
    </div>
  );
}
