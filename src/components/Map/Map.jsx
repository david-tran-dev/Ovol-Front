import { useEffect, useState } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup, Circle, FeatureGroup, useMap,
} from 'react-leaflet';
import './map.scss';
import L from 'leaflet';
// import paragliding from '../../assets/icons/paragliding.png';

function Map() {
  console.log('map');
  const [firstPosition, SetFirstPosition] = useState([48.860647513789694, 2.340337536855448]);
  // Future fonctionnalité
  // const [positions, setPositions] = useState([]);
  // const [wayPoints, setWayPoints] = useState([]);

  // const getIcon = (iconSize) => L.icon({
  //   iconUrl: paragliding,
  //   iconSize: [iconSize],
  //   iconAnchor: [20, 30],
  // });

  function LocationMarker() {
    const map = useMap();
    useEffect(() => {
      map.locate().on('locationfound', (e) => {
        SetFirstPosition(e.latlng);
        console.log('e.latlng:', e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        const radius = e.accuracy;
        console.log('radius:', Math.round(radius));
        const circle = L.circle(e.latlng, radius);
        circle.addTo(map);
      });
    }, [map]);

    return null;
  }

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
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay checked name="Marker with popup">
            <Marker position={firstPosition}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Point de passage">
            <LayerGroup>
              {/* {wayPoints.length > 0 && wayPoints.map(({
                ele, lat, lon, name,
              }, index) => (
                <Marker key={index + name} position={[lat, lon]} icon={getIcon(40)}>
                  <Popup>Nom: {name} <br />
                    Hauteur: {ele}m
                  </Popup>
                </Marker>
              ))} */}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Feature group">
            <FeatureGroup pathOptions={{ color: 'purple' }}>
              <Popup>Popup in FeatureGroup</Popup>
              <Circle center={[51.51, -0.06]} radius={200} />

            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>

    </div>
  );
}

export default Map;
