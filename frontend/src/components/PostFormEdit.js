import React, { Component } from 'react';
import {asyncGetCategories, asyncGetPosts, asyncPostVote, asyncAddPost, asyncEditPost} from '../actions'
import {connect} from 'react-redux';
import ConnectedListComments from './ListComments';
import { Jumbotron, Container, Button,  Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../App.css';
import { Link } from 'react-router-dom'
import uuidv4 from 'uuid/v4'

class PostFormAdd extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: "",
      body: "",
    };

    this.onSubmitPost = this.onSubmitPost.bind(this);
  }


  onSubmitPost = (event) => {
    let time= new Date();
    let watch= time.toString();

    const newPost = {
      ...this.state,
      timestamp: watch,
      id: this.props.post.id,
      category: this.props.post.category,
      author: this.props.post.author
    }

    console.log("time: " + time);
    console.log("Watch: " + watch);
    console.log("id" + this.props.post.id);
    console.log(JSON.stringify(newPost, null, 4));
    this.props.editPost(newPost);
    this.props.onReady();
  }

  handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const {post} = this.props;
      console.log("here JSON form state this.state:" + JSON.stringify(this.state, null, 4));
      const { title, body, author, category } = this.state;
      const isEnabled =title.length > 0 && body.length > 0;
    return (

  <Form>

    <FormGroup>
      <Label for="name">Edit the title of your post</Label>
      <Input type="text" name="title" id="title" value={this.state.title} placeholder={post.title}
      onChange={ e => this.handleInputChange(e) } />
    </FormGroup>
    <FormGroup>
      <Label for="exampleText">Edit the content of your post</Label>
      <Input type="textarea" name="body" id="exampleText" value={this.state.body} placeholder={post.body}
      onChange={ e => this.handleInputChange(e) }/>
    </FormGroup>
    <Button disabled={!isEnabled} onClick={this.onSubmitPost}>Submit</Button>
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
    editPost:(post) => asyncEditPost(dispatch)(post)
    //postVote: asyncPostVote(dispatch)(post.id, "upVote")
    //postVote:asyncPostVote(dispatch)(post.id),
    //postVote: (postId) => dispatch(asyncPostVote(postId, "upVote")),
  }
}

 export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFormAdd);
