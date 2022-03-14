/* eslint-disable no-mixed-operators */
import axios from 'axios';

let direction = '';
export default async function convertWindDirection(balise) {
  const result = await axios.get(`https://balisemeteo.com/balise_json.php?idBalise=${balise}}`);
  const windInstant = result.data.directVentMoy;
  console.log('balise info', result.data);
  if (windInstant === undefined) {
    direction = undefined;
  }
  if (windInstant > 0 && windInstant < 22.5 || windInstant >= 337.5) {
    direction = 'N';
  }
  if (windInstant >= 22.5 && windInstant < 67.5) {
    direction = 'NE';
  }
  if (windInstant >= 67.5 && windInstant < 112.5) {
    direction = 'E';
  }
  if (windInstant >= 112.5 && windInstant < 157.5) {
    direction = 'SE';
  }
  if (windInstant >= 157.5 && windInstant < 202.5) {
    direction = 'S';
  }
  if (windInstant >= 202.5 && windInstant < 247.5) {
    direction = 'SO';
  }
  if (windInstant >= 247.5 && windInstant < 292.5) {
    direction = 'O';
  }
  if (windInstant >= 292.5 && windInstant < 337.5) {
    direction = 'NO';
  }
  return direction;
}
