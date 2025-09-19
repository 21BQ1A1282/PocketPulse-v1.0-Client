import EmojiPicker from "emoji-picker-react";
import { Image, X } from "lucide-react";
import { useState } from "react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiClick = (emoji) => {
    onSelect(emoji?.imageUrl || "");
    setIsOpen(false);
  }

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
      {/* Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-12 h-12 flex items-center justify-center text-2xl bg-gray-100 rounded-full shadow-inner group-hover:bg-gray-200 transition-colors">
          {icon ? (
            <img
              src={icon}
              alt="Icon"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <Image className="text-gray-500" />
          )}
        </div>
        <p className="text-sm font-medium text-gray-700 group-hover:text-black">
          {icon ? "Change icon" : "Pick an icon"}
        </p>
      </div>

      {/* Emoji Picker Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dim background */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Picker Card */}
          <div className="relative bg-white border border-gray-200 rounded-xl shadow-2xl w-72 md:w-96 max-h-[400px] flex flex-col animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 px-3 py-2">
              <h4 className="text-sm font-semibold text-gray-700">
                Select an Emoji
              </h4>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Picker */}
            <div className="overflow-y-auto">
              <EmojiPicker
                open={isOpen}
                onEmojiClick={handleEmojiClick}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
