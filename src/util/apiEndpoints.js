export const BASE_URL = "https://pocketpulse-v1-0.onrender.com/api/v1.0";

const CLOUDINARY_CLOUD_NAME = "dfyuokcsh";

export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  UPLOAD_IMAGE: `http://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};
