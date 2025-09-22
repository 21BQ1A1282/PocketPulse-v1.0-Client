import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// Custom Tooltip for a cleaner look
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-3 bg-white/95 backdrop-blur-md shadow-lg rounded-xl border border-gray-200">
                <p className="text-gray-700 font-semibold">{`${payload[0].name}: ₹${payload[0].value.toLocaleString()}`}</p>
            </div>
        );
    }
    return null;
};

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="rgba(0,0,0,0.1)" />
                    </filter>
                </defs>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={90}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="amount"
                    animationBegin={100}
                    animationDuration={1000}
                    filter="url(#shadow)"
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={`url(#grad-${index})`}
                        />
                    ))}
                </Pie>

                {/* Gradient definitions for each slice */}
                {data.map((entry, index) => (
                    <defs key={`grad-${index}`}>
                        <linearGradient id={`grad-${index}`} x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor={colors[index % colors.length]} stopOpacity={0.85} />
                            <stop offset="100%" stopColor={colors[index % colors.length]} stopOpacity={1} />
                        </linearGradient>
                    </defs>
                ))}

                <Tooltip content={<CustomTooltip />} />
                <Legend iconSize={12} iconType="circle" wrapperStyle={{ fontSize: 14, fontWeight: 500 }} />

                {/* Center label */}
                {showTextAnchor && (
                    <>
                        <text
                            x="50%"
                            y="48%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-xl font-semibold text-gray-500"
                        >
                            {label}
                        </text>
                        <text
                            x="50%"
                            y="58%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-4xl font-bold text-gray-800"
                        >
                            {totalAmount}
                        </text>
                    </>
                )}
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;
