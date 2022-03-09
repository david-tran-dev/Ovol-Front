/* eslint-disable react/prop-types */
import { Icon } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { requestLiftOff } from '../../requests/liftOff';
import './flag.scss';

export default function Flag({ liftOffId }) {
  const [colorFlag, setColorFlag] = useState('black');

  async function setConditions() {
    const liftOff = await requestLiftOff(liftOffId);
    const balise = await axios.get(`https://balisemeteo.com/balise_json.php?idBalise=${liftOff.data[0].balise}`);
    console.log('liftOff flag', liftOff.data[0]);
    console.log('balise infos', balise.data);
    // const liftOffInfos = liftOff.data[0];
    const baliseInfos = balise.data;
    // TODO : declarer les conditions pour la couleur du drapeau
    if (Number(baliseInfos.vitesseVentMoy) < 10) {
      setColorFlag('green');
    }
    else if (Number(baliseInfos.vitesseVentMoy) >= 10 && Number(baliseInfos.vitesseVentMoy) < 15) {
      setColorFlag('orange');
    }
    else {
      setColorFlag('red');
    }
  }
  useEffect(async () => {
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
