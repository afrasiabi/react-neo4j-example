import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import React from 'react';
import axios from 'axios';
import Comment from './Comment';
import CommentBox from './CommentBox';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import css from './App.styl';

export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false,
      username: ""
    }
  }

  render(){
    if (this.state.isAuth) {
      return(
        <Paper style={{backgroundColor: "#E91E63"}} className={css.container}>
          <Profile
            isAuth= {this.state.isAuth}
            username= {this.state.username}
            onLogout= { () => this.setState({ isAuth: false, username: "" }) }
            onLoggedIn= { (username) => this.setState({ isAuth: true, username }) }
          />
          <CommentBox />
        </Paper>
      )
    } else {
      return(
        <Paper style={{backgroundColor: "#E91E63"}} className={css.container}>
          <Profile
            isAuth= {this.state.isAuth}
            username= {this.state.username}
            onLogout= { () => this.setState({ isAuth: false, username: "" }) }
            onLoggedIn= { (username) => this.setState({ isAuth: true, username }) }
          />
          <Login onLoggedIn= { (username) => this.setState({ isAuth: true, username }) }/>
          <Signup />
        </Paper>
      )
    }
  }
}