import logo from './testlogo.svg';
import './App.css';

import NavBar from "./components/NavBar/NavBar"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router >
      <NavBar user={false}/>
        <Routes >
          <Route path='/' element={
            <header className="App-header">
              <div class="svg-container">
              <img src={logo} width="64" className="App-logo" alt="logo" />
            </div>
            <p id="desc">
              Based page of LoLBets
            </p>
          </header>} />
          <Route path="/test" element={<h1>Hello</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
