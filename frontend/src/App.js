import logo from './testlogo.svg';
import './App.css';

import NavBar from "./components/NavBar"

function App() {
  return (
    <div className="App">
    <NavBar />
      <header className="App-header">
        <div class="svg-container">
          <img src={logo} width="64" className="App-logo" alt="logo" />
        </div>
        <p id="desc">
          Based page of LoLBets
        </p>
      </header>
    </div>
  );
}

export default App;
