import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"/>

      {/* Modal container */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4 animate-fadeIn">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Content */}
        <div className="p-5md:p-6 text-gray-700">
            {children}
        </div>
      </div>
      
    </div>
  );
};

export default Modal;
