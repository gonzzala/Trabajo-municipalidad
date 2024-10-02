import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ roles = [], niveles = [], children }) => {
  const navigate = useNavigate();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/'); // Redirige al inicio de sesión si no hay token
      return;
    }

    try {
      const decodedToken = jwtDecode(token);

      if (!redirected) {
        // Si no se especifican roles, simplemente deja pasar al usuario
        if (roles.length === 0 && niveles.length === 0) {
          return;
        }

        // Verifica si el token tiene un rol permitido
        if (roles.length > 0 && !roles.includes(decodedToken.role)) {
          navigate('/'); // Redirige si el rol no está permitido
          setRedirected(true);
          return;
        }

        // Si el rol es "user" y no tiene un nivel, redirige a "/inicio"
        if (decodedToken.role === 'user' && !decodedToken.nivel) {
          navigate('/inicio');
          setRedirected(true);
          return;
        }

        // Verificar el nivel del administrador y redirigir según el nivel
        if (
          decodedToken.role === 'admin' &&
          niveles.length > 0 &&
          !niveles.includes(decodedToken.nivel)
        ) {
          if (decodedToken.nivel === 1) {
            navigate('/admin');
          } else if (decodedToken.nivel === 2) {
            navigate('/adminArea');
          } else {
            navigate('/');
          }
          setRedirected(true); // Evita ejecutar el código de abajo si ya se redirigió
          return;
        }
      }

    } catch (error) {
      console.error('Error decodificando el token:', error);
      navigate('/');
    }
  }, [navigate, roles, niveles, redirected]);

  return <>{children}</>;
};

export default PrivateRoute;
