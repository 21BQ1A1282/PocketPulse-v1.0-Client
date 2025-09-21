import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const DeleteAlert = ({ content, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-1">
      <div className="space-y-6">
        <p className="text-sm text-gray-700">
          {content}
        </p>

        {/* Delete Button */}
        <div className="pt-4">
          <button
            onClick={handleDelete}
            disabled={loading}
            type="button"
            className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center ${
              loading
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-rose-600 text-white shadow-md hover:shadow-lg hover:bg-rose-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <LoaderCircle className="w-5 h-5 animate-spin" />
                Deleting...
              </span>
            ) : (
              <span>
                Delete Income
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteAlert