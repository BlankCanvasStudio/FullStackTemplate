import React, { Component } from "react";
import { Link } from 'react-router-dom';
import AuthService from "../../_services/auth";
import authHeader from '../../_helpers/index';
import axios from "axios";
const API_URL = "http://backend.localhost";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
    
    let config = { headers: authHeader() };
    console.log('config: ', config)
    axios
      .get(API_URL + "/users/"+this.state.currentUser.username+'/pronouns', {params:{}, headers:authHeader()})
      .then(response => {
        this.setState({ pronouns: response.data.pronouns });
      });

  }
  render() {
    const { currentUser } = this.state;
    
    if (currentUser == null) {
      return (
        <div>
          <h1>Log In Bitch</h1>
          <Link to='/login'>
            <button type="button">Login</button>
          </Link>
        </div>
      );
    }
    
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Username:</strong>{" "}
          {currentUser.username}
        </p>
        <p>
          <strong>Pronouns:</strong>{" "}
          {this.state.pronouns}
        </p>
        <button type="button" onClick={AuthService.logout}>Log Out</button>
      </div>
    );
  }
}
