import React, { useState } from 'react';
import EditableReportsTable from '../components/admin/EditableReportsTable';
import "../styles/AdminPage.css";
import Users from '../components/admin/users/Index';
import ReportModal from '../components/UserForms/ReportModal';
import AdminAdministradores from '../components/admin/admins/AdminAdministradores';
import AdminAreaNavBar from '../components/navBar/AdminAreaNavBar';
import PrivateRoute from '../components/PrivateRoute';


const AdminAreaPage = () => {
  const [currentComponent, setCurrentComponent] = useState('reports');
  const [pageTitle, setPageTitle] = useState('ADMINISTRACIÓN DE INFORMES');
  const [showPlazoVencimientos, setShowPlazoVencimientos] = useState(false);


  const handleSwitchToUsers = () => {
    setCurrentComponent('users');
    setPageTitle('ADMINISTRACIÓN DE USUARIOS');
  };

  const handleSwitchToReports = () => {
    setCurrentComponent('reports');
    setPageTitle('ADMINISTRACIÓN DE INFORMES');
  };

  return (
    <PrivateRoute roles={['admin']} niveles={[2]}>
    <div className='adminContainer'>
      <AdminAreaNavBar 
        onSwitchToUsers={handleSwitchToUsers} 
        onSwitchToReports={handleSwitchToReports} 
      />
      <br />
      <div className='adminPageContent'>
        <div className='adminImg'>
          <img src="/Logo-Municipio-de-Azul-sinfondo.png" alt="" />
        </div>
        <h2>{pageTitle}</h2>
        {currentComponent === 'reports' && (
          <>
          <br />
            <ReportModal idAdmin={1}/> 
            <br />
            <br />
            <EditableReportsTable/>
          </>
        )}

        {currentComponent === 'users' && (
          <Users onGoBackToReports={handleSwitchToReports} />
        )}
        {currentComponent === 'admins' && (
          <AdminAdministradores onGoBackToReports={handleSwitchToReports} />
        )}

      </div>
    </div>
    </PrivateRoute>
  );
};

export default AdminAreaPage;

