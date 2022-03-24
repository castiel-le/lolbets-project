import { Component } from "react";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { TypographyLight } from "../../customUIComponents";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { grey } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default class ToggleButtons extends Component {
    render() {
        // Styling
        const styleButtonGroup = {height: '36px'};
        const styleButtonTimeout = {backgroundColor: '#ddb745', 
            ':hover': {backgroundColor: '#ffbf00'}, 
            display: {xs: 'none', md: 'inherit'}};
        const styleButtonBan = {backgroundColor: '#bd1b1b', 
            ':hover': {backgroundColor: 'rgb(242, 40, 7)'}, 
            display: {xs: 'none', md: 'inherit'}};
        const styleIcon = {color: grey[50]};

        // Mod buttons values
        const timeoutValue = this.props.isTimeout ? "Untimeout" : "Timeout";
        const banValue = this.props.isBanned ? "Unban" : "Ban";
             
        return(
            <ToggleButtonGroup sx={styleButtonGroup}
                onChange={this.props.onChange} value={this.props.value}>
                <ToggleButton variant='contained' 
                    sx={styleButtonTimeout} value={timeoutValue}>
                    {timeoutValue === "Timeout"
                        ? <AccessTimeFilledIcon sx={styleIcon} />
                        : <CheckCircleIcon sx={styleIcon} />
                    }
                    <TypographyLight >
                        {timeoutValue}
                    </TypographyLight>
                </ToggleButton>
                <ToggleButton variant='contained' 
                    sx={styleButtonBan} value={banValue}>
                    {banValue === "Ban"
                        ? <DangerousIcon sx={styleIcon} />
                        : <CheckCircleIcon sx={styleIcon} />
                    }
                    <TypographyLight >
                        {banValue}
                    </TypographyLight>
                </ToggleButton>
            </ToggleButtonGroup>
        )
    }
}