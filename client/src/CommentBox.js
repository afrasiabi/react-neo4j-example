import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import React from 'react';
import axios from 'axios';
import css from './CommentBox.styl';
import Comment from './Comment';

export default class CommentBox extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      loadedComments: []
    }
    this.onChangeComment = this.onChangeComment.bind(this);
    this.handleSubmitComment = this.handleSubmitComment.bind(this);
    this.showComments = this.showComments.bind(this);
  }
  
  render() {
    const comments = this.state.loadedComments.map(function(comment){
      return(
        <Comment key={comment.id} text={comment.text} username={comment.username}/>
      )
    });
    
    return(
      <Paper className={css.commentBox}>
        <p>COMMENTS</p>
        <TextField hintText="write your comment" multiLine={true} rows={1} rowsMax={4} onChange={this.onChangeComment} id="msg"/>
        <RaisedButton label= "SUBMIT" primary={true} className={css.RaisedButton} onClick={this.handleSubmitComment} />
        <Paper>{comments}</Paper>
      </Paper>
    );
  }

  componentDidMount(){
    this.showComments();
  }

  onChangeComment(e){
    this.setState({comment: e.target.value})
    console.log(this.state.comment);
  }
  
  handleSubmitComment() {
    const comment = this.state.comment;
    const username = this.state.authName;
    const self = this;

  // az push e array nemituni estefade koni chon mutable e!
  // pas bayad hatman az concat ezafe koni
  // concat yani be array ghabli (this.state.showComments) yek array digar (yek array yeduneE: [comment]) bechasban
  // natije ra set state kon

    axios.post(SERVER_ADDRESS + '/submitComment', {comment, username, token: sessionStorage.getItem("token")})
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
    axios.post(SERVER_ADDRESS + '/getComments', {authName, token: sessionStorage.getItem("token")})
    .then(function(res){
      const comment = res.data;
      self.setState({loadedComments: comment});
    })
    .catch(function (err) {
      console.log(err);
    })
  }
}