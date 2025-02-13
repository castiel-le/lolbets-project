import { Fragment } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CasinoIcon from '@mui/icons-material/Casino';
import Paper from '@mui/material/Paper'
import { ThemeProvider } from '@mui/material/styles';

import '../../fonts/fonts.module.css';
import { NavLink } from 'react-router-dom';

export default function TemporaryDrawer(props) {

    const list = (anchor) => 
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={props.toggleDrawer}
            onKeyDown={props.toggleDrawer}
        >
            <List sx={{borderRadius: 0, }}>
                {props.pages.map((text, index) => 
                    <NavLink key={text} to={props.pageLinks[index]} >
                        <ListItem button>
                            <ListItemIcon>
                                <CasinoIcon sx={{ color: '#f9f9f9' }}/>
                            </ListItemIcon>
                            <ListItemText 
                                primary={text} 
                                sx={{color: '#f9f9f9', fontFamily: "Lemon-Milk-Light"}}/>
                        </ListItem>
                    </NavLink>
                )}
            </List>
        </Box>
    ;

    return (
        <ThemeProvider theme={props.theme} >
            <Fragment>
                <Drawer
                    anchor={'left'}
                    open={props.visible}
                    onClose={props.toggleDrawer}
                >
                    <Paper sx={{ backgroundColor: "#1f1f1f", height: "100vh"}}>
                        {list('left')}
                    </Paper>
                </Drawer>
            </Fragment>
        </ThemeProvider>
    );
}