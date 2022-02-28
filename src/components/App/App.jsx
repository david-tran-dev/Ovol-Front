import { Login } from '@mui/icons-material';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Map from '../Map/Map';
// import TracksList from '../TracksList/TracksList';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Header />
      <Routes location={location}>
        <Route path="/" element={<Map />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/tracksList" element={<TracksList />} /> */}
        {/* <Route path="/track/:id" element={<Track />} /> */}
      </Routes>
    </div>
  );
}

export default App;
