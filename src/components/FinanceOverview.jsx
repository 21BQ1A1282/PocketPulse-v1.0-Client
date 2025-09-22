import { addThousandSeparator } from "../util/utils";
import CustomPieChart from "./CustomPieChart";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
    // Modern gradient-inspired color palette
    const COLORS = ["#7c3aedc5", "#ef4444", "#22c55e"];

    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Expense", amount: totalExpense },
        { name: "Total Income", amount: totalIncome },
    ];

    return (
        <div className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h5 className="text-2xl font-extrabold text-gray-800 tracking-tight">
                    Financial Overview
                </h5>
            </div>

            {/* Pie Chart */}
            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`₹${addThousandSeparator(totalBalance)}`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    );
};

export default FinanceOverview;
