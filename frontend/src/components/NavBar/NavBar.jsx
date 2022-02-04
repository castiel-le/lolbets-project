import { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';

import SideDrawer from "./SideDrawer"

import { NavLink } from 'react-router-dom';

import './NavBar.css';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { Login } from '@mui/icons-material';

const pages = ['Bets', 'Teams', 'Leaderboard'];
const settings = ['Profile', 'Friends', 'Bet History', 'Logout'];

const Hamburger = (props) => {
    return (
        <ThemeProvider theme={theme} >
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={props.toggleDrawer}
                    color="inherit"
                >
                <MenuIcon fontSize='large'/>
                </IconButton>
            </Box>
        </ThemeProvider>
    );
}

const UserAvatar = (props) => {
    return (
        <ThemeProvider theme={theme} >
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={props.handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" sx={{height: 32, width: 32,}}/>
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={props.anchorToUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={props.openUserMenu}
                    onClose={props.handleCloseUserMenu}
                    color='inherit'
                >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={props.handleCloseUserMenu}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </ThemeProvider>
    );
}


export default class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorToUser: null,
            openUserMenu: false,
            sideMenuOpen: false,
        };

        this.handleOpenUserMenu = this.handleOpenUserMenu.bind(this);
        this.handleCloseUserMenu = this.handleCloseUserMenu.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    }

    handleOpenUserMenu(event) {
        this.setState({
            anchorToUser: event.currentTarget,
            openUserMenu: true
        });
    }

    handleCloseUserMenu() {
        this.setState({
            anchorToUser: null,
            openUserMenu: false
        });
    }

    toggleDrawer() {
        this.setState({
            sideMenuOpen: !this.state.sideMenuOpen
        })
    }

    render() {
        return (
            <ThemeProvider theme={theme} >
                <SideDrawer toggleDrawer={this.toggleDrawer} visible={this.state.sideMenuOpen} pages={pages} theme={theme}/>
                <AppBar position="static" color='primary' sx={{px: 2}}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>

                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            >
                                <NavLink to={"/"} style={{all: "inherit", cursor: "pointer", marginRight: "0px"}}>
                                    <img className="navbar-logo" src="logo192.png" alt='lolbets logo'/>
                                </NavLink>
                            </Typography>

                            <Hamburger toggleDrawer={this.toggleDrawer} />

                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                            >
                                <NavLink to={"/"} style={{all: "inherit", cursor: "pointer", marginRight: "0px"}}>
                                    <img className="navbar-logo" src="logo192.png" alt='lolbets logo'/>
                                </NavLink>
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    {pages.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={this.handleCloseNavMenu}
                                        sx={{ my: 2, color: 'inherit', display: 'block', mx: '2',
                                            '&:hover': {
                                                backgroundColor: "rgba(128,128,128,.3);",
                                            }}
                                        }
                                    >
                                        <NavLink to={"/test"} style={{textDecoration: "none", color: "inherit"}}>
                                            {page}
                                        </NavLink>
                                    </Button>
                                    ))}
                            </Box>

                            {this.props.user
                                ? <UserAvatar 
                                    openUserMenu={this.state.openUserMenu} 
                                    anchorToUser={this.state.anchorToUser} 
                                    handleOpenUserMenu={this.handleOpenUserMenu} 
                                    handleCloseUserMenu={this.handleCloseUserMenu}
                                />
                                : <Stack direction="row" spacing={1}>
                                    <Button 
                                        variant="contained" 
                                        startIcon={<Login />}
                                        color='secondary' 
                                        sx={{
                                            color: "#0f1519", 
                                            display: {xs: "none", md: "inherit"},
                                            '&:hover': {
                                                backgroundColor: "rgb(0, 200, 200)",
                                            }}}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                      variant="contained"
                                      color="secondary"
                                      sx={{
                                        color: "#0f1519", 
                                        display: {xs: "inherit", md: "none"},
                                        padding: "3px",
                                        '&:hover': {
                                            backgroundColor: "rgb(0, 200, 200)",
                                        }}}
                                    >
                                      <Login />
                                    </Button>
                                </Stack>
                            }
                        </Toolbar>
                    </Container>
                </AppBar>
            </ThemeProvider>
        );
    }
}
