/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './landings.scss';
import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Landing from './Landing/Landing';
import { requestLandings } from '../../requests/landings';
import Loading from '../Loading/Loading';

function Landings({ className, ...rest }) {
  const { id } = useParams();
  const [landings, setLandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (landings.length === 0) {
      const ids = id.split(',');
      ids.forEach(async (id) => {
        const response = await requestLandings(id);
        console.log('response:', response);
        if (response.status === 200) {
          setLandings((previousState) => [...previousState, response.data[0]]);
        }
        else {
          navigate('/error');
        }
      });
    }
    setLoading(false);
  }, [landings]);
  console.log('landing', landings);
  return (
    <Container
      className="landings className"
      {...rest}
    >
      {loading ? <Loading />
        : (
          <>

            {landings.map(({
              name,
              description,
              typeOfTerrain,
              danger,
              fflvLink,
              latitude,
              longitude,
              favorableWind,
              unfavorableWind,
              photo_landing,
              altitude,

            }, index) => (
              <Landing
                className="landings-card"
                key={index + name}
                name={name}
                description={description}
                typeOfTerrain={typeOfTerrain}
                danger={danger}
                fflvLink={fflvLink}
                latitude={latitude}
                longitude={longitude}
                favorableWind={favorableWind}
                unfavorableWind={unfavorableWind}
                photo_landing={photo_landing}
                altitude={altitude}
              />
            ))}
          </>
        )}
    </Container>
  );
}

Landings.propTypes = {
  className: PropTypes.string,
};
Landings.defaultProps = {
  className: '',
};
export default React.memo(Landings);
