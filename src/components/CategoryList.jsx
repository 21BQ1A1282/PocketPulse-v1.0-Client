import { Edit, Folder, TrendingDown, TrendingUp } from "lucide-react";

const CategoryList = ({ categories, onEditCategory }) => {
  return (
    <div className="category-container p-4">
      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <Folder size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No categories yet</h3>
          <p className="text-gray-500 text-sm max-w-md">
            Get started by creating your first category to organize your finances.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
            >
              {/* Header with icon and name */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                      category.type === "income" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {category.icon ? (
                      <img
                        src={category.icon}
                        alt={category.name}
                        className="h-5 w-5 object-contain"
                      />
                    ) : (
                      <Folder
                        size={18}
                        className={category.type === "income" ? "text-green-600" : "text-red-600"}
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{category.name}</p>
                    <div className="flex items-center mt-1">
                      {category.type === "income" ? (
                        <TrendingUp size={12} className="text-green-500 mr-1" />
                      ) : (
                        <TrendingDown size={12} className="text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-xs font-medium uppercase tracking-wide ${
                          category.type === "income" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {category.type}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Edit button */}
                <div className="flex items-center">
                  <button
                    onClick={() => onEditCategory(category)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-black text-sm font-medium hover:bg-black text-white shadow-md transition duration-200"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
