import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.scss';
import App from './components/App/App';

ReactDOM.render(
  <BrowserRouter>
    <div className="bg-layer">
      <App />
    </div>

  </BrowserRouter>,
  document.getElementById('root'),
);
