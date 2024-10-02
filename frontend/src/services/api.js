import axios from 'axios';
const baseURL = 'http://localhost:4000/api';

const api = axios.create({
    baseURL,
  //baseURL: process.env.REACT_APP_API_URL,

});

// Agrega un interceptor para incluir el token en todas las solicitudes
api.interceptors.request.use((config) => {
  // Obtiene el token del localStorage cada vez que se realiza una solicitud
  const token = localStorage.token;
  if (token) {
    config.headers['access-token'] = token;
  }
  return config;
});

/*RUTAS*/

export const getReports = () => {
  return api.get('/reports'); 
};

export const getReportsById = (userId) => {
  return api.get(`/reports/${userId}`); 
};
export const getReportsByIdAdmin = (userId) => {
  return api.get(`/reports/area/${userId}`); 
};

export const createArea = (areaData) => {
  return api.post('/areas', areaData);
};

export const updateArea = (areaId, areaData) => {
  return api.put(`/areas/${areaId}`, areaData);
};

export const deleteArea = (areaId) => {
  return api.delete(`/areas/${areaId}`);
};

export const createReport = (newReport, callback) => {
  api.post('/reports', newReport)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

export const updateReport = (updatedReport, callback) => {
  api
    .put(`/reports/${updatedReport.idReclamo}`, updatedReport)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

export const getAreas = () => {
  return api.get('/areas');
}

export const getEstados = () => {
  return api.get('/estados');
};

export const getUsers = () => {
  return api.get('/ciudadanos');
};

export const getUsersById = (userId) => {
  return api.get(`/ciudadanos/${userId}`);
};

export const findUserByDNI = (dni) => {
  return api.get(`/ciudadanos/search/${dni}`);
};

export const updateUser = (updatedUser, callback) => {
  api
    .put(`/ciudadanos/${updatedUser.IdCiudadano}`, updatedUser)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

export const updateEnableByAdmin = (updatedUser, callback) => {
  api
    .put(`/ciudadanos/Enable/${updatedUser.IdCiudadano}`, updatedUser)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

export const updateComentarioByAdmin = (updatedUser, callback) => {
  api
    .put(`/ciudadanos/Comentario/${updatedUser.IdCiudadano}`, updatedUser)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

export const getPlazoVto = () => {
  return api.get('/plazo');
};

export const updatePlazoVto = (updatedPlazoVto) => {
  return api.put(`/plazo/${updatedPlazoVto.IdPlazo}`, updatedPlazoVto);
};

export const getAdmins = () => {
  return api.get('/admin');
};

export const updateAdmin = (updatedAdmin, callback) => {
  api
    .put(`/admin/${updatedAdmin.IdAdmin}`, updatedAdmin)
    .then((response) => {
      callback(null, response.data);
    })
    .catch((error) => {
      callback(error, null);
    });
};

export const getPartidos = () => {
  return api.get('/partidos');
}

export default api;