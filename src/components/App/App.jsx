import React, { useEffect, useState } from 'react';
import {
  Routes, Route, useLocation, useNavigate,
} from 'react-router-dom';
import Login from '../Login/Login';
import Header from '../Header/Header';
import NavHeader from '../NavHeader/NavHeader';
import SearchBar from '../SearchBar/SearchBar';
import Map from '../Map/Map';
import TracksList from '../TracksList/TracksList';
import Contact from '../Contact/Contact';
import { requestHikingList } from '../../requests/hiking';
import './App.css';
import Track from '../Track/Track';
import { requestLiftOffList } from '../../requests/liftOff';
import LiftOff from '../LiftOff/LiftOff';
import { requestLogin } from '../../requests/login';
import { removeBearerToken, setBearerToken } from '../../requests';
import Loading from '../Loading/Loading';
import Landings from '../Landings/Landings';

function App() {
  const location = useLocation();
  const [tracksList, setTracksList] = useState([]);
  const [filterTrackList, setFilterTrackList] = useState([]);
  const [liftOffList, setLiftOffList] = useState([]);
  // const [searchBar, setSearchBar] = useState(false);
  const [isOpenNavBar, setIsOpenNavBar] = useState(true);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  // const [isLoading, setIsLoading] = useState(false);
  const handleIsOpenNavBar = (value) => {
    setIsOpenNavBar(value);
  };

  const handleFilterTrackList = (value) => {
    if (value === '') {
      setFilterTrackList(tracksList);
    }
    const searchList = tracksList.filter((track) => track.name.toLowerCase().includes(value.toLowerCase()));
    setFilterTrackList(searchList);
    navigate('/trackslist');
  };

  const handleLoginSubmit = async (email, password) => {
    setLoginErrorMessage('');
    const response = await requestLogin(email, password);
    console.log('response:', response);
    if (response.status === 200) {
      setBearerToken(response.data.accessToken);
      setIsLogged(true);
      setIsOpenNavBar(true);
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
    // setSearchBar(false);
    setIsOpenNavBar(true);
    navigate('/');
  };

  useEffect(async () => {
    // setIsLoading(true);
    const response = await requestHikingList();

    if (response.status === 200) {
      setTracksList(response.data);
      setFilterTrackList(response.data);
      // setIsLoading(false);
    }
    else {
      console.log(response.data.message);
    }

    const liftOffResponse = await requestLiftOffList();

    if (liftOffResponse.status === 200) {
      setLiftOffList(liftOffResponse.data);
    }
    else {
      console.log(liftOffResponse.data.message);
    }
  }, []);

  // const searchBarIsActive = (value) => {
  //   setSearchBar(value);
  //   console.log('value contact', value);
  // };

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
            <NavHeader onFilterList={handleFilterTrackList} />
          </>
        )
        : ''}

      <Routes location={location}>
        <Route path="/" element={<Map liftOffList={liftOffList} />} />
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
        <Route
          path="/tracksList"
          element={(
            <TracksList
              trackFilterList={filterTrackList}
              liftOffList={liftOffList}
            />
          )}
        />
        <Route path="/track/:id" element={<Track />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/liftoff/:id" element={<LiftOff />} />
        <Route path="/landings/:id" element={<Landings />} />
      </Routes>

    </div>
  );
}

export default React.memo(App);
