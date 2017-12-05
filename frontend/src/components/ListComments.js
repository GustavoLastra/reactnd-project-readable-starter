import React, { Component } from 'react';
import {asyncGetPosts,asyncGetCategoryPosts,asyncPostVote,asyncSortPosts,asyncAddPost,asyncEditPost,asyncDeletePost} from '../actions/posts';
import {asyncGetComments,asyncAddComment,asyncDeleteComment,asyncEditComment} from '../actions/comments';
import {asyncGetCategories} from '../actions/categories';
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
        postId={postId}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComments);
