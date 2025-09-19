import { Edit3, Folder, TrendingDown, TrendingUp } from "lucide-react";

const CategoryList = ({ categories, onEditCategory }) => {
  return (
    <div className="category-container p-6">
      {categories.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-gray-100 to-gray-200 flex items-center justify-center mb-6 shadow-inner">
            <Folder size={52} className="text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No categories yet</h3>
          <p className="text-gray-500 max-w-md leading-relaxed">
            Get started by creating your first category to organize your finances.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-white/80 backdrop-blur-md border border-gray-200/70 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col hover:scale-[1.02]">
              {/* Category type indicator bar */}
              <div className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl`} />

              {/* Icon and name */}
              <div className="flex items-center mb-5 pl-3">
                <div className={`w-14 h-14 flex items-center justify-center rounded-xl shadow-sm}`}>
                  {category.icon ? (
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="h-7 w-7 object-contain" />
                  ) : (
                    <Folder size={26} />
                  )}
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <p className="text-lg font-bold text-gray-900 truncate">
                    {category.name}
                  </p>
                  <div className="flex items-center mt-1 text-sm">
                    {category.type === "income" ? (
                      <TrendingUp size={16} className="text-emerald-500 mr-1.5" />
                    ) : (
                      <TrendingDown size={16} className="text-rose-500 mr-1.5" />
                    )}
                    <span className="font-medium text-gray-500 uppercase tracking-wide">
                      {category.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit button */}
              <button
                onClick={() => onEditCategory(category)}
                className="mt-auto flex items-center justify-center w-full py-2.5 rounded-xl bg-gray-50 text-gray-600 font-medium hover:bg-black hover:text-white transition-colors duration-200 shadow-sm">
                <Edit3 size={16} className="mr-2" />
                  Edit Category
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
