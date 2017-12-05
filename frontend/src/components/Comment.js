import React, { Component } from 'react';
import '../App.css';
import { Jumbotron, Container, Button,  Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {asyncGetPosts,asyncGetCategoryPosts,asyncPostVote,asyncSortPosts,asyncAddPost,asyncEditPost,asyncDeletePost} from '../actions/posts';
import {asyncGetComments,asyncAddComment,asyncDeleteComment,asyncEditComment} from '../actions/comments';
import {asyncGetCategories} from '../actions/categories';
import CommentFormEdit from './CommentFormEdit';
import {connect} from 'react-redux';

class Comment extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modalEditComment: false,
    };
    this.toggleModalEditComment = this.toggleModalEditComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  toggleModalEditComment= ()=> {
    this.setState({
      modalEditComment : !this.state.modalEditComment
    });
  }

  deleteComment() {
    this.props.deleteComment(this.props.comment)
    this.props.post.commentCount-=1;
  }

  render() {
    const {comment, post} =  this.props;
    return (
      <div>
      <ListGroupItem>
        {comment.body} -{comment.author}
        <div className="buttonlist">
          <Button color="warning" onClick={this.toggleModalEditComment}>Edit</Button>
          <Button color="danger" onClick={this.deleteComment}>Delete</Button>
        </div>
      </ListGroupItem>

      <Modal isOpen={this.state.modalEditComment} toggle={this.toggleModalEditComment} className={this.props.className}>
        <ModalHeader toggle={this.toggleModalEditComment}>Edit the post!</ModalHeader>
        <ModalBody>

          <CommentFormEdit
            comment={comment}
            onReady={this.toggleModalEditComment}
          />

        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleModalEditComment}>Close</Button>
        </ModalFooter>
      </Modal>

      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    categories: state.categories,
    posts: state.posts,
    //categoriesIds: state.categoriesIds
  }
}

function mapDispatchToProps(dispatch, OwnProps){
  //const {post} =  OwnProps;
  //const {comment} =  this.props;
  return{
    deleteComment:(comment) => asyncDeleteComment(dispatch)(comment)
  }
}

 export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
