import { Component } from 'react';

import { Link as ReactLink } from 'react-router-dom'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import {theme} from '../NavBar/navbartheme';
import {bordertheme} from './logintheme';
import "./SignInForm.css";


export default class SignInForm extends Component {

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

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        const remember = data.get('remember');
        // eslint-disable-next-line no-console
        console.log({
          email: email,
          password: password,
        });
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

    //https://stackoverflow.com/a/46181/13522077
    validEmail(email) {
      return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
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
                    Sign in
                  </Typography>
                  <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                    <ThemeProvider theme={bordertheme}>
                      <p>Email Address</p>
                      <TextField
                        margin="0"
                        required
                        fullWidth
                        id="email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        error={this.state.emailError}
                        helperText={this.state.emailErrorText}
                        sx={{ backgroundColor: "#233039"}}
                        color="secondary"
                        focused
                      />
                      <p>Password</p>
                      <TextField
                        margin="0"
                        required
                        fullWidth
                        name="password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={this.state.passwordError}
                        helperText={this.state.passwordErrorText}
                        sx={{ backgroundColor: "#233039"}}
                        color="secondary"
                        focused
                      />
                      <FormControlLabel
                        control={<Checkbox id="remember" style={{color: "yellow"}} value="remember" color="secondary" />}
                        label="Remember me"
                      />
                    </ThemeProvider>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, backgroundColor: 'secondary.main' }}
                    >
                      Sign In
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <ReactLink to={"/signup"} >
                            <Link href="/signup" variant="body2">
                              <Typography sx={{color: "#f9f9f9", textAlign: "right", fontSize: "14px", margin: 2}}>
                                Create an account
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
