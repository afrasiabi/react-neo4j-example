import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import React from 'react';
import axios from 'axios';
import css from './Login.styl';

export default class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.handleClickLogin = this.handleClickLogin.bind(this);
  }

  render(){
    return(
      <Paper className={css.login}>
          <TextField floatingLabelText="Username" onChange={this.onChangeUser} id="username"/><br/>
          <TextField floatingLabelText="Password" onChange={this.onChangePass} id="password" type="password"/><br/>
          <RaisedButton label="LOGIN" primary={true} className={css.button} onClick={this.handleClickLogin} />
      </Paper>
    );
  }

  onChangeUser(e){
    this.setState({username: e.target.value})
  }

  onChangePass(e){
    this.setState({password: e.target.value})
  }

  handleClickLogin(){
    const username = this.state.username;
    const password = this.state.password;

    axios.post(SERVER_ADDRESS + '/login', {username,password, token: sessionStorage.getItem("token")})
    .then( (res) => {
      console.log(res.data);
      if(res.data.status){
        sessionStorage.setItem("token", res.data.token);
        this.props.onLoggedIn(res.data.user);
      }
    })
    .catch(function(error) {
      console.log(error);
    })
  }

}