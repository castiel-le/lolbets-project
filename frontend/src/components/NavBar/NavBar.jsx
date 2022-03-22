/* eslint-disable max-len */
// Imports from modules
import { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { 
    AppBar, 
    Box, 
    Toolbar, 
    IconButton, 
    Typography, 
    Menu, 
    Container, 
    Avatar, 
    Button, 
    Tooltip, 
    MenuItem, 
    Stack
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { Google, Menu as MenuIcon } from '@mui/icons-material';

import DiamondIcon from "@mui/icons-material/Diamond";
import {FlexBoxColumn, FlexBoxRow, HorizontalDivider, TypographyMedium} from '../customUIComponents';

// Custom components imports
import SideDrawer from "./SideDrawer";
import '../../fonts/fonts.module.css';
import { theme } from './navbartheme';

import { pages, pageLinks } from '../../config/pages';
import { settings, settingLink } from '../../config/userDropDown';

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
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={props.handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar 
                        alt={props.user.username} 
                        src={props.user.profile_pic} 
                        sx={{height: 36, width: 36}}
                    />
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
                {settings.map((setting, index) => {
                    return (
                        <NavLink key={setting} to={settingLink[index].replace(":id", props.user.user_id)} sx={{all: 'unset'}}>
                            <MenuItem onClick={props.handleCloseUserMenu}>
                                <TypographyMedium textAlign="center" sx={{color: '#2a373c'}}>
                                    {setting}
                                </TypographyMedium>
                            </MenuItem>
                        </NavLink>
                    )
                })}
            </Menu>
        </Box>
    );
}

const AccountBalance = (props) => {
    return (

        <FlexBoxColumn mx={2} my={'auto'}>
            <FlexBoxRow >
                <DiamondIcon sx={{fontSize: '1.25rem'}}/>
                <TypographyMedium fontSize={14} sx={{ml: '6px', my: 'auto'}}>
                    {props.user.coins}
                </TypographyMedium>
            </FlexBoxRow>
            <HorizontalDivider width='100%' sx={{my: 0, height: 'fit-content'}}/>
        </FlexBoxColumn>    
    );
}


class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorToUser: null,
            openUserMenu: false,
            sideMenuOpen: false,
            userInfo: null,
        };

        this.handleOpenUserMenu = this.handleOpenUserMenu.bind(this);
        this.handleCloseUserMenu = this.handleCloseUserMenu.bind(this);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
    }

    async componentDidMount() {
        if (this.props.user.id !== null) {
            await this.fetchUserInfo();
        }
    }

    async componentDidUpdate() {
        if (this.props.user.id && this.state.userInfo === null) {
            await this.fetchUserInfo();
        }
    }

    /**
     * logic that happens when the user opens the avatar user menu
     * @param {Event} event 
     */
    handleOpenUserMenu(event) {
        this.setState({
            anchorToUser: event.currentTarget,
            openUserMenu: true
        });
    }

    /**
     * logic that happens when the user closes the avatar user menu
     */
    handleCloseUserMenu() {
        this.setState({
            anchorToUser: null,
            openUserMenu: false
        });
    }

    /**
     * Opens or closes the side drawer
     */
    toggleDrawer() {
        this.setState({
            sideMenuOpen: !this.state.sideMenuOpen
        })
    }

    /**
     * Fetches user information and adds it to the component state.
     * isUsetInfoLoading will be set to false if fetch is successful.
     */
    async fetchUserInfo() {
        if (this.props.user.id === null) {
            return;
        } 
        const url = "/api/user/";
        try {
            const response = await fetch(url + this.props.user.id);
            if (response.ok) {
                this.setState({
                    userInfo: await response.json(),
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        if(this.props.logoutcheck){
            this.verifyUser();
        }
        return (
            <ThemeProvider theme={theme} >
                <SideDrawer toggleDrawer={this.toggleDrawer} visible={this.state.sideMenuOpen} pages={pages} pageLinks={pageLinks} theme={theme}/>
                <AppBar position="static" color='primary' sx={{px: 2}}>
                    <Container maxWidth="xxl">
                        <Toolbar disableGutters>

                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            >
                                <NavLink to={"/"} style={{all: "inherit", cursor: "pointer", marginRight: "0px"}}>
                                    <img src="logo192.png" alt='lolbets logo' style={{maxHeight: '40px'}}/>
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
                                    <img className="navbar-logo" src="logo192.png" alt='lolbets logo' style={{maxHeight: '40px'}}/>
                                </NavLink>
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {pages.map((page, index) => 
                                    <NavLink key={page} to={pageLinks[index]} style={{ textDecoration: "none", color: "inherit" }}>
                                        <Button
                                            onClick={this.handleCloseNavMenu}
                                            sx={{
                                                py: 2, color: 'inherit', display: 'block', px: '2',
                                                '&:hover': {
                                                    backgroundColor: "rgba(128,128,128,.3);",
                                                }
                                            }}
                                        >
                                            <TypographyMedium>
                                                {page}
                                            </TypographyMedium>
                                        </Button>
                                    </NavLink>
                                )}
                            </Box>

                            {this.props.user.id && this.state.userInfo !== null
                                ?
                                <Fragment>
                                    <AccountBalance user={this.props.user}/>
                                    <UserAvatar 
                                        openUserMenu={this.state.openUserMenu} 
                                        anchorToUser={this.state.anchorToUser} 
                                        handleOpenUserMenu={this.handleOpenUserMenu} 
                                        handleCloseUserMenu={this.handleCloseUserMenu}
                                        user={this.state.userInfo}
                                    />
                                </Fragment>
                                : <Stack direction="row" spacing={1}>
                                    <a href={"/api/login/federated/google"} style={{all: "inherit", cursor: "pointer"}}>
                                        <Button 
                                            variant="contained" 
                                            startIcon={<Google />}
                                            color='secondary' 
                                            sx={{
                                                color: "#0f1519", 
                                                display: {xs: "none", md: "inherit"},
                                                '&:hover': {
                                                    backgroundColor: "rgb(0, 200, 200)",
                                                }}}
                                        >
                                            <TypographyMedium sx={{color: 'unset'}}>
                                                Login
                                            </TypographyMedium>
                                        </Button>
                                    </a>
                                    <NavLink to={"/api/login/federated/google"} style={{all: "inherit", cursor: "pointer"}}>
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
                                            <Google />
                                        </Button>
                                    </NavLink>
                                </Stack>
                            }
                        </Toolbar>
                    </Container>
                </AppBar>
            </ThemeProvider>
        );
    }
}

export default NavBar;
