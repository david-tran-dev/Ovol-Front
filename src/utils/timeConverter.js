/* eslint-disable import/prefer-default-export */
export function convertDurationToTime(duration) {
  let hours = Math.floor(duration);
  let minutes = Math.floor((duration - hours) * 100);
  if (minutes > 60) {
    minutes -= 60;
    hours += 1;
  }
  return `${hours}H${minutes}m`;
}
