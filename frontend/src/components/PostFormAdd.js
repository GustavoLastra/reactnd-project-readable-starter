import React, { Component } from 'react';
import {asyncGetCategories, asyncGetPosts, asyncPostVote, asyncAddPost} from '../actions'
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
      author: "",
      category: "",
    };
    this.selectCategoryAwesome = this.selectCategoryAwesome.bind(this);
    this.selectCategoryFunny = this.selectCategoryFunny.bind(this);
    this.selectCategoryTechnology = this.selectCategoryTechnology.bind(this);
    this.selectCategoryFood = this.selectCategoryFood.bind(this);
    this.onSubmitPost = this.onSubmitPost.bind(this);
  }

  selectCategoryAwesome = (  ) => {
    console.log("in selectCategory Awesome");
    this.setState({
      category: "awesome"
    });
  }
  selectCategoryFunny = (  ) => {
    console.log("in selectCategory Funny");
    this.setState({
      category: "funny"
    });
  }
  selectCategoryTechnology = (  ) => {
    console.log("in selectCategory Technology");
    this.setState({
      category: "technology"
    });
  }
  selectCategoryFood = (  ) => {
    console.log("in selectCategory Food");
    this.setState({
      category: "food"
    });
  }

  onSubmitPost = (event) => {
    let postId= uuidv4();//Math.random().toString(36).substr(2, 22);
    let time= new Date();
    let watch= time.toString();


    const post = {
      ...this.state,
      id: postId,
      timestamp: watch
    }
    console.log("postId: " + postId);
    console.log("time: " + time);
    console.log("Watch: " + watch);
    console.log(JSON.stringify(post, null, 4));
    this.props.addPost(post);
  }

  handleInputChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
      console.log("here JSON form state this.state:" + JSON.stringify(this.state, null, 4));
    return (

  <Form>
    <FormGroup>
      <Label for="name">Who are you?</Label>
      <Input type="text" name="author" id="name" value={this.state.author}
      onChange={ e => this.handleInputChange(e) } />
    </FormGroup>
    <FormGroup>
      <Label for="name">Give a title to your post</Label>
      <Input type="text" name="title" id="title" value={this.state.title}
      onChange={ e => this.handleInputChange(e) } />
    </FormGroup>
    <FormGroup>
      <Label for="exampleText">What ist your post about?</Label>
      <Input type="textarea" name="body" id="exampleText" value={this.state.body}
      onChange={ e => this.handleInputChange(e) }/>
    </FormGroup>
    <FormGroup tag="fieldset">
      <legend>Choose a category</legend>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="category" value={this.state.category}
          onClick={this.selectCategoryAwesome} />
          Awesome
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="category" value={this.state.category}
          onClick={ this.selectCategoryFunny }/>
          Funny
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="category" value={this.state.category}
          onClick={ this.selectCategoryTechnology } />
          Technology
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Input type="radio" name="category" value={this.state.category}
          onClick={ this.selectCategoryFood } />
          Food
        </Label>
      </FormGroup>
    </FormGroup>
    <Button onClick={this.onSubmitPost}>Submit</Button>
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
    addPost: (post) => asyncAddPost(dispatch)(post)
    //postVote: asyncPostVote(dispatch)(post.id, "upVote")
    //postVote:asyncPostVote(dispatch)(post.id),
    //postVote: (postId) => dispatch(asyncPostVote(postId, "upVote")),
  }
}

 export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFormAdd);
