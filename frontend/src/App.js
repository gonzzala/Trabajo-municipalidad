import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Asegúrate de importar Routes

import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import Users from './components/admin/users/Index';
import AdminAreaPage from './pages/AdminAreaPage';
import ResetPage from './pages/ResetPage';

function App() {
  return (
    <Router>
      <div className='mainContainer'>
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/inicio" element={<UserPage />} />
          <Route path="/adminArea" element={<AdminAreaPage />} />
          <Route path="/newPassword" element={<ResetPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
