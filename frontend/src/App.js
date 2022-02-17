import logo from './logo.svg';
import './App.css';

import AllBets from './components/Bets/AllBets';
import SignInForm from './components/Login/SignInForm'
import Signup from './components/Signup/CreateAccountForm'
import NavBar from "./components/NavBar/NavBar"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Suspense } from 'react'
import { CircularProgress } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Router >
        <NavBar user={false} />
        <Suspense fallback={<CircularProgress />}>
          <Routes >
            <Route path='/' element={
              <header className="App-header">
                <div className="svg-container">
                  <img src={logo} width="64" className="App-logo" alt="logo" />
                </div>
                <p id="desc">
                Based page of LoLBets
                </p>
              </header>} />
            <Route path="/login" element={<SignInForm />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/bets' element={<AllBets />} />
            <Route path='/bets/:id' element={<h1> Bet Number </h1>} />
            <Route path='/bets/create' element={<h1> Create Bet </h1>} />
            <Route path='/bets/edit/:id' element={<h1> Edit Bet Number </h1>} />
            <Route path='/profile' element={<h1> My Profile </h1>} />
            <Route path='/user/:id' element={<h1> User Number </h1>} />
            <Route path='/user/:id/history' element={<h1> User Number History </h1>} />
            <Route path='/leaderboard' element={<h1> Leaderboard </h1>} />
            <Route path='/teams' element={<h1> Teams </h1>} />
            <Route path='/teams/:id' element={<h1> Team Number </h1>} />
            <Route path='/user/search/:username' element={<h1> Search User </h1>} />
            <Route path='/teams/search/:teamname' element={<h1> Search Team </h1>} />
            <Route path='*' element={<h1> Not Found </h1>} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
