import { useEffect, useState } from 'react';
import {
  Routes, Route, useLocation, useNavigate,
} from 'react-router-dom';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Map from '../Map/Map';
import TracksList from '../TracksList/TracksList';
import { requestHiking } from '../../requests/data';
import './App.css';
import Track from '../Track/Track';
import { requestLogin } from '../../requests/login';
import { removeBearerToken, setBearerToken } from '../../requests';

function App() {
  const location = useLocation();
  const [tracksList, setTracksList] = useState([]);
  const [filterTrackList, setFilterTrackList] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    console.log('isloggout');
    navigate('/');
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
      <Header onFilterList={handleFilterTrackList} isLogged={isLogged} onLogoutSubmit={handleLogoutSubmit} />
      <Routes location={location}>
        <Route path="/" element={<Map />} />
        <Route path="/login" element={<Login onLoginSubmit={handleLoginSubmit} errorMessage={loginErrorMessage} />} />
        <Route path="/trackslist" element={<TracksList trackFilterList={filterTrackList} />} />
        <Route path="/track/:id" element={<Track tracksList={tracksList} />} />
      </Routes>
    </div>
  );
}

export default App;
