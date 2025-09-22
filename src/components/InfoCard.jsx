const InfoCard = ({ icon, label, value, color }) => {
    return (
        <div className="flex gap-6 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            {/* Icon */}
            <div className={`w-16 h-16 flex items-center justify-center text-[28px] text-white ${color} rounded-full drop-shadow-xl`}>
                {icon}
            </div>

            {/* Text Content */}
            <div className="flex flex-col justify-center">
                <h6 className="text-sm text-gray-400 font-medium mb-1 uppercase tracking-wide">
                    {label}
                </h6>
                <span className="text-2xl font-semibold text-gray-800">
                    &#8377;{value}
                </span>
            </div>
        </div>
    )
}

export default InfoCard;
