import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import EmojiPickerPopup from "./EmojiPickerPopup";
import Input from "./Input";

const AddIncomeForm = ({ onAddIncome, categories }) => {
  const [income, setIncome] = useState({
    name: '',
    amount: '',
    date: '',
    icon: '',
    categoryId: ''
  });

  const [loading, setLoading] = useState(false);

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name
  }))

  useEffect(() => {
    if (categories.length > 0 && !income.categoryId) {
      setIncome((prev) => ({ ...prev, categoryId: categories[0].id }))
    }
  }, [categories, income.categoryId]);

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  }

  const handleAddIncome = async () => {
    setLoading(true);
    try {
      await onAddIncome(income);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-1">
      <div className="space-y-6">
        {/* Icon Selection */}
        <div className="flex flex-col items-center">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
              Income Icon
            </label>
            <EmojiPickerPopup
              icon={income.icon}
              onSelect={(selectedIcon) => handleChange('icon', selectedIcon)} />
          </div>
          {income.icon && (
            <p className="text-xs text-gray-500 text-center mt-2">
              Click the icon to change it
            </p>
          )}
        </div>

        {/* Form Inputs */}
        <div className="space-y-5">
          <Input
            value={income.name}
            onChange={({ target }) => handleChange('name', target.value)}
            label="Income Source"
            placeholder="e.g., Salary, Bonus, Freelance"
            type="text" />

          <Input
            value={income.categoryId}
            onChange={({ target }) => handleChange('categoryId', target.value)}
            label="Category"
            isSelect={true}
            options={categoryOptions} />

          <Input
            value={income.amount}
            onChange={({ target }) => handleChange('amount', target.value)}
            label="Amount"
            placeholder="e.g., 100.00"
            type="number" />

          <Input
            value={income.date}
            onChange={({ target }) => handleChange('date', target.value)}
            label="Date"
            placeholder=""
            type="date" />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleAddIncome}
            disabled={loading || !income.name.trim() || !income.amount}
            className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center ${
              loading || !income.name.trim() || !income.amount
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-black text-white shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <LoaderCircle className="w-5 h-5 animate-spin" />
                Adding...
              </span>
            ) : (
              <span>
                Add Income
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
export default AddIncomeForm