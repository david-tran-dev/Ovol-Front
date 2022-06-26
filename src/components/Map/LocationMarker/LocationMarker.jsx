import React, { useEffect, useState } from 'react';
import {
  useMap, Marker, Popup, Circle,
} from 'react-leaflet';
import Loading from '../../Loading/Loading';

function LocationMarker() {
  const [radius, setRadius] = useState(null);
  const [latlng, setLatlng] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on('locationfound', (e) => {
      setRadius(e.accuracy);
      const latlngArray = Object.keys(e.latlng).map((key) => e.latlng[key]);
      setLatlng(latlngArray);
      map.flyTo(e.latlng, map.getZoom());
    });

    map.on('locationerror', (e) => {
      console.log(e.message);
    });
  }, []);
  if (!latlng) {
    return <Loading />;
  }
  return (
    <Marker position={latlng}>
      <Popup>
        {`Vous êtes à moins de ${Math.round(radius)} mètres de ce point`}
      </Popup>
      <Circle center={latlng} pathOptions={{ fillColor: 'blue' }} radius={radius} stroke={false} fillOpacity={0.35} />
    </Marker>
  );
}

export default React.memo(LocationMarker);
