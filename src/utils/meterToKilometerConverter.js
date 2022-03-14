/* eslint-disable import/prefer-default-export */
export function meterToKilometerConverter(meter, unit) {
  const kilometerString = (meter / 1000).toFixed(unit);
  const kilometer = Number(kilometerString);
  return kilometer;
}
