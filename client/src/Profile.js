import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import React from 'react';
import axios from 'axios';
import css from './Profile.styl';

export default class Profile extends React.Component{
  constructor(props) {
    super(props);
    this.handleAuth = this.handleAuth.bind(this);
    this.handleClickLogout = this.handleClickLogout.bind(this);
  }

  render(){
    let button;
    if(this.props.isAuth)
      button = <RaisedButton label="LOGOUT" secondary={true} className={css.button} onClick={this.handleClickLogout} />;
    return(
      <Paper>
        <div className={css.welcome}>WELCOME {this.props.username}</div>
        {button}
      </Paper>
    );
  }

  componentDidMount(){
    this.handleAuth();
  }

  handleAuth(){
    axios.post(SERVER_ADDRESS + '/getInfo', { token: sessionStorage.getItem("token") })
    .then((res) => { 
      console.log(res.data)
      if (res.data.status){
        this.props.onLoggedIn(res.data.status);
      }
    })
  }

  handleClickLogout(){
    const self = this;
    axios.post(SERVER_ADDRESS + '/logout', {token: sessionStorage.getItem("token")})
    .then(function(res){
      self.props.onLogout();
    })
  }
}