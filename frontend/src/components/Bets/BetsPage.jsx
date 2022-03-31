import {Component, Fragment, useState} from 'react';

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
            style={{overflowY: 'scroll', height: '80vh'}}
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

    function changeTab(event, tabNumber) {
        setCurrentTab(tabNumber);
    }

    return (
        <Fragment>
            <StyledTabs value={currentTab} onChange={changeTab} centered>
                <StyledTab label={<TypographyMedium>Matchup Bets</TypographyMedium>}/>
                <StyledTab label={<TypographyMedium>Custom Bets</TypographyMedium>}/>
            </StyledTabs>
            <TabPanel value={currentTab} index={0}>
                <Matchups user={user} updateUser={updateUser}/>
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
                <UserCreatedBets />
            </TabPanel>
        </Fragment> 
    );
}