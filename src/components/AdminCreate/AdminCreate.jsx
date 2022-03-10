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
import { ThemeProvider } from '@emotion/react';
import TextField from '@mui/material/TextField';
// import { height } from '@mui/system';
import UploadImg from '../UploadImg/UploadImg';
import customTheme from '../../themes/customTheme';
import { requestHiking } from '../../requests/hiking';
import { requestLiftOff, requestLiftOffPost } from '../../requests/liftOff';
import { requestLandings, requestLandingPost } from '../../requests/landings';

import Loading from '../Loading/Loading';

function AdminCreate({ className, ...rest }) {
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
  // const [valuesTextField, setValuesTextField] = useState({});
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
    // console.log('valueLiftOf:', valuesLiftOff);
    console.log('value du submit: ', valuesLanding, valuesImgLanding, valuesUrlLanding);

    requestLandingPost(valuesLanding, valuesImgLanding, valuesUrlLanding)
      .then((responseLand) => {
        console.log('resultLand:', responseLand);
        if (responseLand.status === 200) {
          const cloneValuesLiftOff = { ...valuesLiftOff };
          const landingsId = [];
          landingsId.push(responseLand.data[0].id);
          cloneValuesLiftOff.idLandings = landingsId;
          setValuesLiftOff(cloneValuesLiftOff);
          console.log('clonevaluesLift', cloneValuesLiftOff);
        }
        else {
          console.log(responseLand);
          navigate('/error');
        }
      })
      .then(async () => {
        console.log('valuesLiftOff:', valuesLiftOff);
        const responseLiftOff = await requestLiftOffPost(valuesLiftOff, valuesImgLift, valuesUrlLift);
        console.log('responseLiftOff:', responseLiftOff);
        if (responseLiftOff.status === 200) {
          const cloneValuesLiftOff = { ...valuesLiftOff };
          const landingsId = [];
          landingsId.push(responseLiftOff.data[0].id);
          cloneValuesLiftOff.idLandings = landingsId;
          setValuesLiftOff(cloneValuesLiftOff);
          console.log('clonevaluesLift', cloneValuesLiftOff);
        }
        else {
          console.log(responseLiftOff);
          navigate('/error');
        }
      });
    // const liftPromise = await requestLiftOffPost(valuesLiftOff, valuesImgLift, valuesUrlLift);
    // const hikingPromise = await requestHikingPost(valuesHiking, valuesImgHiking, valuesUrlHiking);
    // console.log('response retour fetch responseLand:', responseLand.data[0].id);
    // console.log({ valuesLanding, valuesImg, valuesUrl });
    // const idLand = responseLand.data.id;
    // if (responseLand) {
    //   const responseLift = await requestLiftOffPost(valuesLiftOff, idLand);
    //   console.log(responseLift.data.id);
    //   const idLift = (responseLift.data.id);
    //   if (responseLift) {
    //     requestHikingPost(valuesHiking, idLand, idLift);
    //   }
    // }
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
    // console.log('type of item', (typeof (inputValue)));
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
  const handleImg = (name, imgName) => {
    console.log(' C EST QUOI LE NAME ', name);
    if (name === 'landing') {
      const myArrayImgNameClone = [...valuesImgLanding];
      // myArrayImg[0] = (imgUrl);
      myArrayImgNameClone.push(imgName);
      // setValuesUrl(imgUrl);
      setValuesImgLanding(myArrayImgNameClone);
      // console.log({ myArrayImgNameClone });
      // console.log('imgselected:', imgName);
      // setValuesImg(imgName);
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
      // myArrayImg[0] = (imgUrl);
      myArrayImgUrlClone.push(imgUrl);
      // setValuesUrl(imgUrl);
      setValuesUrlLanding(myArrayImgUrlClone);
      // console.log({ myArrayImgUrlClone });
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
  // const handleImgLift = (imgName) => {
  //   const myArrayImgNameClone = [...valuesImgLift];
  //   // myArrayImg[0] = (imgUrl);
  //   myArrayImgNameClone.push(imgName);
  //   // setValuesUrl(imgUrl);
  //   setValuesImgLift(myArrayImgNameClone);
  //   // console.log({ myArrayImgNameClone });
  //   // console.log('imgselected:', imgName);
  //   // setValuesImg(imgName);
  // };
  // const handleUrlLift = (imgUrl) => {
  //   console.log('imgurl:', imgUrl);
  //   const myArrayImgUrlClone = [...valuesUrlLift];
  //   // myArrayImg[0] = (imgUrl);
  //   myArrayImgUrlClone.push(imgUrl);
  //   // setValuesUrl(imgUrl);
  //   setValuesUrlLift(myArrayImgUrlClone);
  //   // console.log({ myArrayImgUrlClone });
  // };
  // const handleImgHick = (imgName) => {
  //   const myArrayImgNameClone = [...valuesImgHick];
  //   // myArrayImg[0] = (imgUrl);
  //   myArrayImgNameClone.push(imgName);
  //   // setValuesUrl(imgUrl);
  //   setValuesImgHick(myArrayImgNameClone);
  //   // console.log({ myArrayImgNameClone });
  //   // console.log('imgselected:', imgName);
  //   // setValuesImg(imgName);
  // };
  // const handleUrlHick = (imgUrl) => {
  //   console.log('imgurl:', imgUrl);
  //   const myArrayImgUrlClone = [...valuesUrlHick];
  //   // myArrayImg[0] = (imgUrl);
  //   myArrayImgUrlClone.push(imgUrl);
  //   // setValuesUrl(imgUrl);
  //   setValuesUrlHick(myArrayImgUrlClone);
  //   console.log({ myArrayImgUrlClone });
  // };

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
                  ADMIN ATTERRISSAGE ITEMS:
                  {
                    Object.keys(landing).map(((item, index) => {
                      if (item !== 'id' && item !== 'photo_landing') {
                        return (
                          <TextField
                            key={index + item}
                            sx={{ p: '2px 4px', width: '100%' }}
                            label={item}
                            placeholder={item}
                            onChange={(event) => handleChangeLanding(item, event.target.value)}
                            // multiline
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
                  ADMIN DECOLLAGE ITEMS:
                  {
                    Object.keys(liftOff).map(((item) => {
                      if (item !== 'id' && item !== 'idLandings' && item !== 'photo_liftOff') {
                        return (
                          <TextField
                            sx={{ p: '2px 4px', width: '100%' }}
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
                  ADMIN RANDO ITEMS:
                  {
                    Object.keys(hiking).map(((item) => {
                      if (item !== 'user_id' && item !== 'id' && item !== 'idLandings' && item !== 'liftOff_id' && item !== 'photo_hiking') {
                        return (
                          <TextField
                            sx={{ p: '2px 4px', width: '100%' }}
                            // width="300px"
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
                </Container>
                <Button variant="contained" type="submit">Submit</Button>
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
  className: PropTypes.string,
};
AdminCreate.defaultProps = {
  className: '',
};
export default React.memo(AdminCreate);
