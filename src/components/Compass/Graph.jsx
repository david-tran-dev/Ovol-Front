/* eslint-disable react/prop-types */
// import React from 'react';
import {
  Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

function Graph({ props }) {
  const data = props;
  return (
    <RadarChart cx={125} cy={125} outerRadius={75} width={250} height={250} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={0} domain={[0, 150]} />
      <Radar name="Favorable" dataKey="A" stroke="green" fill="green" fillOpacity={0.3} />
      <Radar name="Defavorable" dataKey="B" stroke="red" fill="red" fillOpacity={0.3} />
      {/* <Radar name="wind" dataKey="C" stroke="blue" fill="blue" fillOpacity={0.6} /> */}
      <Legend />
    </RadarChart>
  );
}

export default Graph;
