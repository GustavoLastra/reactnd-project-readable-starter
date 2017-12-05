import React, { Component } from 'react';
//import {asyncGetCategories, asyncGetPosts, asyncPostVote, asyncEditPost,asyncDeletePost} from '../actions'
import {asyncGetPosts,asyncGetCategoryPosts,asyncPostVote,asyncSortPosts,asyncAddPost,asyncEditPost,asyncDeletePost} from '../actions/posts';
import {asyncGetComments,asyncAddComment,asyncDeleteComment,asyncEditComment} from '../actions/comments';
import {asyncGetCategories} from '../actions/categories';
import {connect} from 'react-redux';
import ListComments from './ListComments';
import { Jumbotron, Container, Button,  Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import PostFormEdit from './PostFormEdit';
import CommentFormAdd from './CommentFormAdd';
import '../App.css';
import { Link } from 'react-router-dom'

class Post extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      modalComments: false,
      modalDetails: false,
      modalEditPost: false,
      modalAddComment: false
    };
    this.toggleModalComments = this.toggleModalComments.bind(this);
    this.toggleModalDetails = this.toggleModalDetails.bind(this);
    this.toggleModalEditPost = this.toggleModalEditPost.bind(this);
    this.toggleModalAddComment = this.toggleModalAddComment.bind(this);
    this.deletePost = this.deletePost.bind(this);

  }

  toggleModalComments() {
    this.setState({
      modalComments: !this.state.modalComments
    });
  }

  toggleModalDetails() {
    this.setState({
      modalDetails: !this.state.modalDetails
    });
  }
  toggleModalEditPost() {
    this.setState({
      modalEditPost: !this.state.modalEditPost
    });
  }
  toggleModalAddComment= ()=> {
    this.setState({
      modalAddComment : !this.state.modalAddComment
    });
  }

  deletePost() {
    const {post} =  this.props;
    this.props.deletePost(post.id);
  }

  render() {
    const {post, postVote} =  this.props;
    let target  = post.author + "hola";
    return (

      <Jumbotron >
        <Container fluid>
          <h1 className="display-5">"{post.title}"</h1>
          <p className="lead">
            {post.body}
          </p>
          -{post.author}
          <p className="buttonlist">
            <Button color="success" onClick={postVote}>Tacos<span className="votes">{post.voteScore}</span></Button>
            <Button color="primary" onClick={this.toggleModalComments}>Comments</Button>
            <Button id={target} color="info" onClick={this.toggleModalDetails}>Details</Button>
            <Button color="warning" onClick={this.toggleModalEditPost}>Edit</Button>
            <Button color="danger" onClick={this.deletePost}>Delete</Button>

            <Modal isOpen={this.state.modalComments} toggle={this.toggleModalComments} className={this.props.className}>
              <ModalHeader toggle={this.toggleModalComments}>Comments</ModalHeader>
              <ModalBody>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <hr className="my-2" />
                <ListComments
                postId={post.id}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggleModalAddComment}>Add comment</Button>
                <Button color="secondary" onClick={this.toggleModalComments}>Cancel</Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modalAddComment} toggle={this.toggleModalAddComment} className={this.props.className}>
              <ModalHeader toggle={this.toggleModalAddComment}>Add a Comment!</ModalHeader>
              <ModalBody>

                <CommentFormAdd
                postId={post.id}
                onReady={this.toggleModalAddComment}
                />

              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggleModalAddComment}>Cancel</Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modalDetails} toggle={this.toggleModalDetails} className={this.props.className}>
              <ModalHeader toggle={this.toggleModalDetails}>Details</ModalHeader>
              <ModalBody>
                <p>Author: {post.author}</p>
                <p>Date: {post.timestamp}</p>
                <p>Category: {post.category}</p>
                <p>ID: {post.id}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggleModalDetails}>Close</Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modalEditPost} toggle={this.toggleModalEditPost} className={this.props.className}>
              <ModalHeader toggle={this.toggleModalEditPost}>Edit the post!</ModalHeader>
              <ModalBody>

                <PostFormEdit
                  post={post}
                  onReady={this.toggleModalEditPost}
                />

              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.toggleModalEditPost}>Close</Button>
              </ModalFooter>
            </Modal>
          </p>
        </Container>
      </Jumbotron>
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
  const {post} =  OwnProps;
  console.log("mapDispatchToProps post:" + post);
  return{
    getCategories: asyncGetCategories(dispatch),
    getPosts: asyncGetPosts(dispatch),
    //postVote: asyncPostVote(dispatch)(post.id, "upVote")
    postVote:asyncPostVote(dispatch)(post.id),
    deletePost:(postId)=>asyncDeletePost(dispatch)(postId)
    //postVote: (postId) => dispatch(asyncPostVote(postId, "upVote")),
  }
}

 export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
