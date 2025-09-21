import { MoreVertical, Trash2, TrendingDown, TrendingUp, UtensilsCrossed } from "lucide-react";
import { useState } from "react";
import { addThousandSeparator } from "../util/utils";

const TransactionInfoCard = ({ icon, title, date, amount, type, hideDeleteBtn, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);
  const isIncome = type === "income";
  
  const amountClasses = isIncome
    ? "text-emerald-700 bg-emerald-50 border-emerald-100"
    : "text-rose-700 bg-rose-50 border-rose-100";

  const iconContainerClasses = isIncome
    ? "bg-emerald-100 text-emerald-700"
    : "bg-rose-100 text-rose-700";

  return (
    <div className="group relative flex items-center gap-4 p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-all duration-300">
      {/* Icon with colored background based on type */}
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${iconContainerClasses}`}>
        {icon ? (
          <img src={icon} alt={title} className="h-6 w-6 object-contain" />
        ) : (
          <UtensilsCrossed size={20} />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex items-center justify-between min-w-0">
        <div className="min-w-0 pr-2">
          <p className="text-base font-semibold text-gray-900 truncate">{title}</p>
          <p className="text-xs text-gray-500 mt-1 flex items-center">
            <span className="bg-gray-100 py-0.5 px-2 rounded-full">{date}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Amount */}
          <div
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold border ${amountClasses}`}>
            {isIncome ? (
              <TrendingUp size={16} className="flex-shrink-0" />
            ) : (
              <TrendingDown size={16} className="flex-shrink-0" />
            )}
            <span>{isIncome ? "+" : "-"} ${addThousandSeparator(amount)}</span>
          </div>

          {/* Options Menu */}
          {!hideDeleteBtn && (
            <div className="relative">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                <MoreVertical size={18} />
              </button>
              
              {showOptions && (
                <>
                  {/* Backdrop */}
                  <div className="fixed inset-0 z-10" onClick={() => setShowOptions(false)} />
            
                  {/* Options dropdown */}
                  <div className="absolute right-0 top-full mt-1 z-20 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                    <button
                      onClick={() => {
                        setShowOptions(false);
                        onDelete();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors">
                      <Trash2 size={16} />
                      <span>Delete</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;