import { ArrowRight } from "lucide-react";
import moment from "moment";
import TransactionInfoCard from "./TransactionInfoCard";

const RecentTransactions = ({ transactions, onMore }) => {
    return (
        <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h5 className="text-xl font-bold text-gray-800">
                    Recent Transactions
                </h5>
                <button
                    onClick={onMore}
                    className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                    More <ArrowRight size={16} className="ml-1" />
                </button>
            </div>

            {/* Transactions List */}
            <div className="space-y-4">
                {transactions?.slice(0, 5)?.map(item => (
                    <TransactionInfoCard
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                        className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl p-4 shadow-sm"
                    />
                ))}
            </div>
        </div>
    );
}

export default RecentTransactions;
