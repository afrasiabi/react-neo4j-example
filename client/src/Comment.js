import React,{Component} from 'react'
import axios from 'axios'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
// import './header.css';

export default class Comment extends Component{

  render(){
    return(
      <div>
        <Divider inset={true} style={{ marginLeft: 0 }} />
        <ListItem
          primaryText={this.props.username}
          secondaryText={<p>{this.props.text}</p>}
          secondaryTextLines={1}
        />
      </div>
      )
  }
}
