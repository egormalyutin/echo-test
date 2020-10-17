import React, { useState } from "react";

import {
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
  Container,
  Typography,
  CircularProgress,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import logo from "./logo.svg";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    width: "100%",
  },
  logoContainer: {
    width: "100%",
    marginBottom: 10,
  },
  progress: {
    color: "white",
  },
}));

export default function Login({ onLogIn }: { onLogIn?: () => void }) {
  const classes = useStyles();

  const [blocked, setBlocked] = useState(false);
  const logIn = () => {
    setBlocked(true);
    setTimeout(() => {
      setBlocked(false);
      onLogIn && onLogIn();
    }, 3000);
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <div className={classes.logoContainer}>
          <Grid container justify="center">
            <Grid item xs={6}>
              <img className={classes.logo} src={logo} />
            </Grid>
          </Grid>
        </div>
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Логин"
            name="login"
            autoComplete="current-login"
            autoFocus
            disabled={blocked}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            disabled={blocked}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Запомнить меня"
            disabled={blocked}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={logIn}
            disabled={blocked}
          >
            {blocked ? (
              <CircularProgress className={classes.progress} />
            ) : (
              "Войти"
            )}
          </Button>
        </form>
      </div>
    </Container>
  );
}
