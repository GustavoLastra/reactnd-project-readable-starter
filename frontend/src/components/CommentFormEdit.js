import React, { Component } from 'react';
import {asyncGetCategories, asyncGetPosts, asyncPostVote, asyncAddPost, asyncEditPost, asyncEditComment} from '../actions'
import {connect} from 'react-redux';
import ConnectedListComments from './ListComments';
import { Jumbotron, Container, Button,  Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../App.css';
import { Link } from 'react-router-dom'
import uuidv4 from 'uuid/v4'

class CommentFormEdit extends Component {
  constructor (props) {
    super(props);
    this.state = {
      body: "",
    };
    this.onSubmitComment = this.onSubmitComment.bind(this);
  }

  onSubmitComment = (event) => {
    let commentId= this.props.comment.id
    let time= new Date();
    let watch= time.toString();
    const comment = {
      ...this.state,
      id: commentId,
      timestamp: watch,
      parentId: this.props.comment.parentId,
      author: this.props.comment.author
    }
    console.log("parentId: " + this.props.comment.parentId);
    console.log("time: " + time);
    console.log("Watch: " + watch);
    console.log("CommentFormEdiiiiiiiiit"+ JSON.stringify(comment, null, 4));
    this.props.editComment(comment);
    this.props.onReady();
  }
  handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const {post} = this.props;
      console.log("here JSON form state this.state:" + JSON.stringify(this.state, null, 4));
      const {  body} = this.state;
      const isEnabled = body.length > 0;

    return (

      <Form>
        <FormGroup>
          <Label for="exampleText">Comment something cool! :D</Label>
          <Input type="textarea" name="body" id="exampleText" value={this.state.body} placeholder={this.props.comment.body}
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
    //categoriesIds: state.categoriesIds
  }
}

function mapDispatchToProps(dispatch){

  return{
    getCategories: asyncGetCategories(dispatch),
    getPosts: asyncGetPosts(dispatch),
    addPost: (post) => asyncAddPost(dispatch)(post),
    editPost:(post) => asyncEditPost(dispatch)(post),
    editComment: (comment) => asyncEditComment(dispatch)(comment)
    //postVote: asyncPostVote(dispatch)(post.id, "upVote")
    //postVote:asyncPostVote(dispatch)(post.id),
    //postVote: (postId) => dispatch(asyncPostVote(postId, "upVote")),
  }
}

 export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentFormEdit);
