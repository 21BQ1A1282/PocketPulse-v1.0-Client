import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddExpenseForm from "../components/AddExpenseForm";
import Dashboard from "../components/Dashboard";
import DeleteAlert from "../components/DeleteAlert";
import ExpenseList from "../components/ExpenseList";
import ExpenseOverview from "../components/ExpenseOverview";
import Modal from "../components/Modal";
import useUser from "../hooks/useUser";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosConfig";

const Expense = () => {
    useUser();

    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    const fetchExpenseDetails = async () => {
        if(loading) return;

        setLoading(true);

        try{
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSES);
            if(response.status === 200){
                setExpenseData(response.data);
            }
        }catch (error){
            console.error("Failed to fetch expense details:", error);
            toast.error(error.response?.data?.message || "Failed to fetch expense details");
        }finally{
            setLoading(false);
        }
    }

    const fetchExpenseCategories = async () => {
        try{
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if(response.status === 200){
                setCategories(response.data);
            }
        }catch (error){
            console.log("Failed to fetch expense categories",error);
            toast.error(error.data?.message || "Failed to fetch expense categories");
        }
    }

    const handleAddExpense = async (expense) => {
        const { name, amount, date, icon, categoryId } = expense;
        
        // Validate required fields
        if(!name.trim()){
            toast.error("Expense Name is Required")
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
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            });
            if(response.status === 201){
                setShowAddExpenseModal(false);
                toast.success("Expense added successfully");
                fetchExpenseDetails();
                fetchExpenseCategories();
            }
        }catch (error) {
            toast.error("Failed to add expense: " + error.message);
        }
    }

    const deleteExpense = async (id) => {
        try{
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            setOpenDeleteAlert({show: false, data: null});
            toast.success("Expense deleted successfully");
        }catch(error) {
            console.log('Error deleting expense',error);
            toast.error(error.response?.data?.message || "Failed to delete expense");
        }
    }

    const handleDownloadExpenseDetails = async () => {
        try{
            const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {responseType: "blob"});
            let fileName = "expense_details.xlsx";
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Download expense details successfully");
        }catch (error){
            console.log("Error downloading expense details:", error);
            toast.error(error.response?.data?.message || "Failed to download expense");
        }
    }

    const handleEmailExpenseDetails = async () => {
        try{
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_EXPENSE);
            if(response.status === 200){
                toast.success("Expense details emailed successfully");
            }
        }catch(error){
            console.log("Error emailing expense details:", error);
            toast.error(error.response?.data?.message || "Failed to email expense");
        }
    }

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategories();
    },[]);

    
    return (
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto px-4 max-w-7xl">

                {/* Header + Add button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            All Expenses
                        </h1>
                    </div>
                    <button
                        onClick={() => setShowAddExpenseModal(true)}
                        className="cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white font-medium hover:black transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        <Plus size={18} />
                        <span>Add New Expense</span>
                    </button>
                </div>

                {/* overview for expense with line chart*/}
                <div className="py-4">
                    <ExpenseOverview transactions={expenseData} />
                </div>

                <div className="grid grid-cols-1 gap-6"> 
            
                    {/* Expense List */}
                    <ExpenseList 
                        transactions={expenseData}
                        onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
                        onDownload={handleDownloadExpenseDetails}
                        onEmail={handleEmailExpenseDetails} 
                    />

                    {/* Adding the expense Modal*/}
                    <Modal
                       isOpen={showAddExpenseModal}
                       onClose={() => setShowAddExpenseModal(false)}
                       title="Add Expense">
                        <AddExpenseForm 
                            onAddExpense={(expense) => handleAddExpense(expense)}
                            categories={categories} />
                    </Modal>

                    {/* Deleting the expense Modal*/}
                    <Modal
                       isOpen={openDeleteAlert.show}
                       onClose={() => setOpenDeleteAlert({show: false, data: null})}
                       title={"Delete Expense"}>
                        <DeleteAlert
                           content="Are you sure want to delete this expense details ?"
                           onDelete={() => deleteExpense(openDeleteAlert.data)} 
                        />
                    </Modal>
                </div>
                
            </div>
        </Dashboard>
    )
}

export default Expense;