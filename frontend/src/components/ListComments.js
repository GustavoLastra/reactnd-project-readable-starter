import React, { Component } from 'react';
import {asyncGetComments} from '../actions'
import {connect} from 'react-redux';
import Comment from './Comment';
import { ListGroup, ListGroupItem } from 'reactstrap';


import '../App.css';

class ListComments extends Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    const { postId, getComments } =  this.props;
    getComments(postId);
  }

  render() {
    const {comments, postId} =  this.props;
    return (
      <ListGroup>
      {comments.map(comment => (
        <Comment key={comment.id}
        comment={comment}
        />
      ))}
      </ListGroup>
    );
  }
}
function mapStateToProps(state){
  return{
    comments: state.comments,
    //categoriesIds: state.categoriesIds
  }
}

function mapDispatchToProps(dispatch){
  return{
    getComments: asyncGetComments(dispatch),
  }
}

const ConnectedListComments =  connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComments);


export default ConnectedListComments
