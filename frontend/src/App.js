import logo from './logo.svg';
import './App.css';

import AllBets from './components/Bets/AllBets';
import SignInForm from './components/Login/SignInForm'
import Signup from './components/Signup/CreateAccountForm'
import NavBar from "./components/NavBar/NavBar"
import { Route, Routes } from 'react-router-dom';
import Team from "./components/Team/Team"
import { Suspense, useState, useEffect } from 'react'
import Profile from './components/Profile/Profile';
import { Loading } from './components/customUIComponents';
import Teams from "./components/Teams/Teams";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import UserBetHistory from './components/UserBetHistory/UserBetHistroy';

let logoutcheck = false;

function logout(){
    logoutcheck = true;
}

function App() {
    // https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/
    // implement fetch and save to local storage when users are done
    const [user, setUser] = useState({});

    //localStorage.setItem("user", user)

    useEffect(() => {
        //setUser({email:'email', username: 'username', isModerator: false});

    //     const loggedInUser = localStorage.getItem("user");
    //     if (loggedInUser) {
    //         const foundUser = JSON.parse(loggedInUser);
    //         setUser(foundUser);
    //     }
    }, []);

    return (
        <div className="App">
            <NavBar user={false} />
            <Suspense fallback={<Loading />}>
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
                    <Route path='/bets' element={<AllBets user={user} />} />
                    <Route path='/bets/:id' element={<h1> Bet Number </h1>} />
                    <Route path='/bets/create' element={<h1> Create Bet </h1>} />
                    <Route path='/bets/edit/:id' element={<h1> Edit Bet Number </h1>} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/user/:id' element={<Profile />} />
                    <Route path='/user/:id/history' element={<UserBetHistory />} />
                    <Route path='/leaderboard' element={<Leaderboard />} />
                    <Route path='/teams' element={<Teams />} />
                    <Route path='/teams/:id' element={<Team />} />
                    <Route path='/user/search/:username' element={<h1> Search User </h1>} />
                    <Route path='/teams/search/:teamname' element={<h1> Search Team </h1>} />
                    <Route path='*' element={<h1> Not Found </h1>} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;