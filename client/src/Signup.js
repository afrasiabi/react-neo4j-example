import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import React from 'react';
import axios from 'axios';
import css from './Signup.styl';

export default class Signup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    }
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.handleClickSignup = this.handleClickSignup.bind(this);
  }

  render(){
    return(
      <Paper className={css.signup}>
        <TextField floatingLabelText="Username" onChange={this.onChangeUser} id="username"/><br/>
        <TextField floatingLabelText="Email Addr." onChange={this.onChangeEmail} id="email" /><br/>
        <TextField floatingLabelText="Password" onChange={this.onChangePass} id="password" type="password"/><br/>
        <RaisedButton label="SIGNUP" className={css.button} primary={true} onClick={this.handleClickSignup} />
      </Paper>
    );
  }

  onChangeUser(e){
    this.setState({username: e.target.value})
  }

  onChangePass(e){
    this.setState({password: e.target.value})
  }

  onChangeEmail(e){
    this.setState({email: e.target.value})
  }

  handleClickSignup(){
    const username = this.state.username;
    const email = this.state.email;
    const signupPass = this.state.password;

    axios.post(SERVER_ADDRESS + '/signup', {username,email,signupPass, token: sessionStorage.getItem("token")})
    .then(function(res){
      console.log(res.data.msg);
    })
  }
}