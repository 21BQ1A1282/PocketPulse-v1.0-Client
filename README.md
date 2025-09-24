<h2 align="center">
   💰 PocketPulse Frontend
    <div><a href="https://pocketpulse-finance.netlify.app/">🚀 Live Demo </a></div>
</h2>


<h3>A modern, responsive React application for personal finance management with real-time analytics and intuitive transaction tracking.</h3>


## 📸 Screenshots
<div>
  <h3>Landing interface</h3>
  <img width="1882" height="856" alt="Screenshot (83)" src="https://github.com/user-attachments/assets/44e620ca-6b8e-4809-92c7-6d231892bceb" />
</div>

<div>
  <h3>Income and expense management Dashboard interface</h3>
  <img width="1881" height="864" alt="Screenshot (78)" src="https://github.com/user-attachments/assets/a3e26895-0701-49ad-a337-c3797c898175" />
</div>



## ✨ Features
📊 Dashboard Analytics - Real-time financial overview with interactive charts

💰 Transaction Management - Full CRUD operations for income and expenses

📱 Responsive Design - Optimized for desktop, tablet, and mobile

🔐 Secure Authentication - JWT-based login/signup with form validation

📈 Data Visualization - Beautiful charts using Recharts library

🔍 Advanced Filtering - Search and filter transactions by multiple criteria

📤 Export Capabilities - Excel download and email reporting

🎯 Category System - Customizable categories with emoji support

## 🛠️ Technology Stack
- Framework: React 18.2.0
  
- Build Tool: Vite
  
- Styling: Tailwind CSS
  
- Routing: React Router DOM
  
- HTTP Client: Axios
  
- Charts: Recharts
  
- Icons: Lucide React
  
- Notifications: React Hot Toast
  
- Date Handling: Moment.js

- State Management: React Context API + Hooks

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions
  1. **Clone the repository**
     ```bash
     git clone https://github.com/21BQ1A1282/PocketPulse-v1.0-Client.git
     cd PocketPulse-v1.0-Client
     ```

  2. **Install dependencies**
     ```bash
     npm install
     ```
  
  3. **Configure environment variables**
     ```bash
     cp .env
     ```

  4. **Edit .env with your configuration**
     ```env
     VITE_API_BASE_URL=https://your-backend-api.com
     VITE_CLOUDINARY_CLOUD_NAME=your-cloudinary-name
     VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
     ```

  5. **Start the development server**
     ```bash
     npm run dev
     ```

  6. **Open your browser**
     Navigate to
     ```bash
     http://localhost:5173
     ```

## 🌐 API Integration
The frontend communicates with a Spring Boot backend through REST APIs:

- Authentication: JWT token-based authentication
- Data Fetching: Optimistic updates with loading states
- Error Handling: Comprehensive error boundaries and user feedback
- File Upload: Cloudinary integration for image handling

## 🎨 UI/UX Features
- Dark/Light Mode - Theme switching capability
- Responsive Grid - Flexbox and CSS Grid layouts
- Loading States - Skeleton screens and spinners
- Form Validation - Real-time validation with error messages


## ⚠️ Note 
This frontend requires the [PocketPulse Backend](https://github.com/21BQ1A1282/PocketPulse-v1.0-Server) to be running for full functionality.

<h2 align="center">
💰 Take Control of Your Financial Future with PocketPulse
</h2>
