import { ArrowRight } from "lucide-react";
import moment from "moment";
import TransactionInfoCard from "./TransactionInfoCard";

const Transactions = ({ transactions, onMore, type, title }) => {
    return (
        <div className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h5 className="text-2xl font-extrabold text-gray-800 tracking-tight">
                    {title}
                </h5>
                <button
                    onClick={onMore}
                    className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                    More <ArrowRight size={16} />
                </button>
            </div>

            {/* Transactions List */}
            <div className="space-y-4 mt-6">
                {transactions?.slice(0, 5)?.map(item => (
                    <TransactionInfoCard
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={type}
                        hideDeleteBtn
                        className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl p-4 shadow-sm"
                    />
                ))}
            </div>
        </div>
    );
}

export default Transactions;
