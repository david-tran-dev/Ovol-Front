import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import { Photo } from '@mui/icons-material';

function TrackPhotos(props) {
  const items = [
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!',
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!',
    },
  ];
  console.log('render');
  return (
    <Carousel animation="slide">
      {
                items.map((item, i) => <Photo key={i} item={item} />)
            }
    </Carousel>
  );
}

export default React.memo(TrackPhotos);
