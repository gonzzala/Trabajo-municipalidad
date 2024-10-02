import React, { useState, useEffect } from 'react';
import EditableReportsTable from '../components/admin/EditableReportsTable';
import AdminNavBar from '../components/navBar/AdminNavBar';
import "../styles/AdminPage.css";
import Users from '../components/admin/users/Index';
import ReportModal from '../components/UserForms/ReportModal';
import PlazoVencimientos from '../components/admin/PlazoVencimientos';
import AdminAdministradores from '../components/admin/admins/AdminAdministradores';
import { getPlazoVto } from '../services/api';
import { updatePlazoVto } from '../services/api'; // Asegúrate de importar la función correcta
import PrivateRoute from '../components/PrivateRoute';
import AreasTable from '../components/admin/AreasTable';

const AdminPage = () => {
  const [currentComponent, setCurrentComponent] = useState('reports');
  const [pageTitle, setPageTitle] = useState('ADMINISTRACIÓN DE INFORMES');
  const [showPlazoVencimientos, setShowPlazoVencimientos] = useState(false);
  const [plazo, setPlazo] = useState("");

  const fetchData = async () => {
    try {
      const response = await getPlazoVto();
      setPlazo(response.data);
    } catch (error) {
      console.error("Error al obtener registros:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
 
  const handleSwitchToUsers = () => {
    setCurrentComponent('users');
    setPageTitle('ADMINISTRACIÓN DE USUARIOS');
  };

  const handleSwitchToReports = () => {
    setCurrentComponent('reports');
    setPageTitle('ADMINISTRACIÓN DE INFORMES');
  };

  const handleSwitchToAdmins = () => {
    setCurrentComponent('admins');
    setPageTitle('ADMINISTRADORES');
  };

  const handleSwitchToAreas = () => {
    setCurrentComponent('areas');
    setPageTitle('ADMINISTRACIÓN DE ÁREAS');
  };


  const handleShowPlazoVencimientos = () => {
    setShowPlazoVencimientos(true);
  };

  const handleClosePlazoVencimientos = () => {
    setShowPlazoVencimientos(false);
  };

  const handleSavePlazo = async (cantidadDias) => {
    try {
      await updatePlazoVto({ IdPlazo: plazo[0]?.IdPlazo, Dias: cantidadDias });
      fetchData(); // Actualizar datos después de la modificación del plazo
    } catch (error) {
      console.error('Error al actualizar el plazo:', error);
    }
  };

  return (

      <PrivateRoute roles={['admin']} niveles={[1]}>
        <div className='adminContainer'>
          <AdminNavBar 
            onSwitchToUsers={handleSwitchToUsers} 
            onSwitchToReports={handleSwitchToReports} 
            onShowPlazoVencimientos={handleShowPlazoVencimientos}
            onSwitchToAdmins={handleSwitchToAdmins}
            onSwitchToAreas={handleSwitchToAreas}
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
  
            {currentComponent === 'areas' && (
              <AreasTable />
            )}
  
            {showPlazoVencimientos && (
              <PlazoVencimientos 
                plazo={plazo}
                show={showPlazoVencimientos} 
                onHide={handleClosePlazoVencimientos}
                onSavePlazo={handleSavePlazo}
              />
            )}
          </div>
        </div>
      </PrivateRoute>
    );
};

export default AdminPage;