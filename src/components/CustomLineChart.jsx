import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const CustomTooltip = ({ active, payload, dataKey, title, color }) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;
  const formatINR = (amt) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(amt);

  const colorClass = `text-${color}-600`;
  const defaultCategory = title;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 min-w-[250px]">
      <p className="font-bold border-b border-gray-200 pb-2 mb-3">{data.fullDate}</p>
      <p className="text-sm mb-1">
        Total {title}: <span className={`${colorClass} font-bold`}>{formatINR(data[dataKey])}</span>
      </p>
      <p className="text-sm mb-3">Transactions: <span className="font-bold">{data.transactionCount}</span></p>

      {data.transactionDetails?.length > 0 &&
        data.transactionDetails.map((tx, i) => (
          <div key={i} className={`p-2 rounded mb-1 ${i % 2 === 0 ? "bg-gray-50" : ""}`}>
            <p className="text-sm font-medium">{tx.description || `${title} Transaction`}</p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs">
                Amount: <span className={`font-bold ${colorClass}`}>{formatINR(tx.amount)}</span>
              </p>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                {tx.category || defaultCategory}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

const CustomLineChart = ({ data }) => {
  // Auto-detect if we're showing income or expenses
  const hasIncome = data.length > 0 && data[0].income !== undefined;
  const dataKey = hasIncome ? 'income' : 'expenses';
  const title = hasIncome ? 'Income' : 'Expenses';
  const color = hasIncome ? 'green' : 'red';

  const formatINR = (v) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(v);

  const colorConfig = {
    green: {
      gradient: '#22c55e',
      stroke: '#16a34a'
    },
    red: {
      gradient: '#ef4444',
      stroke: '#dc2626'
    }
  };

  const currentColor = colorConfig[color];

  return (
    <div className="w-full h-96 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 25, left: 20, bottom: 15 }}>
          <defs>
            <linearGradient id={`color${title}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={currentColor.gradient} stopOpacity={0.7} />
              <stop offset="100%" stopColor={currentColor.gradient} stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#666", fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#666", fontSize: 12 }} tickFormatter={formatINR} />
          <Tooltip content={<CustomTooltip dataKey={dataKey} title={title} color={color} />} />

          <Area 
            type="monotone" 
            dataKey={dataKey} 
            stroke={currentColor.stroke} 
            strokeWidth={2} 
            fill={`url(#color${title})`} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;