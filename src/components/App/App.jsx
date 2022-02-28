import { Login } from '@mui/icons-material';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Map from '../Map/Map';
<<<<<<< HEAD
import Header from '../Header/Header';
=======
import TracksList from '../TracksList/TracksList';
>>>>>>> develop
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Header />
<<<<<<< HEAD
      <Map />
=======
      <Routes location={location}>
        <Route path="/" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tracksList" element={<TracksList />} />
        <Route path="/track/:id" element={<Track />} />
      </Routes>
>>>>>>> develop
    </div>
  );
}

export default App;
