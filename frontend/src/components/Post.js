import React, { Component } from 'react';
//import {asyncGetCategories, asyncGetPosts, asyncPostVote, asyncEditPost,asyncDeletePost} from '../actions'
import {asyncGetPosts,asyncGetCategoryPosts,asyncPostVote,asyncPostVoteCategory,asyncPostDownVoteCategory,asyncSortPosts,asyncAddPost,asyncEditPost,asyncDeletePost,asyncPostDownVote} from '../actions/posts';
import {asyncGetComments,asyncAddComment,asyncDeleteComment,asyncEditComment} from '../actions/comments';
import {asyncGetCategories} from '../actions/categories';
import {connect} from 'react-redux';
import ListComments from './ListComments';
import { Badge, Jumbotron, Container, Button,  Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import PostFormEdit from './PostFormEdit';
import CommentFormAdd from './CommentFormAdd';
import '../App.css';
import { Link } from 'react-router-dom'
import taco from '../Taco.png';
import { Route } from 'react-router-dom' //imported the React Router
import { withRouter } from 'react-router'

class Post extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      modalComments: false,
      //modalDetails: false,
      modalEditPost: false,
      modalAddComment: false
    };
    this.toggleModalComments = this.toggleModalComments.bind(this);
    this.goToDetails = this.goToDetails.bind(this);
    this.toggleModalEditPost = this.toggleModalEditPost.bind(this);
    this.toggleModalAddComment = this.toggleModalAddComment.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.onReady = this.onReady.bind(this);
    this.voteUp = this.voteUp.bind(this);
    this.voteDown = this.voteDown.bind(this);

  }

  toggleModalComments() {
    this.setState({
      modalComments: !this.state.modalComments
    });
  }

  goToDetails() {
    const {post,history} =  this.props;
    const path= '/' + post.category+ '/'+post.id;
    console.log("pathhhhhhhhhhhhhhhhhhhhhhhhhh :" + path);
    history.push(path);
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

  onReady() {
    const {post} =  this.props;
    post.commentCount+=1;
    this.toggleModalAddComment();
  }

  voteUp(){
    console.log("vote UUUPPPP");
    const {post, postVote,postVoteCategory} =  this.props;
    const { match, location, history } = this.props;
    var currentcategory = location.pathname.substr(1);
    console.log("currentcategory + post.id :"+currentcategory+" post.id: "+post.id );
    if(currentcategory){
      console.log("trueeeeee1111");
      postVoteCategory(post.id,currentcategory);
    }else {
      postVote()
    }
  }

  voteDown(){
    const {post, postDownVote,postDownVoteCategory} =  this.props;
    const { match, location, history } = this.props;
    var currentcategory = location.pathname.substr(1);
    if(currentcategory){
      postDownVoteCategory(post.id,currentcategory);
    }else {
      postDownVote()
    }

  }


  render() {
    const {post, postVote,postDownVote} =  this.props;
    let target  = post.author + "hola";
    return (

      <Jumbotron >
        <Container fluid>
        <h1><div className="buttonlistright"><img src={taco} className="App-logodos" alt="logo" /><Badge   color="secondary">{post.voteScore}</Badge></div></h1>
        <h1 className="display-5">"{post.title}"</h1>
          <p className="lead">
            {post.body}
          </p>
          -{post.author}
          <p className="buttonlist">
            <Button color="success" onClick={this.voteUp}>+</Button>
            <Button color="danger" onClick={this.voteDown}>-</Button>
            <Button color="primary" onClick={this.toggleModalComments}>Comments<span className="comment">{post.commentCount}</span></Button>
            <Button color="info" onClick={this.goToDetails} >Details</Button>
            <Button color="warning" onClick={this.toggleModalEditPost}>Edit</Button>
            <Button color="danger" onClick={this.deletePost}>Delete</Button>

            <Modal isOpen={this.state.modalComments} toggle={this.toggleModalComments} className={this.props.className}>
              <ModalHeader toggle={this.toggleModalComments}>Comments</ModalHeader>
              <ModalBody>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <hr className="my-2" />
                <ListComments
                post={post}
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
                onReady={this.onReady}
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
    postVote:asyncPostVote(dispatch)(post.id),
    postVoteCategory: (postId,category) => asyncPostVoteCategory(dispatch)(postId,category),
    postDownVoteCategory: (postId,category) => asyncPostDownVoteCategory(dispatch)(postId,category),
    postDownVote: asyncPostDownVote(dispatch)(post.id),
    deletePost:(postId)=>asyncDeletePost(dispatch)(postId)
  }
}


const PostRouter = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Post));

export default PostRouter
