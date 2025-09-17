import { User } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_BAR_DATA } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Sidebar = ({ activeMenu }) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-300 p-5 sticky top-[61px] z-20">
        {/* Profile Section */}
        <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
          {user?.profileImageUrl ? (
            <img
              src={user.profileImageUrl || ""}
              alt="User profile"
              className="w-20 h-20 bg-gray-300 rounded-full object-cover border border-black"
            />
          ) : (
            <User className="w-20 h-20 text-gray-500" />
          )}
          <h5 className="text-black font-semibold leading-6">
            {user.fullName || "Anonymous User"}
          </h5>
        </div>

        {/* Navigation Items */}
        {SIDE_BAR_DATA.map((item, index) => (
          <button
            onClick={() => navigate(item.path)}
            key={`menu_${index}`}
            className={`cursor-pointer w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-colors duration-150 ${
              activeMenu === item.label
                ? "text-white bg-black"
                : "text-black hover:bg-gray-100"
            }`}
          >
            <item.icon className="text-xl" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
