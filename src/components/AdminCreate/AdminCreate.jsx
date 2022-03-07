/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  useNavigate,
} from 'react-router-dom';
import {
  Container, Button,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { requestHiking } from '../../requests/hiking';
import { requestLiftOff, requestLiftOffPost } from '../../requests/liftOff';
import { requestLandings } from '../../requests/landings';

import Loading from '../Loading/Loading';

function AdminCreate({ className, ...rest }) {
  const [liftOff, setLiftOff] = useState({});
  const [landing, setLanding] = useState({});
  const [hiking, setHiking] = useState({});
  const [loading, setLoading] = useState(false);
  const [valuesLiftOff, setValuesLiftOff] = useState({});
  const [valuesLanding, setValuesLanding] = useState({});
  const [valuesHiking, setValuesHiking] = useState({});
  const navigate = useNavigate();

  useEffect(async () => {
    setLoading(true);
    if (Object.keys(liftOff).length === 0) {
      const response = await requestLiftOff(2);
      console.log('response setloadn', response);
      if (response.status === 200) {
        setLiftOff(response.data[0]);
      }
      else {
        console.log(response);
        navigate('/error');
      }
    }
    if (Object.keys(liftOff).length > 0) {
      setLoading(false);
    }
  }, [liftOff]);

  useEffect(async () => {
    setLoading(true);
    if (Object.keys(landing).length === 0) {
      const response = await requestLandings(2);
      console.log('response setloadn', response);
      if (response.status === 200) {
        setLanding(response.data[0]);
      }
      else {
        console.log(response);
        navigate('/error');
      }
    }
    if (Object.keys(landing).length > 0) {
      setLoading(false);
    }
  }, [landing]);

  useEffect(async () => {
    setLoading(true);
    if (Object.keys(hiking).length === 0) {
      const response = await requestHiking(2);
      console.log('response setloadn', response);
      if (response.status === 200) {
        setHiking(response.data[0]);
      }
      else {
        console.log(response);
        navigate('/error');
      }
    }
    if (Object.keys(hiking).length > 0) {
      setLoading(false);
    }
  }, [hiking]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(valuesLiftOff);
    requestLiftOffPost(valuesLiftOff);
    // requestLandingPost(valuesLanding);
    // requestHikingPost(valuesHiking);
  };

  const handleChangeLiftOff = (item, inputValue) => {
    // console.log('item: ', item, 'value:', inputValue);
    const valueClone = { ...valuesLiftOff };
    valueClone[item] = inputValue;
    console.log(valueClone);
    setValuesLiftOff(valueClone);
    // console.log('le state', value);
  };
  const handleChangeLanding = (item, inputValue) => {
    // console.log('item: ', item, 'value:', inputValue);
    const valueClone = { ...valuesLanding };
    valueClone[item] = inputValue;
    console.log(valueClone);
    setValuesLanding(valueClone);
    // console.log('le state', value);
  };
  const handleChangeHiking = (item, inputValue) => {
    // console.log('item: ', item, 'value:', inputValue);
    const valueClone = { ...valuesHiking };
    valueClone[item] = inputValue;
    console.log(valueClone);
    setValuesHiking(valueClone);
    // console.log('le state', value);
  };

  return (

    <>

      {!loading ? (
        <div
          className={`track ${className}`}
          {...rest}
        >
          <form action="" className="form-data__input" onSubmit={handleSubmit}>
            <div className="div-container">
              <Container className="div-container__track" sx={{ my: 1, display: 'flex', flexDirection: 'column' }}>
                ADMIN DECOLLAGE ITEMS:
                {
                  Object.keys(liftOff).map(((item) => (

                    <TextField
                      sx={{ p: '2px 4px', width: '100%' }}
                      label={item}
                      placeholder={item}
                      name={item}
                      onChange={(event) => handleChangeLiftOff(item, event.target.value)}
                    />
                  )
                  ))
                }
              </Container>
              <Container className="div-container__track" sx={{ my: 1, display: 'flex', flexDirection: 'column' }}>
                ADMIN ATTERRISSAGE ITEMS:
                {
                  Object.keys(landing).map(((item) => (
                    <TextField
                      sx={{ p: '2px 4px', width: '100%' }}
                      label={item}
                      placeholder={item}
                      onChange={(event) => handleChangeLanding(item, event.target.value)}
                      multiline
                    />
                  )))
                }
              </Container>
              <Container className="div-container__track" sx={{ my: 1, display: 'flex', flexDirection: 'column' }}>
                ADMIN RANDO ITEMS:
                {
                  Object.keys(hiking).map(((item) => (
                    <TextField
                      sx={{ p: '2px 4px', width: '100%' }}
                      // width="300px"
                      label={item}
                      placeholder={item}
                      onChange={(event) => handleChangeHiking(item, event.target.value)}
                      multiline
                    />
                  )))
                }
              </Container>
              <Button variant="contained" type="submit">Submit</Button>
            </div>
          </form>
        </div>
      )
        : <Loading />}
    </>
  );
}

AdminCreate.propTypes = {
  className: PropTypes.string,
};
AdminCreate.defaultProps = {
  className: '',
};
export default React.memo(AdminCreate);
