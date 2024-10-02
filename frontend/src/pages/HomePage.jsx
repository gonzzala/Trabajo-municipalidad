import React from 'react'
import "../styles/HomePage.css";
import LoginNavBar from '../components/navBar/LoginNavBar';
import AdminNavBar from '../components/navBar/AdminNavBar';
import ReportsTable from '../components/tables/ReportsTable';
import UserProfile from '../components/UserForms/UserProfile';
import LoginComponent from '../components/login & Register/Login';
const HomePage = () => {
  return (
    <div className='homeContainer'>
       <LoginNavBar/>
       <LoginComponent/>

    
    
    </div>
  )
}

export default HomePage