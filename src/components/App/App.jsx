import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Map from '../Map/Map';
import TracksList from '../TracksList/TracksList';
import { requestHiking } from '../../requests/data';
import './App.css';

function App() {
  const location = useLocation();
  const [tracksList, setTracksList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    const response = await requestHiking();

    if (response.status === 200) {
      setTracksList(response.data);
      setIsLoading(false);
    }
    else {
      console.log(response.data.message);
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes location={location}>
        <Route path="/" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tracksList" element={<TracksList tracksList={tracksList} />} />
        {/* <Route path="/track/:id" element={<Track />} /> */}
      </Routes>
    </div>
  );
}

export default App;
