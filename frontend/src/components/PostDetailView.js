import React, { Component } from 'react';
import {connect} from 'react-redux';
import FormSerialize from 'form-serialize';
import {asyncGetPosts,asyncGetCategoryPosts,asyncSortPosts,asyncAddPost,asyncEditPost,asyncDeletePost} from '../actions/posts';
import {asyncGetComments,asyncAddComment,asyncDeleteComment,asyncEditComment} from '../actions/comments';
import {asyncGetCategories} from '../actions/categories';
import {asyncGetPost,asyncPostVote,asyncPostDownVote} from '../actions/post';
import taco from '../Taco.png';
import { slide as Menu } from 'react-burger-menu'
import classNames from 'classnames';
import { Badge, Button, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import '../App.css';
import ListPosts from './ListPosts';
import PostFormAdd from './PostFormAdd';
import uuidv4 from 'uuid/v4'
import { Route } from 'react-router-dom' //imported the React Router
import ListCategories from './ListCategories';
import {withRouter} from 'react-router-dom';
import { Link } from 'react-router-dom'
import ListComments from './ListComments';
import CommentFormAdd from './CommentFormAdd';
import PostFormEdit from './PostFormEdit';
import FlatButton from 'material-ui/FlatButton';

class PostDetailView extends Component {
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
    this.toggleModalEditPost = this.toggleModalEditPost.bind(this);
    this.toggleModalAddComment = this.toggleModalAddComment.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.onReady = this.onReady.bind(this);
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);

  }

  toggleModalComments() {
    this.setState({
      modalComments: !this.state.modalComments
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
    const {post,history} =  this.props;
    this.props.deletePost(post.id);
    history.push("/");
  }

  onReady() {
    const {post} =  this.props;
    post.commentCount+=1;
    this.toggleModalAddComment();
  }

  upVote() {
    const {post,postVote} =  this.props;
    postVote(post.id);
  }

  downVote() {
    const {post,postDownVote} =  this.props;
    postDownVote(post.id);
  }



  componentDidMount() {
    const { getCategories,getPost } =  this.props;
    var currentLocation = this.props.match.params.postId;
    console.log("this.props.match.params.postId: "+ this.props.match.params.postId);
      getPost(currentLocation);
  }

  render() {
    console.log("renderPostDetail");
    const {post, postVote,postDownVote} =  this.props;
    return (
      <div className="">
      {post.id?(
        <div>
        <h1>Post Details!</h1>
        <Jumbotron >
          <Container fluid>
          <h1><div className="buttonlistright"><img src={taco} className="App-logodos" alt="logo" /><Badge   color="secondary">{post.voteScore}</Badge></div></h1>
            <h2 className="display-5">"{post.title}"</h2>
            <p className="lead">
              {post.body}
            </p>
            <hr className="my-2" />
            <p>Author: {post.author}</p>
            <p>Date: {post.timestamp}</p>
            <p>Category: {post.category}</p>
            <p>ID: {post.id}</p>
            <p className="buttonlist">
            <Button color="success" onClick={this.upVote}>+</Button>
            <Button color="danger" onClick={this.downVote}>-</Button>
            <Button color="primary" onClick={this.toggleModalComments}>Comments<span className="comment">{post.commentCount}</span></Button>
            <Button color="warning" onClick={this.toggleModalEditPost}>Edit</Button>
            <Button color="danger" onClick={this.deletePost}>Delete</Button>
            </p>
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
          </Container>
        </Jumbotron>
      </div>

      ):(

        <div>
          <h3>404 page not found</h3>
          <p>We are sorry but the page you are looking for does not exist.</p>
        </div>
      )}


      </div>
    );
  }
}
function mapStateToProps(state){
  return{
    categories: state.categories,
    posts: state.posts,
    post: state.post,
  }
}

function mapDispatchToProps(dispatch){
  return{

    getCategories: asyncGetCategories(dispatch),
    getPosts: asyncGetPosts(dispatch),
    getCategoryPosts: (categoryName)=> asyncGetCategoryPosts(dispatch)(categoryName),
    asyncSortPosts: (sortState)=>asyncSortPosts(dispatch)(sortState),
    postVote:(postId)=> dispatch(asyncPostVote(postId)),
    postDownVote: (postId)=> dispatch(asyncPostDownVote(postId)),
    //asyncGetPost: (postid) =>asyncGetPost(dispatch)(postid),
    getPost: (postId) => dispatch(asyncGetPost(postId)),
    deletePost:(postId)=>asyncDeletePost(dispatch)(postId)
  }
}

const PostDetailViewRouter = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailView));

export default PostDetailViewRouter
