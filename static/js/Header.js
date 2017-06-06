import React from 'react';
import axios from 'axios';
import Comment from './Comment';
// import Style from './style.js'
import './style.css';

export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            name:  "",
            email: "",
            signupPass: "",
            comment: "",
            isAuth: false,
            authName: "",
            loadedComments:[]
        }
        this.handleClickLogin = this.handleClickLogin.bind(this);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangePass = this.onChangePass.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleClickSignup = this.handleClickSignup.bind(this);
        this.handleClickLogout = this.handleClickLogout.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.handleAuth = this.handleAuth.bind(this);
        this.showComments = this.showComments.bind(this);
    }

    handleAuth(){
        const self = this;
        const username = this.state.authName;

        axios.post('/getInfo', {username})
            .then(function(res){
                if(res.data.status){
                    console.log(res.data.status)
                    self.setState({
                        isAuth: true,
                        authName: res.data.status
                    })
                }else{
                    self.setState({authName: "unKnown user!!"})
                }
            })
    }

    componentDidMount(){
        this.handleAuth();
    }

    onChangeUser(e){
        this.setState({username: e.target.value})
    }

    onChangePass(e){
        this.setState({password: e.target.value})
    }

    onChangeName(e){
        this.setState({name: e.target.value})
    }
    onChangeEmail(e){
        this.setState({email: e.target.value})
    }
    onChangePassword(e){
        this.setState({signupPass: e.target.value})
    }



    onChangeComment(e){
        this.setState({comment: e.target.value})
        console.log(this.state.comment);
    }

    handleClickLogin(){
        const username = this.state.username;
        const password = this.state.password;
        const self = this;

        axios.post('/login', {username,password})
        .then(function(res){
            console.log(res.data.msg);
            if(res.data.status){
                self.setState({
                    isAuth: true,
                    authName: res.data.user
                });
            }
        })
        .catch(function(error) {
            console.log(error);
            })
    }


    handleClickSignup(){
        const username = this.state.name;
        const email = this.state.email;
        const signupPass = this.state.signupPass;

        axios.post('/signup', {username,email,signupPass})
            .then(function(res){
                console.log(res.data.msg);
            })
    }

    handleClickLogout(){
        const username = this.state.username;
        const password = this.state.password;
        const self = this;

        axios.post('/logout', {username,password})
            .then(function(res){
                console.log(res.data.msg);
                self.setState({
                    isAuth: false,
                    authName: res.data.user
                })
                console.log(self.state.isAuth);
            })
    }

    handleSubmitComment() {
        const comment = this.state.comment;
        const username = this.state.authName;
        const self = this;

        // az push e array nemituni estefade koni chon mutable e!
        // pas bayad hatman az concat ezafe koni
        // concat yani be array ghabli (this.state.showComments) yek array digar (yek array yeduneE: [comment]) bechasban
        // natije ra set state kon
            axios.post('/submitComment', {comment, username})
                .then(function (res) {
                  if(res.data.status !== false) {
                    self.setState({loadedComments: self.state.loadedComments.concat([{text: comment, username: username, id: Date.now()}])});
                  }
                  console.log(res.data.msg);
                })
                .catch(function(err) {
                    console.log(err)
                })
}

    showComments(){
        const self = this;
        const authName = this.state.authName;
        const loadedComments = this.state.loadedComments;
       axios.post('/getComments', {authName})
           .then(function(res){
              const comment = res.data;
              self.setState({loadedComments: comment});
           })
           .catch(function (err) {
               console.log(err);
           })
    }

    render(){

      const comments = this.state.loadedComments.map(function(comment){
        return(
          <Comment key={comment.id} text={comment.text} username={comment.username}/>
          )
      });
        return(
            <div className="forms">
                <h1>HOME PAGE</h1>
                <span id="auth">WELCOME {this.state.authName}</span><br/>
                <div className="login">
                    <input placeholder="Username" onChange={this.onChangeUser} id="username" type="text" /><br/>
                    <input placeholder="Password" onChange={this.onChangePass} id="password" type="password"/><br/>
                    <hr/>
                    <button className="button" onClick={this.handleClickLogin}>LOGIN</button>
                    <button className="button" onClick={this.handleClickLogout}>LOGOUT</button>
                </div>
                <div className="signup">
                    <input placeholder="name" onChange={this.onChangeName} id="name" type="text" /><br/>
                    <input placeholder="email" onChange={this.onChangeEmail} id="email" type="text" /><br/>
                    <input placeholder="Password" onChange={this.onChangePassword} id="signupPass" type="password"/><br/>
                    <hr/>
                    <button className="button" onClick={this.handleClickSignup}>SIGNUP</button>
                </div>
                <div className="logout">
                </div>
                <div className="commentBox">
                    <p>COMMENTS</p>
                    <span> Msg: </span><input onChange={this.onChangeComment} id="msg"/>
                    <hr/>
                    <button className="button" onClick={this.handleSubmitComment}> SUBMIT </button>
                    <button className="button" onClick={this.showComments}> SHOW COMMENTS </button>
                    <div>{comments}</div>
                </div>
            </div>
        )
    }
}



