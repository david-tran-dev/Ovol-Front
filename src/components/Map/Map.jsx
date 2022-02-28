import React, { useEffect, useState } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup, Circle, FeatureGroup, useMap, useMapEvents,

} from 'react-leaflet';
import './map.scss';
import L from 'leaflet';
import * as ELG from 'esri-leaflet-geocoder';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import LocateControl from 'react-leaflet-locate-control';

// import paragliding from '../../assets/icons/paragliding.png';

function Map() {
  const [firstPosition, SetFirstPosition] = useState([48.860647513789694, 2.340337536855448]);
  // Future fonctionnalité
  // const [positions, setPositions] = useState([]);
  // const [wayPoints, setWayPoints] = useState([]);

  // const getIcon = (iconSize) => L.icon({
  //   iconUrl: paragliding,
  //   iconSize: [iconSize],
  //   iconAnchor: [20, 30],
  // });
  const handleOnSearchResults = (data) => {
    console.log(data);
  };

  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMap();

    useEffect(() => {
      map.locate().on('locationfound', (e) => {
        console.log('lat', e.latlng);
        setPosition(e.latlng);
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
  console.log('render');
  return (
    <div className="map">
      <MapContainer
        center={firstPosition}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
      >
        <LocationMarker />
        {/* <Polyline
          pathOptions={{ fillColor: 'red', color: 'blue' }}
          positions={positions}
        /> */}

        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenTopoMap">
            <TileLayer
              attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Esri_WorldImagery">
            <TileLayer
              attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
          {/* <LayersControl.Overlay checked name="Marker with popup">
            <Marker position={firstPosition}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Point de passage">
            <LayerGroup>
              {wayPoints.length > 0 && wayPoints.map(({
                ele, lat, lon, name,
              }, index) => (
                <Marker key={index + name} position={[lat, lon]} icon={getIcon(40)}>
                  <Popup>Nom: {name} <br />
                    Hauteur: {ele}m
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Feature group">
            <FeatureGroup pathOptions={{ color: 'purple' }}>
              <Popup>Popup in FeatureGroup</Popup>
              <Circle center={[51.51, -0.06]} radius={200} />

            </FeatureGroup>
          </LayersControl.Overlay> */}
        </LayersControl>
      </MapContainer>

    </div>
  );
}

export default React.memo(Map);
