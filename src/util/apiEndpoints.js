export const BASE_URL = "https://pocketpulse-v1-0.onrender.com/api/v1.0";
const CLOUDINARY_CLOUD_NAME = "dfyuokcsh";

export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  GET_USER_INFO: "/profile",
  GET_ALL_CATEGORIES: "/categories",
  ADD_CATEGORY: "/categories",
  UPDATE_CATEGORY: (categoryId) => `/categories/${categoryId}`,
  UPLOAD_IMAGE: `http://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};
