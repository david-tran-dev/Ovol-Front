import { useEffect, useState } from 'react';
import {
  Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Map from '../Map/Map';
import TracksList from '../TracksList/TracksList';
import { requestHiking } from '../../requests/data';
import './App.css';
import Track from '../Track/Track';
import { requestLiftOff } from '../../requests/map';
import LiftOff from '../LiftOff/LiftOff';

function App() {
  const location = useLocation();
  const [tracksList, setTracksList] = useState([]);
  const [filterTrackList, setFilterTrackList] = useState([]);
  const [liftOffList, setLiftOffList] = useState([]);

  // const [isLoading, setIsLoading] = useState(false);

  const handleFilterTrackList = (value) => {
    if (value === '') {
      setFilterTrackList(tracksList);
    }
    const searchList = tracksList.filter((track) => track.name.toLowerCase().includes(value.toLowerCase()));
    // console.log('searchlist', searchList);
    setFilterTrackList(searchList);
    return <Navigate to="/tracksList" />;
  };

  useEffect(async () => {
    // setIsLoading(true);
    const response = await requestHiking();

    if (response.status === 200) {
      setTracksList(response.data);
      setFilterTrackList(response.data);
      // setIsLoading(false);
    }
    else {
      console.log(response.data.message);
    }

    const liftOffResponse = await requestLiftOff();

    if (liftOffResponse.status === 200) {
      setLiftOffList(liftOffResponse.data);
    }
    else {
      console.log(liftOffResponse.data.message);
    }
  }, []);

  return (
    <div className="App">
      <Header onFilterList={handleFilterTrackList} />
      <Routes location={location}>
        <Route path="/" element={<Map liftOffList={liftOffList} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tracksList" element={<TracksList trackFilterList={filterTrackList} />} />
        <Route path="/track/:id" element={<Track tracksList={tracksList} />} />
        <Route path="/liftoff/:id" element={<LiftOff liftOffList={liftOffList} />} />
      </Routes>

    </div>
  );
}

export default App;
