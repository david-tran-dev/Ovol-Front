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
    // setLoading(true);
    // if (Object.keys(liftOff).length === 0) {
    //   const response = await requestLiftOff(2);
    //   console.log('response setloadn', response);
    //   if (response.status === 200) {
    //     setLiftOff(response.data[0]);
    //   }
    //   else {
    //     console.log(response);
    //     navigate('/error');
    //   }
    // }
    // if (Object.keys(liftOff).length > 0) {
    //   setLoading(false);
    // }
    if (Object.keys(liftOff).length === 0) {
      const deco = {
        id: 2,
        name: 'Déco SEPTMONCEL',
        typeOfTerrain: 'Herbe',
        description: "Approche de l'atterrissage de l'Essard (contre-pente) en PT8 pour le delta. L'atterrissage du haut est délicat en parapente en pleine journée. Toujours vérifier que la biroute du décollage parapente est bien orientée pour éviter de décoller dans le rouleau en cas de vent Est ou Nord. Les parapentes décollent à 1050 m. Les deltas décollent à 1020 m.",
        danger: 'Ligne à haute tension au milieu du cirque.',
        fflvLink: 'https://intranet.ffvl.fr/sites_pratique/voir/54',
        latitude: 46.371,
        longitude: 5.8985,
        favorableWind: 'O',
        unfavorableWind: '',
        balise: 2563,
        altitude: 1026,
        photo_liftOff: [],
      };
      setValuesLiftOff(deco);
      setLiftOff(deco);
    }
  }, [liftOff]);

  useEffect(async () => {
    // setLoading(true);
    // if (Object.keys(landing).length === 0) {
    //   const response = await requestLandings(2);
    //   console.log('response setloadn', response);
    //   if (response.status === 200) {
    //     setLanding(response.data[0]);
    //   }
    //   else {
    //     console.log(response);
    //     navigate('/error');
    //   }
    // }
    // if (Object.keys(landing).length > 0) {
    //   setLoading(false);
    // }
    if (Object.keys(landing).length === 0) {
      const atero = {
        id: 2,
        name: 'Atéro Villard',
        typeOfTerrain: 'Herbe',
        description: 'Turbulent par vent fort, surtout de Nord.',
        danger: '',
        fflvLink: 'https://intranet.ffvl.fr/sites_pratique/voir/54',
        latitude: 46.3723,
        longitude: 5.87678,
        favorableWind: 'O',
        unfavorableWind: '',
        altitude: 576,
        photo_landing: [],
      };
      setValuesLanding(atero);
      setLanding(atero);
    }
  }, [landing]);

  useEffect(async () => {
    // setLoading(true);
    // if (Object.keys(hiking).length === 0) {
    //   const response = await requestHiking(2);
    //   console.log('response setloadn', response);
    //   if (response.status === 200) {
    //     setHiking(response.data[0]);
    //   }
    //   else {
    //     console.log(response);
    //     navigate('/error');
    //   }
    // }
    // if (Object.keys(hiking).length > 0) {
    //   setLoading(false);
    // }
    if (Object.keys(hiking).length === 0) {
      const rando = {
        id: 1,
        name: 'Semnoz Grotte des fours',
        img_card: 'https://res.cloudinary.com/ovol/image/upload/q_50/v1646905878/img-seeding/Annecy-Semnoz__2013_hyn3lu.jpg',
        mountain: 'Bauges',
        resume: 'Montée soutenue en forêt avec en bonus des grottes à visiter. Attention falaise à surmonter au niveau de la grotte des four. Le sentier est balisé sur toute la longueur',
        key_stage: "D/A : km 0 - alt. 595m - Cimetière de Viuz-la-Chiésaz\n    1 : km 0.24 - alt. 594m - Croisement CD5/Route des Pierres\n    2 : km 1.61 - alt. 738m - Les Granges\n    3 : km 3.25 - alt. 1016m - Croisement de Combe Noire\n    4 : km 4.22 - alt. 1326m - Croisement de la Grotte des Fours\n    5 : km 5.47 - alt. 1640m - Parking près du bâtiment du Courant d'Ere\n    6 : km 6.13 - alt. 1694m - Crêt de Châtillon - Le Semnoz",
        starting_point: 'https://goo.gl/maps/WQPNLEjkxyw5KAbv7',
        hiking_plan: '<iframe src="https://www.google.com/maps/d/u/2/embed?mid=1JZCA93VmwEXRcKn9GnlKawxOtpHfI20W&ehbc=2E312F" width="640" height="480"></iframe>',
        positive_elevation: 1028,
        negative_elevation: 2,
        overall_length: 6.9,
        land_type: 'Forestier',
        ign_card_reference: 'Ref. 3431OT 3431OTR',
        hight_point: 1694,
        low_point: 587,
        difficulty: 'Difficile',
        photo_hiking: [],
      };
      setValuesHiking(rando);
      setHiking(rando);
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
    console.log('item:', item);
    console.log('inputValue:', inputValue);
    const valueClone = { ...valuesLanding };
    valueClone[item] = inputValue;
    setValuesLanding(valueClone);
    setIsRequired(true);
    console.log('le state', valuesLanding);
  };
  const handleChangeHiking = (item, inputValue) => {
    const valueClone = { ...valuesHiking };
    valueClone[item] = inputValue;
    console.log(valueClone);
    setValuesHiking(valueClone);
    setIsRequired(true);
  };
  const handleImg = (name, imgName) => {
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
                    Object.keys(valuesLanding).map(((item, index) => {
                      if (item !== 'id' && item !== 'photo_landing') {
                        return (
                          <TextField
                            key={index + item}
                            sx={{ p: '2px 4px', width: '100%' }}
                            required
                            label={item}
                            value={valuesLanding[item]}
                            placeholder={item}
                            onChange={(event) => handleChangeLanding(item, event.target.value)}
                          />
                        );
                      }
                      // if (item !== 'id' && item !== 'photo_landing') {
                      //   return (
                      //     <TextField
                      //       key={index + item}
                      //       sx={{ p: '2px 4px', width: '100%' }}
                      //       required
                      //       label={item}
                      //       placeholder={item}
                      //       onChange={(event) => handleChangeLanding(item, event.target.value)}
                      //     />
                      //   );
                      // }
                      if (item === 'photo_landing') {
                        console.log('dans le if photo');
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
                    Object.keys(valuesLiftOff).map(((item) => {
                      if (item !== 'id' && item !== 'idLandings' && item !== 'photo_liftOff') {
                        return (
                          <TextField
                            sx={{ p: '2px 4px', width: '100%' }}
                            required
                            label={item}
                            placeholder={item}
                            name={item}
                            value={valuesLiftOff[item]}
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
                            value={valuesHiking[item]}
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
