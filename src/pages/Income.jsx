import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddIncomeForm from "../components/AddIncomeForm";
import Dashboard from "../components/Dashboard";
import DeleteAlert from "../components/DeleteAlert";
import IncomeList from "../components/IncomeList";
import IncomeOverview from "../components/IncomeOverview";
import Modal from "../components/Modal";
import useUser from "../hooks/useUser";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosConfig";

const Income = () => {
    useUser();

    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    const fetchIncomeDetails = async () => {
        if(loading) return;

        setLoading(true);

        try{
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if(response.status === 200){
                setIncomeData(response.data);
            }
        }catch (error){
            console.error("Failed to fetch income details:", error);
            toast.error(error.response?.data?.message || "Failed to fetch inconme details");
        }finally{
            setLoading(false);
        }
    }

    const fetchIncomeCategories = async () => {
        try{
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            if(response.status === 200){
                setCategories(response.data);
            }
        }catch (error){
            console.log("Failed to fetch income categories",error);
            toast.error(error.data?.message || "Failed to fetch income categories");
        }
    }

    const handleAddIncome = async (income) => {
        const { name, amount, date, icon, categoryId } = income;
        
        // Validate required fields
        if(!name.trim()){
            toast.error("Income Name is Required")
            return;
        }
    
        if (!amount || isNaN(amount) || amount <= 0) {
            toast.error("Please enter a valid amount greater than 0");
            return;
        }
    
        if (!date) {
            toast.error("Please select a date");
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if(date > today){
            toast.error("Date cannot be in the future")
            return;
        }
    
        if (!categoryId) {
            toast.error("Please select a category");
            return;
        }

        try{
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            });
            if(response.status === 201){
                setShowAddIncomeModal(false);
                toast.success("Income added successfully");
                fetchIncomeDetails();
                fetchIncomeCategories();
            }
        }catch (error) {
            toast.error("Failed to add income: " + error.message);
        }
    }

    const deleteIncome = async (id) => {
        try{
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            setOpenDeleteAlert({show: false, data: null});
            toast.success("Income deleted successfully");
        }catch(error) {
            console.log('Error deleting income',error);
            toast.error(error.response?.data?.message || "Failed to delete income");
        }
    }

    const handleDownloadIncomeDetails = async () => {
        try{
            const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, {responseType: "blob"});
            let fileName = "income_details.xlsx";
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Download income details successfully");
        }catch (error){
            console.log("Error downloading income details:", error);
            toast.error(error.response?.data?.message || "Failed to downlad income");
        }
    }

    const handleEmailIncomeDetails = async () => {
        try{
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
            if(response.status === 200){
                toast.success("Income details emailed successfully");
            }
        }catch(error){
            console.log("Error emailing income details:", error);
            toast.error(error.response?.data?.message || "Failed to email income");
        }
    }

    useEffect(() => {
        fetchIncomeDetails();
        fetchIncomeCategories();
    },[]);

    
    return (
        <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto px-4 max-w-7xl">

                {/* Header + Add button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            All Incomes
                        </h1>
                    </div>
                    <button
                        onClick={() => setShowAddIncomeModal(true)}
                        className="cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white font-medium hover:black transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        <Plus size={18} />
                        <span>Add New Income</span>
                    </button>
                </div>

                {/* overview for income with line chart*/}
                <div className="py-4">
                    <IncomeOverview transactions={incomeData} />
                </div>

                <div className="grid grid-cols-1 gap-6"> 
            
                    {/* Income List */}
                    <IncomeList 
                        transactions={incomeData}
                        onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
                        onDownload={handleDownloadIncomeDetails}
                        onEmail={handleEmailIncomeDetails} 
                    />

                    {/* Adding the income Modal*/}
                    <Modal
                       isOpen={showAddIncomeModal}
                       onClose={() => setShowAddIncomeModal(false)}
                       title="Add Income">
                        <AddIncomeForm 
                            onAddIncome={(income) => handleAddIncome(income)}
                            categories={categories} />
                    </Modal>

                    {/* Deleting the income Modal*/}
                    <Modal
                       isOpen={openDeleteAlert.show}
                       onClose={() => setOpenDeleteAlert({show: false, data: null})}
                       title={"Delete Income"}>
                        <DeleteAlert
                           content="Are you sure want to delete this income details ?"
                           onDelete={() => deleteIncome(openDeleteAlert.data)} 
                        />
                    </Modal>
                </div>
                
            </div>
        </Dashboard>
    )
}

export default Income;