/* eslint-disable react/prop-types */
import { Icon } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { requestLiftOff } from '../../requests/liftOff';
import convertWindDirection from '../../utils/convertWindDirection';
import './flag.scss';

export default function Flag({ liftOff_id }) {
  const [colorFlag, setColorFlag] = useState('black');

  async function setConditions() {
    const liftOff = await requestLiftOff(liftOff_id);
    const balise = await axios.get(`https://balisemeteo.com/balise_json.php?idBalise=${liftOff.data[0].balise}`);
    const baliseInfos = balise.data;
    console.log('balise ', balise);
    if (Number(baliseInfos.vitesseVentMoy) < 20) {
      console.log('first green');
      setColorFlag('green');
    }
    else if (Number(baliseInfos.vitesseVentMoy) >= 20 && Number(baliseInfos.vitesseVentMoy) < 30) {
      setColorFlag('orange');
    }
    else {
      setColorFlag('red');
    }
    const windDirection = await convertWindDirection(balise);

    console.log('windDirection:', windDirection);
    if (windDirection && colorFlag !== 'red') {
      console.log('second orange');
      setColorFlag('orange');
    }
    if (liftOff.data[0].favorableWind) {
      if (liftOff.data[0].favorableWind.find((el) => el === windDirection) && colorFlag !== 'orange' && colorFlag !== 'red') {
        setColorFlag('green');
      }
    }
    if (liftOff.data[0].unfavorableWind) {
      if (liftOff.data[0].unfavorableWind.find((el) => el === windDirection)) {
        console.log('dans le red');
        setColorFlag('red');
      }
    }
  }
  useEffect(() => {
    setConditions();
  }, []);

  return (
    <Icon
      className="fa-solid fa-flag"
      sx={{
        width: 24, height: 24, textAlign: 'left', color: `${colorFlag}`,
      }}
    />
  );
}
