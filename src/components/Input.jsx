import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input = ({ label, value, onChange, placeholder, type = "text", isSelect, options }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className="mb-5">
      <label className="text-[13px] text-black block mb-1">
          {label}
      </label>
      <div className="relative">
          {isSelect ? (
            <select
                  className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-black"
                  value={value}
                  onChange={(e) => onChange(e)} 
            >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
            </select>
          ): (
            <input
                className="w-full bg-white outline-none border border-black rounded-md py-2 px-3 pr-10 text-black leading-tight focus:outline-none focus:border-black" 
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                placeholder={placeholder}
                value={value}
                onChange={onChange} />
          )}

          {type === 'password' && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <Eye size={20} className="text-black" />
              ) : (
                <EyeOff size={20} className="text-gray-500" />
              )}
            </button>
          )}
      </div>
    </div>
  );
}

export default Input;
