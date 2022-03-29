import logo from './logo.svg';
import './App.css';

import AllBets from './components/Bets/AllBets';
import SignInForm from './components/Login/SignInForm'
import Signup from './components/Signup/CreateAccountForm'
import NavBar from "./components/NavBar/NavBar"
import { Route, Routes, useLocation } from 'react-router-dom';
import Team from "./components/Team/Team"
import { Suspense, useState, useEffect } from 'react'
import Profile from './components/Profile/Profile';
import { Loading } from './components/customUIComponents';
import Teams from "./components/Teams/Teams";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import UserBetHistory from './components/UserBetHistory/UserBetHistroy';
import SearchResults from './components/Leaderboard/SearchResults'
import { SnackbarContainer } from './components/Snackbar/SnackbarContext';
import SnackbarAlert from './components/Snackbar/SnackbarAlert';
import Logout from "./components/Logout/Logout"

function App() {
    const [user, setUser] = useState({id: null, role: null, coins: 0, isLoaded: false});
    const location = useLocation();
    
    /**
     * Function that sets the user state to the currently logged in user.
     * It fetches from the API and if it returns an object, that means that the user
     * is logged in. This will set the user state into the returned object. If no object is
     * returned from the API, then the user is not logged in, and the user state will not
     * be updated.
     */
    const verifyUser = async () => {
        const userURL = "/userinfo";
        const userVerified = await fetch(userURL);
        
        if(userVerified.ok) {
            const fetchedUser = await userVerified.json();
            setUser({id: fetchedUser.id, role: fetchedUser.role, coins: fetchedUser.coins, isLoaded: true});
            return;
        }

        setUser({id: null, role: null, coins: 0, isLoaded: true});
    }

    /**
     * This function verifies the user. This is called when component 
     * is mounted and when the route changes. 
     */
    useEffect(async () => {
        await verifyUser();
    }, [location]);

    return (
        <SnackbarContainer>
            <SnackbarAlert />
            <div className="App">
                <NavBar user={user} />
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
                        <Route path='/bets' element={<AllBets user={user} updateUser={verifyUser}/>} />
                        <Route path='/bets/:id' element={<h1> Bet Number </h1>} />
                        <Route path='/bets/create' element={<h1> Create Bet </h1>} />
                        <Route path='/bets/edit/:id' element={<h1> Edit Bet Number </h1>} />
                        <Route path='/profile' element={<Profile user={user} />} />
                        <Route path='/user/:id' element={<Profile user={user} />} />
                        <Route path='/user/:id/history' element={<UserBetHistory  user={user} />} />
                        <Route path='/leaderboard' element={<Leaderboard  user={user} />} />
                        <Route path='/teams' element={<Teams  user={user} />} />
                        <Route path='/teams/:id' element={<Team  user={user} />} />
                        <Route path='/user/search' element={<SearchResults />} />
                        <Route path='/teams/search/:teamname' element={<h1> Search Team </h1>} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/404' element={<h1 style={{color: "white"}}> Not Found </h1>} />
                        <Route path='*' element={<h1 style={{color: "white"}}> Not Found </h1>} />
                    </Routes>
                </Suspense>
            </div>
        </SnackbarContainer>

    );
}

export default App;