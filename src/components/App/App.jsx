import React, { useEffect, useState } from 'react';
import {
  Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import Login from '../Login/Login';
import Header from '../Header/Header';
import NavHeader from '../NavHeader/NavHeader';
import SearchBar from '../SearchBar/SearchBar';
import Map from '../Map/Map';
import TracksList from '../TracksList/TracksList';
import Contact from '../Contact/Contact';
import MentionsLegales from '../MentionsLegales/MentionsLegales';
import Apropos from '../Apropos/Apropos';
import { requestHikingList } from '../../requests/hiking';
import './App.css';
import Track from '../Track/Track';

function App() {
  const location = useLocation();
  const [tracksList, setTracksList] = useState([]);
  const [filterTrackList, setFilterTrackList] = useState([]);
  const [searchBar, setSearchBar] = useState(false);
  const [isOpenNavBar, setIsOpenNavBar] = useState(true);

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
    setSearchBar(false);
    setIsOpenNavBar(true);
    return <Navigate to="/tracksList" />;
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
  }, []);

  const searchBarIsActive = (value) => {
    setSearchBar(value);
  };

  return (
    <div className="App">
      <Header onFilterList={handleFilterTrackList} isActive={searchBar} onActiveNav={handleIsOpenNavBar} />
      {isOpenNavBar
        ? (
          <>
            <SearchBar onActiveNav={handleIsOpenNavBar} onFilterList={handleFilterTrackList} />
            <NavHeader onFilterList={handleFilterTrackList} />
          </>
        )
        : ''}

      {/* <MenuHeader onActiveNav={handleIsOpenNavBar} /> */}
      <Routes location={location}>
        <Route path="/" element={<Map />} />
        <Route path="/login" element={<Login isActiveBar={searchBarIsActive} />} />
        <Route path="/contact" element={<Contact isActiveBar={searchBarIsActive} />} />
        <Route path="/mentionsLegales" element={<MentionsLegales isActiveBar={searchBarIsActive} />} />
        <Route path="/apropos" element={<Apropos isActiveBar={searchBarIsActive} />} />
        <Route path="/tracksList" element={<TracksList trackFilterList={filterTrackList} />} />
        <Route path="/track/:id" element={<Track />} />
        {/* <Route path="/liftOff/:id" element={<Track />} /> */}
      </Routes>
    </div>
  );
}

export default React.memo(App);
