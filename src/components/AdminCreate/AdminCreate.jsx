/* eslint-disable consistent-return */
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
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import { ThemeProvider } from '@emotion/react';
import TextField from '@mui/material/TextField';
// import { height } from '@mui/system';
import UploadImg from '../UploadImg/UploadImg';
import customTheme from '../../themes/customTheme';
import { requestHiking, requestHikingPost } from '../../requests/hiking';
import { requestLiftOff, requestLiftOffPost } from '../../requests/liftOff';
import { requestLandings, requestLandingPost } from '../../requests/landings';

import Loading from '../Loading/Loading';

function AdminCreate({
  className, onSetTracksList, userId, ...rest
}) {
  const [liftOff, setLiftOff] = useState({});
  const [landing, setLanding] = useState({});
  const [hiking, setHiking] = useState({});
  const [loading, setLoading] = useState(false);
  const [valuesLiftOff, setValuesLiftOff] = useState({});
  const [valuesLanding, setValuesLanding] = useState({});
  const [valuesHiking, setValuesHiking] = useState({});
  const [valuesImgLanding, setValuesImgLanding] = useState([]);
  const [valuesUrlLanding, setValuesUrlLanding] = useState([]);
  const [valuesImgLift, setValuesImgLift] = useState([]);
  const [valuesUrlLift, setValuesUrlLift] = useState([]);
  const [valuesImgHiking, setValuesImgHiking] = useState([]);
  const [valuesUrlHiking, setValuesUrlHiking] = useState([]);
  const [isRequired, setIsRequired] = useState(false);
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
    console.log('value du submit: ', valuesLanding, valuesImgLanding, valuesUrlLanding);

    requestLandingPost(valuesLanding, valuesImgLanding, valuesUrlLanding)
      .then((response) => {
        console.log('premiere requete');
        console.log('responsetLanding:', response);
        if (response.status === 200) {
          const cloneValuesLiftOff = { ...valuesLiftOff };
          const landingsId = [];
          landingsId.push(response.data[0].id);
          cloneValuesLiftOff.idLandings = landingsId;
          return cloneValuesLiftOff;
        }
        throw new Error(response);
      })
      .then(async (cloneValuesLiftOff) => {
        console.log('2 eme requetes value:', cloneValuesLiftOff);

        const response = await requestLiftOffPost(cloneValuesLiftOff, valuesImgLift, valuesUrlLift);
        console.log('responseLiftOff:', response);
        if (response.status === 200) {
          const cloneValuesHiking = { ...valuesHiking };
          cloneValuesHiking.liftOff_id = response.data[0].id.toString();
          cloneValuesHiking.user_id = userId;
          return cloneValuesHiking;
        }
        throw new Error(response);
      })
      .then(async (cloneValuesHiking) => {
        console.log('3eme requete valuesHiking:', cloneValuesHiking);
        const response = await requestHikingPost(cloneValuesHiking, valuesImgHiking, valuesUrlHiking);
        console.log('responseHiking:', response);
        if (response.status === 200) {
          const track = response.data[0];
          onSetTracksList(track);
        }
        else {
          throw new Error(response);
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
        navigate('/error');
      });
  };

  const handleChangeLiftOff = (item, inputValue) => {
    const valueClone = { ...valuesLiftOff };
    valueClone[item] = inputValue;
    console.log(valueClone);
    setValuesLiftOff(valueClone);
    setIsRequired(true);
  };
  const handleChangeLanding = (item, inputValue) => {
    const valueClone = { ...valuesLanding };
    valueClone[item] = inputValue;
    setValuesLanding(valueClone);
    setIsRequired(true);
    // console.log('le state', value);
  };
  const handleChangeHiking = (item, inputValue) => {
    const valueClone = { ...valuesHiking };
    valueClone[item] = inputValue;
    console.log(valueClone);
    setValuesHiking(valueClone);
    setIsRequired(true);
  };
  const handleImg = (name, imgName) => {
    console.log(' C EST QUOI LE NAME ', name);
    if (name === 'landing') {
      const myArrayImgNameClone = [...valuesImgLanding];
      myArrayImgNameClone.push(imgName);
      setValuesImgLanding(myArrayImgNameClone);
    }
    if (name === 'lift') {
      const myArrayImgNameClone = [...valuesImgLift];
      myArrayImgNameClone.push(imgName);
      setValuesImgLift(myArrayImgNameClone);
    }
    if (name === 'hiking') {
      const myArrayImgNameClone = [...valuesImgHiking];
      myArrayImgNameClone.push(imgName);
      setValuesImgHiking(myArrayImgNameClone);
    }
  };
  const handleUrl = (name, imgUrl) => {
    if (name === 'landing') {
      console.log('imgurl:', imgUrl);
      const myArrayImgUrlClone = [...valuesUrlLanding];
      myArrayImgUrlClone.push(imgUrl);
      setValuesUrlLanding(myArrayImgUrlClone);
    }
    if (name === 'lift') {
      console.log('imgurl:', imgUrl);
      const myArrayImgUrlClone = [...valuesUrlLift];
      myArrayImgUrlClone.push(imgUrl);
      setValuesUrlLift(myArrayImgUrlClone);
    }
    if (name === 'hiking') {
      console.log('imgurl:', imgUrl);
      const myArrayImgUrlClone = [...valuesUrlHiking];
      myArrayImgUrlClone.push(imgUrl);
      setValuesUrlHiking(myArrayImgUrlClone);
    }
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
              <ThemeProvider theme={customTheme}>
                <Container className="div-container__track" sx={{ my: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Fab color="primary" aria-label="edit">
                      <EditIcon />
                    </Fab>
                    ATTERISSAGE ITEMS
                  </Box>
                  {
                    Object.keys(landing).map(((item, index) => {
                      if (item !== 'id' && item !== 'photo_landing') {
                        return (
                          <TextField
                            key={index + item}
                            sx={{ p: '2px 4px', width: '100%' }}
                            required
                            label={item}
                            placeholder={item}
                            onChange={(event) => handleChangeLanding(item, event.target.value)}
                          />
                        );
                      }
                      if (item === 'photo_landing') {
                        return (
                          <>
                            <ImageList
                              key={index + item + index}
                              sx={{
                                width: 500,
                                height: valuesUrlLanding.length <= 0 ? 40 : 400,
                              }}
                              cols={3}
                              rowHeight={164}
                            >
                              {valuesUrlLanding.map((item, index) => (
                                <ImageListItem key={index + item + index + index}>
                                  <img
                                    src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item}
                                    loading="lazy"
                                  />
                                </ImageListItem>
                              ))}
                            </ImageList>
                          </>

                        );
                      }
                      return null;
                    }))
                  }
                  <UploadImg key="landing" onImgSelect={handleImg} onUrlSelect={handleUrl} name="landing" />
                </Container>
                <Container className="div-container__track" sx={{ my: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Fab color="primary" aria-label="edit">
                      <EditIcon />
                    </Fab>
                    DECOLLAGE ITEMS
                  </Box>
                  {
                    Object.keys(liftOff).map(((item) => {
                      if (item !== 'id' && item !== 'idLandings' && item !== 'photo_liftOff') {
                        return (
                          <TextField
                            sx={{ p: '2px 4px', width: '100%' }}
                            required
                            label={item}
                            placeholder={item}
                            name={item}
                            onChange={(event) => handleChangeLiftOff(item, event.target.value)}
                          />
                        );
                      }
                      if (item === 'photo_liftOff') {
                        return (
                          <>
                            <ImageList
                              sx={{
                                width: 500,
                                height: valuesUrlLift.length <= 0 ? 40 : 400,
                              }}
                              cols={3}
                              rowHeight={164}
                            >
                              {valuesUrlLift.map((item) => (
                                <ImageListItem key={item.valuesUrl}>
                                  <img
                                    src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item}
                                    loading="lazy"
                                  />
                                </ImageListItem>
                              ))}
                            </ImageList>
                          </>

                        );
                      }
                      return null;
                    }))
                  }
                  <UploadImg key="lift" onImgSelect={handleImg} onUrlSelect={handleUrl} name="lift" />
                </Container>

                <Container className="div-container__track" sx={{ my: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Fab color="primary" aria-label="edit">
                      <EditIcon />
                    </Fab>
                    RANDONNEES ITEMS
                  </Box>
                  {
                    Object.keys(hiking).map(((item) => {
                      if (item !== 'user_id' && item !== 'id' && item !== 'idLandings' && item !== 'liftOff_id' && item !== 'photo_hiking') {
                        return (
                          <TextField
                            sx={{ p: '2px 4px', width: '100%' }}
                            required
                            label={item}
                            placeholder={item}
                            onChange={(event) => handleChangeHiking(item, event.target.value)}
                            multiline
                          />
                        );
                      }
                      if (item === 'photo_hiking') {
                        return (
                          <>
                            <ImageList
                              sx={{
                                width: 500,
                                height: valuesUrlHiking.length <= 0 ? 40 : 400,
                              }}
                              cols={3}
                              rowHeight={164}
                            >
                              {valuesUrlHiking.map((item) => (
                                <ImageListItem key={item.valuesUrl}>
                                  <img
                                    src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item}
                                    loading="lazy"
                                  />
                                </ImageListItem>
                              ))}
                            </ImageList>
                          </>

                        );
                      }
                      return null;
                    }))
                }
                  <UploadImg key="hiking" onImgSelect={handleImg} onUrlSelect={handleUrl} name="hiking" />
                  {isRequired
                    ? (
                      <>
                        <Button variant="contained" sx={{ margin: '10px 0' }} type="submit" endIcon={<SendIcon />} size="large">Submit</Button>
                      </>

                    )
                    : ''}
                </Container>
              </ThemeProvider>
            </div>
          </form>
        </div>
      )
        : <Loading />}
    </>
  );
}

AdminCreate.propTypes = {
  onSetTracksList: PropTypes.func.isRequired,
  className: PropTypes.string,
  userId: PropTypes.number.isRequired,
};

AdminCreate.defaultProps = {
  className: '',

};
export default React.memo(AdminCreate);
