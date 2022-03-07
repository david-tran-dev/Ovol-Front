/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  useNavigate,
} from 'react-router-dom';
import {
  Container,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import { requestHiking } from '../../requests/hiking';
import Loading from '../Loading/Loading';

function Track({ className, ...rest }) {
  const [hiking, setHiking] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(async () => {
    console.log('useEffect');

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

  return (
    <>

      {!loading ? (
        <div
          className={`track ${className}`}
          {...rest}
        >
          <form>
            <div className="div-container">
              <Container className="div-container__track" sx={{ my: 1, display: 'flex', flexDirection: 'column' }}>
                ADMIN DECOLLAGE ITEMS:
                {
                                Object.keys(hiking).map(((item) => (
                                  <TextField
                                    sx={{ p: '2px 4px', width: '100%' }}
                                    label={item}
                                    placeholder={item}
                                      // value={value}
                                      // onChange={handleChange}
                                    multiline
                                  />
                                )))
                }
              </Container>
              <Container className="div-container__track" sx={{ my: 1, display: 'flex', flexDirection: 'column' }}>
                ADMIN ATTERRISSAGE ITEMS:
                {
                                Object.keys(hiking).map(((item) => (
                                  <TextField
                                    sx={{ p: '2px 4px', width: '100%' }}
                                    label={item}
                                    placeholder={item}
                                      // value={value}
                                      // onChange={handleChange}
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
                                      // value={value}
                                      // onChange={handleChange}
                                    multiline
                                  />
                                )))
                }
              </Container>
            </div>
          </form>
        </div>
      )
        : <Loading />}
    </>
  );
}

Track.propTypes = {
  className: PropTypes.string,
};
Track.defaultProps = {
  className: '',
};
export default React.memo(Track);
