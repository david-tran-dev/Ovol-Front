import { Login } from '@mui/icons-material';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Map from '../Map/Map';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Header />
      <Routes location={location}>
        <Route path="/" element={<Map />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
