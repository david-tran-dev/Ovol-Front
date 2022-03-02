/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup,

} from 'react-leaflet';
import './map.scss';
import PropTypes from 'prop-types';
// import * as ELG from 'esri-leaflet-geocoder';
import L from 'leaflet';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
// import LocateControl from 'react-leaflet-locate-control';
import { requestLiftOff } from '../../requests/map';
import LocationMarker from './LocationMarker/LocationMarker';

import paragliding from '../../assets/icons/paragliding.png';

function Map({ liftOffList }) {
  const [firstPosition, SetFirstPosition] = useState([48.860647513789694, 2.340337536855448]);
  // Future fonctionnalité
  // const [positions, setPositions] = useState([]);
  // const [wayPoints, setWayPoints] = useState([]);

  const getIcon = (iconSize) => L.icon({
    iconUrl: paragliding,
    iconSize: [iconSize],
    iconAnchor: [20, 30],
  });

  useEffect(async () => {

  }, []);
  console.log('render');
  return (
    <div className="map">
      <MapContainer
        center={firstPosition}
        zoom={10}
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
          <LayersControl.Overlay checked name="Point de décollage">
            <LayerGroup>
              {liftOffList.length > 0 && liftOffList.map(({
                altitude, latitude, longitude, name,
              }, index) => (
                <Marker key={index + name} position={[latitude, longitude]} icon={getIcon(40)}>
                  <Popup>Nom: {name} <br />
                    Altitude: {altitude}m
                  </Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}

Map.propTypes = {
  liftOffList: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      altitude: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default React.memo(Map);
