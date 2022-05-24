/* eslint-disable import/prefer-default-export */
export function createMountainList(list) {
  if (!list.length) {
    return [];
  }
  const resultList = list.reduce((track, { mountain }) => {
    track[mountain] = mountain;
    return track;
  }, {});
  const keyArray = Object.keys(resultList).map((key) => resultList[key]);

  return keyArray;
}

export function createDifficultyList(list) {
  if (!list.length) {
    return [];
  }
  const resultList = list.reduce((track, { difficulty }) => {
    track[difficulty] = difficulty;
    return track;
  }, {});
  const keyArray = Object.keys(resultList).map((key) => resultList[key]);

  return keyArray;
}

export function getTrackHeightMax(list) {
  const heightArray = list.map((track) => track.positive_elevation);
  const heightMax = Number(Math.max(...heightArray));
  return heightMax;
}

export function getTrackDistancetMax(list) {
  const heightArray = list.map((track) => track.overall_length);
  const heightMax = Number(Math.max(...heightArray));
  return heightMax;
}

export function getTrackDurationMax(list) {
  const durationArray = list.map((track) => track.duration);
  const durationMax = Number(Number(Math.max(...durationArray)).toFixed(2));
  return durationMax;
}

export function convertNumber(number) {
  const numberConverted = Number(Number(number).toFixed(2));
  return numberConverted;
}
