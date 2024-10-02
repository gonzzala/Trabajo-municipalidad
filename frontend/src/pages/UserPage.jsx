import React, { useState, useEffect } from "react";
import ReportsTable from '../components/tables/ReportsTable';
import UserProfile from '../components/UserForms/UserProfile';
import ReportModal from '../components/UserForms/ReportModal';
import "../styles/UserPage.css";
import UserNavBar from '../components/navBar/UserNavBar';
import { getReportsById } from "../services/api";
import PrivateRoute from '../components/PrivateRoute';



const UserPage = () => {
  const [reports, setReports] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchData = async () => {
    try {
      const response = await getReportsById(userId);
      setReports(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };
  
  useEffect(() => {
    fetchData(userId);
  }, []);

  useEffect(() => {
    fetchData();
    console.log(reports);
  }, []);

  return (
    <PrivateRoute roles={['user']}>
    <div className='userPageContainer'>
      <UserNavBar />
      <div className='userPageContent'>
        <img src="/Logo-Municipio-de-Azul-sinfondo.png" alt="" />
        <UserProfile />
        <div className='reportModal'>
          <ReportModal />
        </div>
        <ReportsTable reports={reports} />
      </div>
    </div>
    </PrivateRoute>
  );
};

export default UserPage;
