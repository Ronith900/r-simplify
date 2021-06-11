/* eslint-disable no-undef */
import React from "react";
import PropTypes from 'prop-types';
import Task from "../providers/task";
import Token from "../providers/token";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import "../login.css";

const theme = createMuiTheme();
const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
};


class Login extends React.Component {

    state = {
        username: '',
        password: ''
    }

    handleSubmit = async(e) => {
        e.preventDefault();
        const {data: accessToken} = await new Token().getAccessToken(this.state);
        localStorage.setItem("token", JSON.stringify(accessToken));
        const token_object = this.getToken();
        const logedInUser = await new Task().getCurrentUser(token_object[1]);
        localStorage.setItem("user_object", JSON.stringify(logedInUser));
        window.location = '/'
      };

    handleChange = ({ currentTarget: input }) => {
        const stateKey = { ...this.state };
        stateKey[input.name] = input.value;
        this.setState(stateKey);
        
      };

      getToken = () => {
        const tokenString = localStorage.getItem("token");
        const userToken = JSON.parse(tokenString);
        return [userToken?.token, userToken?.id, userToken?.shopOwner];
      };

  render() {
    const { classes } = this.props;
    return (

        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>

        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={this.state.username} 
            onChange={this.handleChange}
            id="username"
            label="Username"
            name="username"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={this.state.password} 
            onChange={this.handleChange}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
     
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.root}
            onClick={this.handleSubmit}
          >
            Sign In
          </Button>

        </form>
      </div>
      <Box mt={8}>

      </Box>
    </Container>
    );
  }
}


Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login) ;
