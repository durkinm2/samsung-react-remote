// import logo from './logo.svg';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import MainApp from './MainApp';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <MainApp />
        </BrowserRouter>
      </div>
  );
}

export default App;
