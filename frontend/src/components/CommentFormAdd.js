import React, { Component } from 'react';
import {asyncGetPosts,asyncGetCategoryPosts,asyncPostVote,asyncSortPosts,asyncAddPost,asyncEditPost,asyncDeletePost} from '../actions/posts';
import {asyncGetComments,asyncAddComment,asyncDeleteComment,asyncEditComment} from '../actions/comments';
import {asyncGetCategories} from '../actions/categories';
import {connect} from 'react-redux';
import ConnectedListComments from './ListComments';
import { Jumbotron, Container, Button,  Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../App.css';
import { Link } from 'react-router-dom'
import uuidv4 from 'uuid/v4'

class CommentFormAdd extends Component {
  constructor (props) {
    super(props);
    this.state = {
      body: "",
      author: ""
    };
    this.onSubmitComment = this.onSubmitComment.bind(this);
  }

  onSubmitComment = (event) => {
    let commentId= uuidv4();
    let time= new Date();
    let watch= time.toString();
    const comment = {
      ...this.state,
      id: commentId,
      timestamp: watch,
      parentId: this.props.postId
    }
    console.log("parentId: " + this.props.postId);
    console.log("time: " + time);
    console.log("Watch: " + watch);
    console.log(JSON.stringify(comment, null, 4));
    this.props.addComment(comment);
    this.props.onReady();
  }

  handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
      console.log("here JSON form state this.state:" + JSON.stringify(this.state, null, 4));
      const {  body, author } = this.state;
      const isEnabled = body.length > 0 && author.length > 0 ;

    return (

  <Form>
    <FormGroup>
      <Label for="name">Who are you?</Label>
      <Input type="text" name="author" id="name" value={this.state.author}
      onChange={ e => this.handleInputChange(e) } />
    </FormGroup>
    <FormGroup>
      <Label for="exampleText">Comment something cool! :D</Label>
      <Input type="textarea" name="body" id="exampleText" value={this.state.body}
      onChange={ e => this.handleInputChange(e) }/>
    </FormGroup>
    <Button disabled={!isEnabled} onClick={this.onSubmitComment}>Submit</Button>
  </Form>
    );
  }
}

function mapStateToProps(state){
  return {
    categories: state.categories,
    posts: state.posts,
  }
}

function mapDispatchToProps(dispatch){

  return{
    getCategories: asyncGetCategories(dispatch),
    getPosts: asyncGetPosts(dispatch),
    addPost: (post) => asyncAddPost(dispatch)(post),
    addComment: (comment) => asyncAddComment(dispatch)(comment)
    //postVote: asyncPostVote(dispatch)(post.id, "upVote")
    //postVote:asyncPostVote(dispatch)(post.id),
    //postVote: (postId) => dispatch(asyncPostVote(postId, "upVote")),
  }
}

 export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentFormAdd);
