/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
import { Component } from 'react';

import { Link as ReactLink } from 'react-router-dom'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider} from '@mui/material/styles';

import {theme} from '../NavBar/navbartheme';
import {bordertheme} from '../Login/logintheme';

export default class CreateAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailError: false,
            emailErrorText: null,
            passwordError: false,
            passwordErrorText: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validEmail = this.validEmail.bind(this);
    }

    //https://stackoverflow.com/a/46181/13522077
    validEmail(email) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        //const remember = data.get('remember');
        if (email === "") {
            this.setState({emailError: true, emailErrorText: "Please input an email address"})
        } else if (!this.validEmail(email)) {
            this.setState({emailError: true, emailErrorText: "Invalid email address"})
        } else {
            this.setState({emailError: false, emailErrorText: null})
        }
        if (password === "") {
            this.setState({passwordError: true, passwordErrorText: "Please input a password"})
        } else {
            this.setState({passwordError: false, passwordErrorText: null})
        }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                            <ThemeProvider theme={bordertheme}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <p id="label">Email Address</p>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            name="email"
                                            autoComplete="email"
                                            color='secondary'
                                            focused
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <p id="label">Password</p>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            color='secondary'
                                            focused
                                        />
                                    </Grid>
                                </Grid>
                            </ThemeProvider>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: "secondary.main" }}
                            >
              Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <ReactLink to={"/login"} >
                                        <Link href="#" variant="body2">
                                            <Typography sx={{color: "#f9f9f9", textAlign: "right", fontSize: "14px", margin: 2}}>
                        Already have an account? Sign in
                                            </Typography> 
                                        </Link>
                                    </ReactLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        );
    }
}
