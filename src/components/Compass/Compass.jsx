/* eslint-disable no-mixed-operators */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Graph from './Graph';

function Compass({ favorableWind, unfavorableWind, balise }) {
  const [data, setData] = useState([]);
  const [windDirection, setWindDirection] = useState('');
  // valeur par default
  const dataApi = [
    {
      subject: 'N',
      A: 0,
      B: 0,
      C: 0,
      fullMark: 150,
    },
    {
      subject: 'NE',
      A: 0,
      B: 0,
      C: 0,
      fullMark: 150,
    },
    {
      subject: 'E',
      A: 0,
      B: 0,
      C: 0,
      fullMark: 150,
    },
    {
      subject: 'SE',
      A: 0,
      B: 0,
      C: 0,
      fullMark: 150,
    },
    {
      subject: 'S',
      A: 0,
      B: 0,
      C: 0,
      fullMark: 150,
    },
    {
      subject: 'SO',
      A: 0,
      B: 0,
      C: 0,
      fullMark: 150,
    },
    {
      subject: 'O',
      A: 0,
      B: 0,
      C: 0,
      fullMark: 150,
    },
    {
      subject: 'NO',
      A: 0,
      B: 0,
      C: 0,
      fullMark: 150,
    },
  ];
  function handleGraphData() {
    // on remet toutes les valeurs de data[index].C à zero
    data.forEach((item, index) => {
      setData([...data, data[index].A = 0]);
      setData([...data, data[index].B = 0]);
      setData([...data, data[index].C = 0]);
    });
    // favorable wind
    data.forEach((item, index) => {
      if (favorableWind) {
        favorableWind.forEach((direction) => {
          if (direction === item.subject) {
            const newArray = [...data];
            newArray[index].A = 150;
            if (favorableWind.length === 1) {
              if (item.subject === 'N') {
                newArray[index + 1].A = 40;
                newArray[7].A = 40;
              }
              else if (item.subject === 'NO') {
                newArray[0].A = 40;
                newArray[index - 1].A = 40;
              }
              else {
                newArray[index + 1].A = 40;
                newArray[index - 1].A = 40;
              }
            }
            setData(newArray);
          }
        });
      }
      // unfavorable wind
      if (unfavorableWind) {
        unfavorableWind.forEach((direction) => {
          if (direction === item.subject) {
            const newArray = [...data];
            newArray[index].B = 150;
            if (unfavorableWind.length === 1) {
              if (item.subject === 'N') {
                newArray[index + 1].B = 40;
                newArray[7].A = 40;
              }
              else if (item.subject === 'NO') {
                newArray[0].A = 40;
                newArray[index - 1].B = 40;
              }
              else {
                newArray[index + 1].A = 40;
                newArray[index - 1].A = 40;
              }
            }
            setData(newArray);
          }
        });
      }
      //  wind direction
      // si la valeur du select est egale a data[index].C ,on le set au max(ici 150) et l'index +/- 1 à 40
      if (item.subject === windDirection && windDirection !== undefined) {
      // exception pour le NO dont l'index+1 serait undefined car superieur a data.length
        if (item.subject === 'NO') {
          const newArray = [...data];
          newArray[index].C = 150;
          newArray[0].C = 40;
          newArray[index - 1].C = 40;
          setData(newArray);
        }
        // exception pour le N dont l'index-1 serait undefined car inferieur a 0
        else if (item.subject === 'N') {
          const newArray = [...data];
          newArray[index].C = 150;
          newArray[index + 1].C = 40;
          newArray[7].C = 40;
          setData(newArray);
        }
        else {
          const newArray = [...data];
          newArray[index].C = 150;
          newArray[index + 1].C = 40;
          newArray[index - 1].C = 40;
          setData(newArray);
        }
      }
    });
    // console.log('after change', data);
  }
  async function getBaliseInfos() {
    const result = await axios.get(`https://balisemeteo.com/balise_json.php?idBalise=${balise}}`);
    const windInstant = result.data.directVentInst;
    if (windInstant === undefined) {
      setWindDirection('undefined');
    }
    if (windInstant > 0 && windInstant < 22.5 || windInstant >= 337.5) {
      setWindDirection('N');
    }
    if (windInstant >= 22.5 && windInstant < 67.5) {
      setWindDirection('NE');
    }
    if (windInstant >= 67.5 && windInstant < 112.5) {
      setWindDirection('E');
    }
    if (windInstant >= 112.5 && windInstant < 157.5) {
      setWindDirection('SE');
    }
    if (windInstant >= 157.5 && windInstant < 202.5) {
      setWindDirection('S');
    }
    if (windInstant >= 202.5 && windInstant < 247.5) {
      setWindDirection('SO');
    }
    if (windInstant >= 247.5 && windInstant < 292.5) {
      setWindDirection('O');
    }
    if (windInstant >= 292.5 && windInstant < 337.5) {
      setWindDirection('NO');
    }
  }
  useEffect(() => {
    setData(dataApi);
    getBaliseInfos();
    handleGraphData();
  }, [windDirection]);

  return (
    <div className="App">
      <div className="graph__container">
        <Graph props={data} />
      </div>
    </div>
  );
}

export default Compass;
