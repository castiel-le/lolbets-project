import {Fragment, useState, useEffect} from 'react';

import { TypographyMedium } from '../customUIComponents';
import { Tab, Tabs, styled } from '@mui/material';

import Matchups from './Matchups';
import UserCreatedBets from './UserCreatedBets';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            style={{overflowY: 'auto', height: '80vh'}}
            {...other}
        >
            {value === index && 
            <Fragment>
                {children}
            </Fragment>
            }
        </div>
    );
}

const StyledTabs = styled(Tabs)({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'rgb(0,200,200)',
    },
});

const StyledTab = styled(Tab)({
    width: '15em',
    ':hover':{
        backgroundColor: 'rgba(0,100,100, 0.4)'
    },
    '&.Mui-selected': {
        backgroundColor: 'rgba(0,100,100, 0.2)',
        ':hover': {
            backgroundColor: 'rgba(0,100,100, 0.4)'
        }
    },
});

export default function BetsPage({user, updateUser}) {

    const [currentTab, setCurrentTab] = useState(0);
    const [lastFetchedDate, setLastFetchedDate] = useState(new Date().setHours(0, 0, 0, 0));
    const [allFetchedDates, setAllFetchedDates] = useState([]);
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [upcomingMatchesByDate, setUpcomingMatchesByDate] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [fetchNextDate, setFetchNextDate] = useState(false);

    useEffect(() => {
        fetchUpcomingMatches(1);
    }, []);

    // if lastFetchedDate updates, set fetching to false
    useEffect(() => {
        setAllFetchedDates([...allFetchedDates, lastFetchedDate]);
        setFetching(false);
    }, [lastFetchedDate]);

    useEffect(() => {
        if (fetchNextDate) {
            fetchUpcomingMatches(1);
        }
        setFetchNextDate(false);
    }, [fetchNextDate]);

    function changeTab(event, tabNumber) {
        setCurrentTab(tabNumber);
    }

    /**
    * This fetches fetch a certain number of days worth of games from the database
    * Default start day is today
    * If there is no result from the initial fetch,
    * then the fetch will try for the next set of days
    * Will stop trying to fetch if the fetch for 2 weeks from now has not returned anything
    * @param {number} days The number of days you want to fetch data for.
    * @returns returns if there was an error in the fetch
    */
    async function fetchUpcomingMatches(days) {
        if (fetching) {
            return;
        }
        setFetching(true);
        let nextDay = lastFetchedDate + days * 86400 * 1000;
        let response = await fetch(`/api/matches?afterthis=${lastFetchedDate}&beforethis=${nextDay}`);
        if (!response.ok) {
            console.error("Error fetching matches: " + response.status);
            setFetching(false);
            return;
        }
        let matches = await response.json();
        // If the result set of the fetch is 0 data, fetch the next n days
        if (matches.length === 0) {
            let today = new Date().setHours(0, 0, 0, 0);
            // If we have tried fetching for over 2 weeks of data, 
            // and nothing has returned, 
            // display that their are no upcoming games
            if (nextDay - today < 28 * 86400 * 1000) {
                setLastFetchedDate(nextDay);
                setFetchNextDate(true);
            }
        } else {
            setLastFetchedDate(nextDay);
            setUpcomingMatches([...upcomingMatches, ...matches]);
            setUpcomingMatchesByDate([...upcomingMatchesByDate, ...sortMatchesByDate(matches)]);
        }
    }

    /**
    * Sorts the matches into arrays , seperated by date
    * @param {*} matches all matches fetched from fb
    * @returns array of matches by date
    */
    function sortMatchesByDate(matches) {
        let matchesCurrentDate = [];
        let allDates = [];

        matches.forEach(element => {
            if (matchesCurrentDate.length === 0 
        || new Date(matchesCurrentDate[0].match_start_time).getDate() 
        === new Date(element.match_start_time).getDate()
            ) {
                matchesCurrentDate.push(element);
            } else {
                allDates.push(matchesCurrentDate);
                matchesCurrentDate = [];
            }
        });
        if (matchesCurrentDate.length > 0) {
            allDates.push(matchesCurrentDate);
        }
        return allDates;
    }

    let props = {
        user: user,
        updateUser: updateUser,
        upcomingMatchesByDate: upcomingMatchesByDate,
        fetchUpcomingMatches: fetchUpcomingMatches,
        fetching: fetching,
        countDatesFetched: allFetchedDates.length
    }

    return (
        <Fragment>
            <StyledTabs value={currentTab} onChange={changeTab} centered>
                <StyledTab label={<TypographyMedium>Matchup Bets</TypographyMedium>}/>
                <StyledTab label={<TypographyMedium>Custom Bets</TypographyMedium>}/>
            </StyledTabs>
            <TabPanel value={currentTab} index={0}>
                <Matchups {...props}/>
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
                <UserCreatedBets {...props} />
            </TabPanel>
        </Fragment> 
    );
}