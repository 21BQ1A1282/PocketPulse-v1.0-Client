import { Coins, Wallet, WalletCards } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import FinanceOverview from "../components/FinanceOverview";
import InfoCard from "../components/InfoCard";
import RecentTransactions from "../components/RecentTransactions";
import Transactions from "../components/Transactions";
import useUser from "../hooks/useUser";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosConfig";
import { addThousandSeparator } from "../util/utils";

const Home = () => {
    useUser();

    const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);
            if (response.status === 200) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.error("Something went wrong while fetching dashboard data:", error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashboardData();
        return () => { };
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Dashboard activeMenu="Dashboard">
                <div className="my-10 mx-auto max-w-7xl px-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Dashboard
                        </h1>
                    </div>
                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InfoCard
                            icon={<WalletCards className="text-white" />}
                            label="Total Balance"
                            value={`${addThousandSeparator(dashboardData?.totalBalance || 0)}`}
                            color="bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg"
                        />
                        <InfoCard
                            icon={<Wallet className="text-white" />}
                            label="Total Income"
                            value={`${addThousandSeparator(dashboardData?.totalIncome || 0)}`}
                            color="bg-gradient-to-r from-green-400 to-teal-500 shadow-lg"
                        />
                        <InfoCard
                            icon={<Coins className="text-white" />}
                            label="Total Expense"
                            value={`${addThousandSeparator(dashboardData?.totalExpense || 0)}`}
                            color="bg-gradient-to-r from-red-400 to-pink-500 shadow-lg"
                        />
                    </div>

                    {/* Charts & Transactions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <RecentTransactions
                            transactions={dashboardData?.recentTransactions}
                            onMore={() => navigate("/expense")}
                            className="bg-white shadow-md rounded-xl p-6"
                        />

                        <FinanceOverview
                            totalBalance={dashboardData?.totalBalance || 0}
                            totalIncome={dashboardData?.totalIncome || 0}
                            totalExpense={dashboardData?.totalExpense || 0}
                            className="bg-white shadow-md rounded-xl p-6"
                        />

                        <Transactions
                            transactions={dashboardData?.recent5Incomes || []}
                            onMore={() => navigate("/income")}
                            type="income"
                            title="Recent Income Transactions"
                            className="bg-white shadow-md rounded-xl p-6"
                        />

                        <Transactions
                            transactions={dashboardData?.recent5Expenses || []}
                            onMore={() => navigate("/expense")}
                            type="expense"
                            title="Recent Expense Transactions"
                            className="bg-white shadow-md rounded-xl p-6"
                        />
                    </div>
                </div>
            </Dashboard>
        </div>
    )
}

export default Home;
