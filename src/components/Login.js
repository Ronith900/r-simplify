import React from "react";
import Task from "../providers/task";
import Token from "../providers/token";
import { Form,Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import "../login.css";
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
    return (
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter User Name" value={this.state.username} name="username" onChange={this.handleChange} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
          </Form.Group>
          <Button variant="success" type="submit" block>
            <FontAwesomeIcon icon={faSignInAlt}/>&nbsp;
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
