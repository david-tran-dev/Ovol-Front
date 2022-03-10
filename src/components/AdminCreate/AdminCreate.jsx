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
import { requestLiftOff } from '../../requests/liftOff';
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
  const [valuesImg, setValuesImg] = useState([]);
  const [valuesUrl, setValuesUrl] = useState([]);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('valueLiftOf:', valuesLiftOff);

    const responseLand = await requestLandingPost(valuesLanding, valuesImg, valuesUrl);
    console.log('response retour fetch responseLand:', responseLand.data[0].id);
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
  const handleImg = (imgName) => {
    const myArrayImgNameClone = [...valuesImg];
    // myArrayImg[0] = (imgUrl);
    myArrayImgNameClone.push(imgName);
    // setValuesUrl(imgUrl);
    setValuesImg(myArrayImgNameClone);
    console.log({ myArrayImgNameClone });
    // console.log('imgselected:', imgName);
    // setValuesImg(imgName);
  };
  const handleUrl = (imgUrl) => {
    console.log('imgurl:', imgUrl);
    const myArrayImgUrlClone = [...valuesUrl];
    // myArrayImg[0] = (imgUrl);
    myArrayImgUrlClone.push(imgUrl);
    // setValuesUrl(imgUrl);
    setValuesUrl(myArrayImgUrlClone);
    console.log({ myArrayImgUrlClone });
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
                  ADMIN ATTERRISSAGE ITEMS:
                  {
                    Object.keys(landing).map(((item) => {
                      if (item !== 'id' && item !== 'photo_landing') {
                        return (
                          <TextField
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
                            {/* <TextField
                              sx={{ p: '2px 4px', width: '100%' }}
                              label={item}
                              placeholder={item}
                              // onChange={(event) => handleUrl(event.target.value)}
                              value={[valuesImg, valuesUrl]}
                              multiline
                            /> */}
                            {/* <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                              <ImageListItem>
                                <img
                                  src={valuesUrl}
                                  alt={valuesImg}
                                />
                              </ImageListItem>
                            </ImageList> */}
                            <ImageList
                              sx={{
                                width: 500,
                                height: valuesUrl.length <= 0 ? 40 : 400,
                              }}
                              cols={3}
                              rowHeight={164}
                            >
                              {valuesUrl.map((item) => (
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
                  <UploadImg imgSelect={handleImg} urlSelect={handleUrl} />
                </Container>
                <Container className="div-container__track" sx={{ my: 1, display: 'flex', flexDirection: 'column' }}>
                  ADMIN DECOLLAGE ITEMS:
                  {
                    Object.keys(liftOff).map(((item) => {
                      if (item !== 'id' && item !== 'idLandings') {
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
                      return null;
                    }))
                  }
                  <UploadImg />
                </Container>

                <Container className="div-container__track" sx={{ my: 1, display: 'flex', flexDirection: 'column' }}>
                  ADMIN RANDO ITEMS:
                  {
                    Object.keys(hiking).map(((item) => {
                      if (item !== 'user_id' && item !== 'id' && item !== 'idLandings' && item !== 'liftOff_id') {
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
                      return null;
                    }))
                }
                  <UploadImg />
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
