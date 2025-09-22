import { Search } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import Dashboard from "../components/Dashboard";
import TransactionInfoCard from "../components/TransactionInfoCard";
import useUser from "../hooks/useUser";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosConfig";

const Filter = () => {
  useUser();

  const [type, setType] = useState("income");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [keyword, setKeyword] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions: ", error);
      toast.error(error.message || "Failed to fetch transactions")
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dashboard activeMenu="Filters">
      <div className="my-8 mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Filter Transactions
          </h2>
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h5 className="text-xl font-semibold text-gray-800">
              Select the filters
            </h5>
            <p className="text-sm text-gray-500 mt-1">
              Narrow down your transactions using the filters below
            </p>
          </div>

          {/* Form */}
          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {/* Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-2 text-gray-700">Type</label>
              <select value={type} onChange={e => setType(e.target.value)} id="type" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-black/80 focus:border-black/80 transition">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Start Date */}
            <div>
              <label htmlFor="startdate" className="block text-sm font-medium mb-2 text-gray-700">Start Date</label>
              <input value={startDate} onChange={e => setStartDate(e.target.value)} type="date" id="startdate" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-black/80 focus:border-black/80 transition" />
            </div>

            {/* End Date */}
            <div>
              <label htmlFor="enddate" className="block text-sm font-medium mb-2 text-gray-700">End Date</label>
              <input value={endDate} onChange={e => setEndDate(e.target.value)} type="date" id="enddate" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-black/80 focus:border-black/80 transition" />
            </div>

            {/* Sort Field */}
            <div>
              <label htmlFor="sortfield" className="block text-sm font-medium mb-2 text-gray-700">Sort Field</label>
              <select value={sortField} onChange={e => setSortField(e.target.value)} id="sortfield" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-black/80 focus:border-black/80 transition">
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label htmlFor="sortorder" className="block text-sm font-medium mb-2 text-gray-700">Sort Order</label>
              <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} id="sortorder" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-black/80 focus:border-black/80 transition">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {/* Search */}
            <div className="sm:col-span-1 md:col-span-1 flex items-end">
              <div className="w-full">
                <label htmlFor="keyword" className="block text-sm font-medium mb-2 text-gray-700">Search</label>
                <input value={keyword} onChange={e => setKeyword(e.target.value)} type="text" id="keyword" placeholder="Search..." className="w-full rounded px-3 py-2.5 border border-gray-400 rounded-xl text-sm focus:ring-2 focus:ring-black/80 focus:border-black/80 transition" />
              </div>
              <button type="submit" onClick={handleSearch} className="ml-2 px-4 py-2.5 bg-black hover:bg-gray-800 text-white rounded-xl shadow-sm flex items-center justify-center transition cursor-pointer">
                <Search size={20} />
              </button>
            </div>

          </form>

        </div>
        <div className="mt-6 bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
          {/* Header */}
          <div className="text-left mb-6">
            <h5 className="text-2xl font-extrabold text-gray-800 tracking-tight">
              Transactions
            </h5>
          </div>

          {/* Empty or Loading States */}
          {!loading && transactions.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Select the filters above and click the search button to filter transactions
            </p>
          )}
          {loading && (
            <p className="text-sm text-gray-500 mt-2">Loading Transactions...</p>
          )}

          {/* Transactions List */}
          <div className="space-y-4 mt-4">
            {transactions.map((transaction) => (
              <TransactionInfoCard
                key={transaction.id}
                title={transaction.name}
                icon={transaction.icon}
                date={moment(transaction.date).format('Do MMM YYYY')}
                amount={transaction.amount}
                type={type}
                hideDeleteBtn
                className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl p-4 shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;
