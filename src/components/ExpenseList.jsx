import { Download, LoaderCircle, Mail, TrendingDown } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import TransactionInfoCard from "./TransactionInfoCard";

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail }) => {
  const [emailLoading, setEmailLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleEmail = async () => {
    setEmailLoading(true);
    try {
      await onEmail();
    } finally {
      setEmailLoading(false);
    }
  };

  const handleDownload = async () => {
    setDownloadLoading(true);
    try {
      await onDownload();
    } finally {
      setDownloadLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div>
          <h5 className="text-2xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
            <TrendingDown size={24} className="text-red-500" />
            Expenses
          </h5>
          <p className="text-gray-500 text-sm mt-1">
            {transactions?.length || 0} expenses
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Email Button */}
          <button
            onClick={handleEmail}
            disabled={emailLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium shadow-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {emailLoading ? (
              <>
                <Mail size={16} />
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Emailing...
              </>
            ) : (
              <>
                <Mail size={16} /> Email Report
              </>
            )}
          </button>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={downloadLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white text-sm font-medium shadow-sm hover:shadow-md hover:bg-gray-900 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {downloadLoading ? (
              <>
                <Download size={16} />
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download size={16} /> Export
              </>
            )}
          </button>
        </div>
      </div>

      {/* Content Grid */}
      {transactions?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {transactions.map((expense) => (
            <TransactionInfoCard
              key={expense.id}
              title={expense.name}
              icon={expense.icon}
              date={moment(expense.date).format("Do MMM YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <TrendingDown size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            No expenses yet
          </h3>
          <p className="text-gray-500 text-sm max-w-md">
            Track your spending by adding bills, groceries, utilities, and other expenses.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;