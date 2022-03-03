import { useEffect, useState } from 'react';
import {
  Routes, Route, useLocation, Navigate,
} from 'react-router-dom';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Map from '../Map/Map';
import TracksList from '../TracksList/TracksList';
import { requestHikingList } from '../../requests/hiking';
import './App.css';
import Track from '../Track/Track';
import TrackPhotos from '../TrackPhotos/TrackPhotos';

function App() {
  const location = useLocation();
  const [tracksList, setTracksList] = useState([]);
  const [filterTrackList, setFilterTrackList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const handleFilterTrackList = (value) => {
    if (value === '') {
      setFilterTrackList(tracksList);
    }
    const searchList = tracksList.filter((track) => track.name.toLowerCase().includes(value.toLowerCase()));
    // console.log('searchlist', searchList);
    setFilterTrackList(searchList);
    return <Navigate to="/tracksList" />;
    // console.log('value dans app', value);
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

  return (
    <div className="App">
      <TrackPhotos />
      <Header onFilterList={handleFilterTrackList} />
      <Routes location={location}>
        <Route path="/" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tracksList" element={<TracksList trackFilterList={filterTrackList} />} />
        <Route path="/track/:id" element={<Track />} />
      </Routes>
    </div>
  );
}

export default App;
