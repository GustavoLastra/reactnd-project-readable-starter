import React, { Component } from 'react';
import '../App.css';
import { ListGroup, ListGroupItem } from 'reactstrap';

class Comment extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {comment} =  this.props;
    return (
      <ListGroupItem>
        {comment.body}
      </ListGroupItem>
    );
  }
}


export default Comment
