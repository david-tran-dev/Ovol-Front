/* eslint-disable react/prop-types */
// import React from 'react';
import { CircularProgress } from '@mui/material';
import {
  Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

function Graph({ data, isLoading }) {
  return (
    <div>{isLoading ? (
      <RadarChart cx={125} cy={125} outerRadius={75} width={250} height={250} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={0} domain={[0, 150]} />
        <Radar name="Favorable" dataKey="A" stroke="#12824C" fill="#12824C" fillOpacity={0.3} />
        <Radar name="Defavorable" dataKey="B" stroke="red" fill="red" fillOpacity={0.3} />
        <Radar name="Direction du vent moyen" dataKey="C" stroke="blue" fill="blue" fillOpacity={0.6} />
        <Legend />
      </RadarChart>
    ) : <CircularProgress color="success" /> }
    </div>

  );
}

export default Graph;
