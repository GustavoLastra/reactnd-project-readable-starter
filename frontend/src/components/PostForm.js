import React, { Component } from 'react';
import {asyncGetCategories, asyncGetPosts, asyncPostVote} from '../actions'
import {connect} from 'react-redux';
import ConnectedListComments from './ListComments';
import { Jumbotron, Container, Button,  Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import '../App.css';
import { Link } from 'react-router-dom'

class PostForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  render() {

    let newPost = {
      "id": false,
      "timestamp": false,
      "title": false,
      "body": false,
      "author": false,
      "category": false,
      "voteScore": false,
      "deleted": false
    }

    return (
      <Form>
    <FormGroup>
      <Label for="name">Name</Label>
      <Input type="text" name="text" id="name" />
    </FormGroup>
    <FormGroup>
      <Label for="exampleText">What are you thinking</Label>
      <Input type="textarea" name="text" id="exampleText" />
    </FormGroup>
    <FormGroup>
      <Label for="exampleText">Date</Label>
      <Input type="date" name="text" id="exampleText" />
    </FormGroup>
    <FormGroup tag="fieldset">
      <legend>Choose a category</legend>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="radio1" />{' '}
          Awesome
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="radio1" />{' '}
          Funny
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="radio1" />{' '}
          Technology
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="radio1" />{' '}
          Food
        </Label>
      </FormGroup>
    </FormGroup>
    <Button>Submit</Button>
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

function mapDispatchToProps(dispatch, OwnProps){
  const {post} =  OwnProps;
  console.log("mapDispatchToProps post:" + post);
  return{
    getCategories: asyncGetCategories(dispatch),
    getPosts: asyncGetPosts(dispatch),
    //postVote: asyncPostVote(dispatch)(post.id, "upVote")
    //postVote:asyncPostVote(dispatch)(post.id),
    //postVote: (postId) => dispatch(asyncPostVote(postId, "upVote")),
  }
}

 export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);
