import logo from './logo.svg';
import './App.css';

import BetsPage from './components/Bets/BetsPage';
import NavBar from "./components/NavBar/NavBar"
import { Route, Routes, useLocation } from 'react-router-dom';
import Team from "./components/Team/Team"
import { Suspense, useState, useEffect, useContext } from 'react'
import Profile from './components/Profile/Profile';
import { Loading } from './components/customUIComponents';
import Teams from "./components/Teams/Teams";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import UserBetHistory from './components/UserBetHistory/UserBetHistroy';
import SearchResults from './components/Leaderboard/SearchResults'
import { SnackbarContext } from './components/Snackbar/SnackbarContext';
import Logout from "./components/Logout/Logout"
import { differenceInDays } from 'date-fns';
import LandingPage from './components/LandingPage/Landingpage'

function App1() {
    const [user, setUser] = useState({id: null, role: null, coins: 0, isLoaded: false});
    const location = useLocation();
    const Snackbar = useContext(SnackbarContext);
    
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
            if (fetchedUser.banned) {
                Snackbar.setSnackbar(true, 
                    `Reason: ${fetchedUser.banned.reason}`, 
                    'error',
                    `Banned`
                );
                setUser({id: null, role: null, coins: 0, isLoaded: true});
            } else if (fetchedUser.timeout) {
                const timeDiff = differenceInDays(
                    new Date(fetchedUser.timeout.end_date),
                    new Date()
                );
                Snackbar.setSnackbar(true, 
                    `Duration: ${timeDiff} days\nReason: ${fetchedUser.timeout.reason}`, 
                    'warning',
                    `Timed Out`
                );
                setUser({id: null, role: null, coins: 0, isLoaded: true});
            }else {
                setUser({id: fetchedUser.id, role: fetchedUser.role, coins: fetchedUser.coins, isLoaded: true});
            }
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
        <div className="App">
            <NavBar user={user} />
            <Suspense fallback={<Loading />}>
                <Routes >
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/bets' element={<BetsPage user={user} updateUser={verifyUser}/>} />
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

    );
}

export default App1;