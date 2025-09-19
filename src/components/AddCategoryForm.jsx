import { LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react"
import EmojiPickerPopup from "./EmojiPickerPopup"
import Input from "./Input"

const AddCategoryForm = ({ onAddCategory, initialCategoryData, isEditing }) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  })

  const [loading, setLoading] = useState(false);

  const categoryTypeOptions = [
    { label: "Income", value: "income" },
    { label: "Expense", value: "expense" },
  ]

  useEffect(() => {
    if(isEditing && initialCategoryData){
      setCategory(initialCategoryData);
    }else{
      setCategory({name:"", type:"income",icon:""});
    }
  },[isEditing, initialCategoryData]);

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value })
  }

  const handleSubmit = async () => {
    setLoading(true);
    try{
      await onAddCategory(category);
    }finally {
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
              Category Icon
            </label>
            <EmojiPickerPopup 
              icon={category.icon}
              onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
          </div>
          {category.icon && (
            <p className="text-xs text-gray-500 text-center mt-2">
              Click the icon to change it
            </p>
          )}
        </div>

        {/* Form Inputs */}
        <div className="space-y-5">
          <Input
            value={category.name}
            onChange={({ target }) => handleChange("name", target.value)}
            label="Category Name"
            placeholder="e.g. Salary, Food, Shopping"
            type="text"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Type
            </label>
            <div className="flex space-x-4">
              {categoryTypeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleChange("type", option.value)}
                  className={`flex-1 py-3 px-4 rounded-xl border transition-all duration-200 ${
                    category.type === option.value
                      ? option.value === "income"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm"
                        : "border-rose-500 bg-rose-50 text-rose-700 shadow-sm"
                      : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <span className="font-medium">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !category.name.trim()}
            className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center ${
              loading || !category.name.trim()
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-black text-white shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <LoaderCircle className="w-5 h-5 animate-spin" />
                {isEditing ? "Updating..." : "Adding..."}
              </span>
            ) : (
              <span>
                {isEditing ? "Update Category" : "Add Category"}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddCategoryForm