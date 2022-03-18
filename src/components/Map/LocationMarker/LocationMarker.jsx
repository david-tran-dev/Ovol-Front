import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

function LocationMarker() {
  const map = useMap();

  useEffect(() => {
    map.locate().on('locationfound', (e) => {
      console.log('lat', e.latlng);
      const radius = e.accuracy;
      L.marker(e.latlng)
        .addTo(map)
        .bindPopup(`Vous êtes à moins de ${Math.round(radius)} mètres de ce point`);
      map.flyTo(e.latlng, map.getZoom());
      console.log('radius:', Math.round(radius));
      const circle = L.circle(e.latlng, {
        radius,
        color: '#00F',
        fillOpacity: 0.35,
        stroke: false,
      });
      circle.addTo(map);
    });

    map.on('locationerror', (e) => {
      console.log(e.message);
    });
  }, []);
  return null;
}

export default React.memo(LocationMarker);
