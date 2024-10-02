import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MdPlace } from 'react-icons/md';
import ReactDOMServer from 'react-dom/server';

const redIcon = L.divIcon({
  html: ReactDOMServer.renderToString(<MdPlace style={{ color: 'red',fontSize: '24px' }} />), 
  iconSize: [24, 24],
  className: 'custom-marker-icon',
});

const MapPicker = ({ onLocationSelect }) => {
  useEffect(() => {
    const map = L.map('map', {
      center: [-36.7763, -59.8589],
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    let marker;

    map.on('click', (e) => {
      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng, { icon: redIcon }).addTo(map); 
      }
      onLocationSelect(e.latlng);
    });

    return () => {
      map.remove();
    };
  }, [onLocationSelect]);

  return <div id="map" style={{ height: '400px' }}></div>;
};

export default MapPicker;
