/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import {
  Routes, Route, useLocation, useNavigate,
} from 'react-router-dom';

// Components
import Login from '../Login/Login';
import Header from '../Header/Header';
import NavHeader from '../NavHeader/NavHeader';
import SearchBar from '../SearchBar/SearchBar';
import Map from '../Map/Map';
import TracksList from '../TracksList/TracksList';
import AdminCreate from '../AdminCreate/AdminCreate';
import Track from '../Track/Track';
import ErrorPage from '../ErrorPage/ErrorPage';
import Contact from '../Contact/Contact';
import Footer from '../Footer/Footer';
import LiftOff from '../LiftOff/LiftOff';
import Loading from '../Loading/Loading';
import Landings from '../Landings/Landings';
import About from '../About/About';
import LegalNotice from '../LegalNotice/LegalNotice';

// Requests
import { requestHikingList } from '../../requests/hiking';
import { requestLiftOffList } from '../../requests/liftOff';
import { requestLogin } from '../../requests/login';
import { removeBearerToken, setBearerToken } from '../../requests';
import './app.scss';

function App() {
  const location = useLocation();
  const [tracksList, setTracksList] = useState([]);
  const [filterTrackList, setFilterTrackList] = useState([]);
  const [liftOffList, setLiftOffList] = useState([]);
  const [isOpenNavBar, setIsOpenNavBar] = useState(true);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [isFiltersActive, setIsFiltersActive] = useState(false);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const handleIsOpenNavBar = (value) => {
    setIsOpenNavBar(value);
  };

  useEffect(async () => {
    if (tracksList.length === 0) {
      const response = await requestHikingList();
      console.log('response:', response);

      if (response.status === 200) {
        setTracksList(response.data);
        setFilterTrackList(response.data);
      }
      else {
        console.log(response.data.message);
        navigate('/error');
      }
    }

    if (liftOffList.length === 0) {
      const liftOffResponse = await requestLiftOffList();

      if (liftOffResponse.status === 200) {
        setLiftOffList(liftOffResponse.data);
      }
      else {
        console.log(liftOffResponse.data.message);
        navigate('/error');
      }
    }
  }, []);

  const handleFilterTrackList = (value) => {
    if (value === '') {
      setFilterTrackList(tracksList);
    }
    const searchList = tracksList.filter((track) => track.name.toLowerCase().includes(value.toLowerCase()));
    setFilterTrackList(searchList);
    if (location.pathname !== '/tracklist') {
      setIsFiltersActive(false);
    }
    navigate('/trackslist');
  };

  const handleLoginSubmit = async (email, password) => {
    setLoginErrorMessage('');
    const response = await requestLogin(email, password);
    console.log('responseLogin:', response);
    if (response.status === 200) {
      setBearerToken(response.data.accessToken);
      setIsLogged(true);
      setIsOpenNavBar(true);
      setUserId(response.data.id);
      navigate('/trackslist');
    }
    else {
      setIsLogged(false);
      setLoginErrorMessage(response.data);
    }
  };

  const handleLogoutSubmit = () => {
    removeBearerToken();
    setIsLogged(false);
    setIsOpenNavBar(true);
    navigate('/');
  };

  const handleFiltersClick = () => {
    setIsFiltersActive((prevState) => !prevState);
  };

  const multiFilterTrack = (filters) => {
    console.log('filters:', filters);

    const result = tracksList.filter((track) => {
      if (filters[0] !== '' && track.mountain !== filters[0]) return false;
      if (filters[1] !== '' && track.difficulty !== filters[1]) return false;
      if (filters[2] !== '') {
        const liftOffFound = liftOffList.find((liftOff) => liftOff.id === track.liftOff_id);
        console.log('liftOffFound:', liftOffFound);
        if (!liftOffFound.favorableWind.includes(filters[2])) return false;
      }
      if (filters[3] !== '' && track.overall_length > filters[3]) return false;
      if (filters[4] !== '' && track.positive_elevation > filters[4]) return false;
      if (filters[5] !== '' && track.duration > filters[5]) return false;

      return true;
    });
    console.log('result', result);
    setFilterTrackList(result);
  };

  const handleFilterChange = (filters) => {
    multiFilterTrack(filters);
  };

  const handleResetFilter = () => {
    console.log('reinit');
    setFilterTrackList(tracksList);
  };

  const handleSetTracksList = async (track) => {
    console.log('track:', track);
    const cloneTracksList = [...tracksList];
    cloneTracksList.push(track);
    setTracksList(cloneTracksList);
    setFilterTrackList(cloneTracksList);
    const liftOffResponse = await requestLiftOffList();
    if (liftOffResponse.status === 200) {
      setLiftOffList(liftOffResponse.data);
    }
    else {
      console.log(liftOffResponse.data.message);
      navigate('/error');
    }
    navigate('/trackslist');
  };

  return (
    <div className="App">
      <Header
        onFilterList={handleFilterTrackList}
        onActiveNav={handleIsOpenNavBar}
        isLogged={isLogged}
        onLogoutSubmit={handleLogoutSubmit}
      />
      {isOpenNavBar
        ? (
          <>
            <SearchBar onFilterList={handleFilterTrackList} />
            <NavHeader onFilterList={handleFilterTrackList} onFiltersClick={handleFiltersClick} />

          </>
        )
        : ''}

      <Routes location={location}>
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/legalnotice" element={<LegalNotice onActiveNav={handleIsOpenNavBar} />} />
        <Route path="/about" element={<About onActiveNav={handleIsOpenNavBar} />} />
        <Route path="/" element={<Map liftOffList={liftOffList} tracksList={tracksList} />} />
        <Route
          path="/login"
          element={(
            <Login
              onLoginSubmit={handleLoginSubmit}
              errorMessage={loginErrorMessage}
              onActiveNav={handleIsOpenNavBar}
            />
          )}
        />
        <Route path="/contact" element={<Contact onActiveNav={handleIsOpenNavBar} />} />
        {isLogged
          ? (
            <Route path="/adminCreate" element={<AdminCreate userId={userId} onActiveNav={handleIsOpenNavBar} onSetTracksList={handleSetTracksList} />} />
          )
          : <Route path="*" element={<ErrorPage />} />}
        <Route
          path="/trackslist"
          element={(
            <TracksList
              onActiveNav={handleIsOpenNavBar}
              trackFilterList={filterTrackList}
              liftOffList={liftOffList}
              isFiltersActive={isFiltersActive}
              tracksList={tracksList}
              onFilterChange={handleFilterChange}
              onResetFilter={handleResetFilter}
            />
          )}
        />
        <Route path="/track/:id" element={<Track />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/liftoff/:id" element={<LiftOff />} />
        <Route path="/landings/:id" element={<Landings />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default React.memo(App);
