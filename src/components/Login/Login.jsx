import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@emotion/react';

// import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import customTheme from '../../themes/customTheme';

function Login({ errorMessage, onLoginSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    onLoginSubmit(email, password);

    setEmail('');
    setPassword('');
  };

  return (
    <ThemeProvider theme={customTheme}>
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
          <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={((event) => setEmail(event.target.value))}
              {...(errorMessage.length > 0 ? {
                error: true,
                helperText: errorMessage,
              } : {})}
            />
            <TextField
              color="primary"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={((event) => setPassword(event.target.value))}
              {...(errorMessage.length > 0 ? {
                error: true,
                helperText: errorMessage,
              } : {})}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Connecter
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}

Login.propTypes = {
  setIsLogged: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onLoginSubmit: PropTypes.func.isRequired,
};

export default React.memo(Login);
