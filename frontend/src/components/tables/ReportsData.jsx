import { useEffect } from 'react';
import { getReports } from '../../services/api';

const ReportsData = ({ onDataLoaded }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getReports();
        const reports = response.data;

        console.log('Datos de informes:', reports);

        const reportsWithAddress = await addAddressToReports(reports);

        console.log('Informes con direcciones:', reportsWithAddress);

        const reportsWithFormattedDate = formatDatesInReports(reportsWithAddress);

        console.log('Informes con fechas formateadas:', reportsWithFormattedDate);

        onDataLoaded(reportsWithFormattedDate);
      } catch (error) {
        console.error('Error al obtener registros:', error);
      }
    };

    const addAddressToReports = async (reports) => {
      const updatedReports = await Promise.all(
        reports.map(async (report) => {
          if (report.Ubicacion) {
            const [lat, lng] = report.Ubicacion.split(', ');
            const address = await getAddressFromCoordinates(lat, lng);
            report.Ubicacion = address;
          }
          return report;
        })
      );

      return updatedReports;
    };

    const getAddressFromCoordinates = async (lat, lng) => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
          );
          const data = await response.json();
      
          if (data.display_name) {
            return data.display_name;
          } else {
            return 'Dirección no encontrada';
          }
        } catch (error) {
          console.error('Error al obtener la dirección:', error);
          return 'Error al obtener la dirección';
        }
      };

    const formatDatesInReports = (reports) => {
      const formattedReports = reports.map((report) => {
        if (report.FechaReclamo) {
          report.FechaReclamo = formatDateString(report.FechaReclamo);
          report.FechaVencimiento = formatDateString(report.FechaVencimiento);
        }
        return report;
      });
      return formattedReports;
    };

    const formatDateString = (dateString) => {
      const date = new Date(dateString);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    fetchData();
  }, [onDataLoaded]);

  return null;
};


export default ReportsData;
