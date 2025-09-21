import { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../util/prepareExpenseLineChartData";
import CustomLineChart from "./CustomLineChart";

const ExpenseOverview = ({transactions}) => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    console.log(result);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
            <div>
                <h5 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                    Expense Overview
                </h5>
                <p className="text-gray-500 text-sm mt-1">
                    Track your Spending over time and analyze your expense trends
                </p>
            </div>
        </div>
        <div className="font-bold text-gray-650 mt-10">
            <CustomLineChart data={chartData} />
        </div>
      </div>
    </div>
  )
}

export default ExpenseOverview;