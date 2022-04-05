import { useState, useEffect } from "react";

import { FlexBoxRow, TypographyLight, TypographyMedium } from "../../customUIComponents";

import Diamond from '@mui/icons-material/Diamond';
import InfoIcon from '@mui/icons-material/Info';

import { CircularProgress, Tooltip } from "@mui/material";

export default function payout({minutes, categoryIndex}) {
    const [payout, setPayout] = useState(['-', '-', '-']);

    useEffect(() => {
        // Clears running timer and starts a new one each time the user types
        const fetchTimer = setTimeout(() => {
            fetchPayout();
        }, 150);
        return () => clearTimeout(fetchTimer);
    }, [minutes]);

    /**
     * Fetches the payout for the current input minutes
     */
    async function fetchPayout() {
        if (minutes[0] === 'x') {
            return;
        }
        // Makes the view render a progress bar while fetching payout
        setPayout(<CircularProgress size={12}/>);
        // multiplied by 60 for transform into seconds
        const url = `/api/payout?time1=${minutes[0] * 60}&time2=${minutes[1] * 60}&amount=100`;
        const response = await fetch(url);
        if (response.ok) {
            const json = await response.json();
            setPayout([json.before, json.after, minutes.length === 2 ? json.between : '-']);
        }
    }

    return (
        <FlexBoxRow width='35%' sx={{justifyContent: 'center', pl: 3, maxHeight: '60px', my: 'auto', minWidth: '150px'}}>
            <FlexBoxRow sx={{borderBottom: '1px solid #171720', borderRadius: '4px', p: 1, backgroundColor: 'rgba(255,204,1,0.7)'}}>
                <TypographyMedium fontSize={14} sx={{color:'#1E2A32', my: 'auto', width: '65px'}}>
                    Payout:
                </TypographyMedium>
                <TypographyMedium fontSize={14} sx={{color:'#1E2A32', my: 'auto', width: '35px'}}>
                    {Array.isArray(payout) ? payout[categoryIndex] : payout}
                </TypographyMedium>
                <Diamond sx={{my: 'auto', color: '#1E2A32', fontSize: 18}}/>
            </FlexBoxRow>
            <Tooltip title={
                <TypographyLight>
                    All custom bets cost 100 coins to enter
                </TypographyLight>
            }>
                <InfoIcon sx={{color: '#f5f5f5', fontSize: 14}}/>
            </Tooltip>
        </FlexBoxRow>
    );
}