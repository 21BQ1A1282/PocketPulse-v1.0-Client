import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddCategoryForm from "../components/AddCategoryForm";
import CategoryList from "../components/CategoryList";
import Dashboard from "../components/Dashboard";
import Modal from "../components/Modal";
import useUser from "../hooks/useUser";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import axiosConfig from "../util/axiosConfig";

const Category = () => {
    useUser();
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    
    // Function to fetch categories from the server
    const fetchCategories = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if (response.status === 200) {
                console.log(`categories `, response.data);
                setCategoryData(response.data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Failed to fetch categories. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async (category) => {
       const {name,type, icon } = category;

       if(!name.trim()){
        toast.error("Category Name is Required")
        return;
       }

       const isDuplicate = categoryData.some((category) => {
        return category.name.toLowerCase() === name.trim().toLowerCase();
       })

       if(isDuplicate){
        toast.error("Category Name already exists!!");
        return;
       }

       try{
        const response =await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {name,type,icon});
        if(response.status === 201){
            toast.success("Category added successfully");
            setShowAddCategoryModal(false);
            fetchCategories();
        }
       }catch(error){
        console.error('Error adding category:', error);
        toast.error(error.response?.data?.message || "Failed to add category");
       }
    }

    const handleEditCategory = (categoryToEdit) => {
        setSelectedCategory(categoryToEdit);
        setShowUpdateCategoryModal(true);
    }

    const handleUpdateCategory = async (updatedCategory) => {
        const {id, name, type, icon} = updatedCategory;
        if(!name.trim()){
            toast.error("Category Name is required");
            return;
        }

        if(!id){
            toast.error("Category Id is missing for update");
            return;
        }

        try{
            const response = await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {name, type, icon});
            setShowUpdateCategoryModal(false);
            setSelectedCategory(null);
            toast.success("Category Updated Successfully");
            fetchCategories();
        }catch(error){
            console.error('Error updating category:', error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Failed to update category");
        }
    }

    const incomeCount = categoryData.filter(c => c.type === 'income').length;
    const expenseCount = categoryData.filter(c => c.type === 'expense').length;
    const totalCount = categoryData.length;

    return (
        <Dashboard activeMenu="Category">
            <div className="my-5 mx-auto px-4 max-w-7xl">
                {/* Header + Add button */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            All Categories
                        </h1>
                    </div>
                    <button
                        onClick={() => setShowAddCategoryModal(true)}
                        className="cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        <Plus size={18} />
                        <span>Add New Category</span>
                    </button>
                </div>

                {/* Category list section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">All Categories</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    {totalCount} {totalCount === 1 ? 'category' : 'categories'} total
                                </p>
                            </div>
                            <div className="flex items-center">
                                <span className="text-xs font-medium px-2 py-1 rounded-md bg-emerald-100 text-emerald-800 mr-2">
                                    {incomeCount} Income
                                </span>
                                <span className="text-xs font-medium px-2 py-1 rounded-md bg-rose-100 text-rose-800">
                                    {expenseCount} Expense
                                </span>
                            </div>
                        </div>
                    </div>
                    <CategoryList categories={categoryData} onEditCategory={handleEditCategory} />
                </div>

                {/* Add category modal */}
                <Modal
                    isOpen={showAddCategoryModal}
                    onClose={() => setShowAddCategoryModal(false)}
                    title="Add New Category">
                    <AddCategoryForm 
                        onAddCategory={handleAddCategory} />
                </Modal>

                {/* Updating category modal*/}
                <Modal
                    isOpen={showUpdateCategoryModal}
                    onClose={() => {
                        setShowUpdateCategoryModal(false);
                        setSelectedCategory(null);
                    }}
                    title="Update Category">
                    <AddCategoryForm
                        initialCategoryData={selectedCategory}
                        onAddCategory={handleUpdateCategory}
                        isEditing={true}/>
                </Modal>
            </div>
        </Dashboard>
    );
};

export default Category;