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
import { requestHikingPost } from '../../requests/hiking';
import { requestLiftOffPost } from '../../requests/liftOff';
import { requestLandingPost } from '../../requests/landings';

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
    // }
    if (Object.keys(liftOff).length === 0) {
      const deco = {
        id: 2,
        name: 'Col des Fretes',
        typeOfTerrain: 'Herbe',
        description: 'Le col des Frêtes est un des plus beaux vols rando du bassin annécien. Le col des Frêtes est situé au Sud des Dents de Lanfon au dessus de Talloires et du site de parapente de Planfait. C’est un superbe décollage sur une belle pente herbeuse.',
        danger: 'Attention au vent du Nord.',
        fflvLink: '',
        latitude: 45.8565958,
        longitude: 6.2464359,
        favorableWind: 'SO,O',
        unfavorableWind: 'N,NE,E,SE',
        balise: 67,
        altitude: 1645,
        photo_liftOff: [],
      };
      setValuesLiftOff(deco);
      setLiftOff(deco);
      setLoading(false);
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
        name: 'Planfait',
        typeOfTerrain: 'Herbe',
        description: 'Grand Champs',
        danger: 'Survol de la maison en début de terrain interdit.',
        fflvLink: 'https://federation.ffvl.fr/sites_pratique/voir/1159',
        latitude: 45.8487,
        longitude: 6.2142,
        favorableWind: 'N,S',
        unfavorableWind: '',
        altitude: 567,
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
        name: 'Le col des Fretes',
        img_card: 'https://www.altituderando.com/local/cache-vignettes/L1200xH900/randoon15606-50776.jpg',
        mountain: 'Aravis',
        resume: 'Pour accéder au col de Frêtes, vous pouvez soit démarrer de l’atterrissage de Perroix pour 1100 mètres de dénivellée, soit faire une navette pour partir de Planfait pour 700 mètres de dénivelée. Le chemin est bien raide et se déroule presque intégralement en forêt… Le chemin démarre sur la droite à l’entrée du parking du décollage de Planfait et il est bien balisé.',
        key_stage: "(1) Virer à droite pour un aller-retour vers la Cascade d'Angon. Le chemin, étroit, en balcon sur un profond ravin est impressionnant, mais très bien sécurisé. Attention tout de même aux pierres glissantes car patinées par le passage et humides ; à éviter quand il y a beaucoup de monde. On passe par dessous un pilier stalagmitique sur laquelle coule une première cascade.\n (2) Le chemin se termine par un point de vue sur l'impressionnante chute d'eau dans un gouffre très étroit. Faire demi-tour.\n (3) Reprendre le chemin initial en partant à droite et en suivant le fléchage vers «Pont des Fées». On passe à côté d'une petite falaise qui fait office d'école d'escalade familiale.\n (4) Le Pont des Fées passe au-dessus du fougueux Nant d'Oy avec ses marmites de géant. Continuer le chemin fléché vers Rovagny. Dans Rovagny, suivre la route en tirant vers la gauche jusqu'à une intersection (calvaire). Prendre à gauche sur une vingtaine de mètres pour atteindre un lavoir.",
        starting_point: 'https://goo.gl/maps/k45DVRWeYCVoPr8S6',
        hiking_plan: '<iframe src="https://www.google.com/maps/d/u/1/embed?mid=1X4aGVl0d2486Qx4KtGNlRI4EDegYzzkA&ehbc=2E312F" width="640" height="480"></iframe>',
        positive_elevation: 1122,
        negative_elevation: 40,
        overall_length: 5.4,
        land_type: 'Forestier',
        ign_card_reference: 'Ref. 3431OT',
        hight_point: 1640,
        low_point: 555,
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
                    Object.keys(valuesLiftOff).map(((item, index) => {
                      if (item !== 'id' && item !== 'idLandings' && item !== 'photo_liftOff') {
                        return (
                          <TextField
                            key={index + item}
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
                              key={index + item + IDBIndex}
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
                    Object.keys(hiking).map(((item, index) => {
                      if (item !== 'user_id' && item !== 'id' && item !== 'idLandings' && item !== 'liftOff_id' && item !== 'photo_hiking') {
                        return (
                          <TextField
                            key={index + item}
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
                              key={index + item + index}
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
