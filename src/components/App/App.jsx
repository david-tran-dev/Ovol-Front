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
import ErrorPage from '../ErrorPage/ErrorPage';

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
    const response = await requestHiking();

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
      <Header onFilterList={handleFilterTrackList} />
      <Routes location={location}>
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tracksList" element={<TracksList trackFilterList={filterTrackList} />} />
        <Route path="/track/:id" element={<Track tracksList={tracksList} />} />
      </Routes>
    </div>
  );
}

export default App;
