import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

function LocationMarker() {
  // const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on('locationfound', (e) => {
      console.log('lat', e.latlng);
      // setPosition(e.latlng);
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

    // Add esri-leaflet-geocoder
    // const searchControl = L.esri.Geocoding.geosearch({
    //   providers: [
    //     L.esri.Geocoding.arcgisOnlineProvider({
    //       // API Key to be passed to the ArcGIS Online Geocoding Service
    //       apikey: 'YOUR_API_KEY',
    //     }),
    //   ],
    // }).addTo(map);

    // create an empty layer group to store the results and add it to the map
    // const results = L.layerGroup().addTo(map);

    // listen for the results event and add every result to the map
    // searchControl.on('results', (data) => {
    //   results.clearLayers();
    //   for (let i = data.results.length - 1; i >= 0; i--) {
    //     results.addLayer(L.marker(data.results[i].latlng));
    //   }
    // });
  }, []);
  return null;
}

export default React.memo(LocationMarker);
