// import React, { useState } from 'react';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please select a file!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await axios.post('/api/upload-csv', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       alert(response.data.message);
//     } catch (error) {
//       console.error(error);
//       alert('Failed to upload file');
//     }
//   };

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <div>
//         <input type="file" accept=".csv" onChange={handleFileChange} />
//         <button onClick={handleUpload}>Upload CSV</button>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React from "react";
import Sidebar from "../components/Sidebar";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Welcome, Admin</h1>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-700">Products</h2>
            <p className="text-2xl font-bold text-blue-600">120</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-700">Orders</h2>
            <p className="text-2xl font-bold text-green-600">45</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-700">Users</h2>
            <p className="text-2xl font-bold text-purple-600">300</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-700">Sales</h2>
            <p className="text-2xl font-bold text-red-600">$2,500</p>
          </div>
        </div>
      </div>
    </div>
  );
};


