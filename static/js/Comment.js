import React,{Component} from 'react'
import axios from 'axios'
import './style.css';

export default class Comment extends Component{

  render(){
    return(
      <div className="cmnt">
        <span className="mige"> {this.props.username} mige: </span> {this.props.text}
      </div>
      )
  }
}
