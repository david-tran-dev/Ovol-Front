/* eslint-disable import/prefer-default-export */
export function getWindKilometerPerHour(meter) {
  const windKilometerString = (meter * 60 * 60 / 1000).toFixed(1);
  const windKilometer = Number(windKilometerString);
  return windKilometer;
}
