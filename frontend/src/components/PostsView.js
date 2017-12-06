import React, { Component } from 'react';
import {connect} from 'react-redux';
import FormSerialize from 'form-serialize';
import {asyncGetPosts,asyncGetCategoryPosts,asyncPostVote,asyncSortPosts,asyncAddPost,asyncEditPost,asyncDeletePost} from '../actions/posts';
import {asyncGetComments,asyncAddComment,asyncDeleteComment,asyncEditComment} from '../actions/comments';
import {asyncGetCategories} from '../actions/categories';
import taco from '../Taco.png';
import { slide as Menu } from 'react-burger-menu'
import classNames from 'classnames';
import { Button, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import '../App.css';
import ListPosts from './ListPosts';
import PostFormAdd from './PostFormAdd';
import PostCategoryView from './PostCategoryView';
import uuidv4 from 'uuid/v4'
import { Route } from 'react-router-dom' //imported the React Router
import {withRouter} from 'react-router-dom';


import ListCategories from './ListCategories';

import { Link } from 'react-router-dom'

class PostView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      modal: false,
      modalForm:false
    };
    //this.showPostsByCategory = this.showPostsByCategory.bind(this);
    this.sortPostsHot = this.sortPostsHot.bind(this);
    this.sortPostsFresh = this.sortPostsFresh.bind(this);
    this.toggleModalForm = this.toggleModalForm.bind(this);
  }

  /*showPostsByCategory(categoryName) {   //onCategorySelect= {this.showPostsByCategory} on ListCategories
    const {getCategoryPosts} = this.props
      console.log("on App's showPostsByCategory function: " + categoryName);
    getCategoryPosts(categoryName);
  }*/

  sortPostsHot() {
    console.log("function sortPosts this.state.sortState:" +this.state.sortState);
    this.props.asyncSortPosts("hot");
  }

  sortPostsFresh() {
    console.log("function sortPosts this.state.sortState:" +this.state.sortState);
    this.props.asyncSortPosts("fresh");
  }

  toggleModalForm() {
    this.setState({
      modalForm: !this.state.modalForm
    });
  }

  render() {
    const {categories, getPosts} =  this.props;
    return (
      <div className="App">

        <ListPosts/>

        <p className="App-intro">
        </p>
        <Button className="open-search"  onClick={this.toggleModalForm}></Button>
        <Modal isOpen={this.state.modalForm} toggle={this.toggleModalForm} className={this.props.className}>
         <ModalHeader toggle={this.toggleModalForm}>Post something! :D</ModalHeader>
         <ModalBody>
            <PostFormAdd
            onReady={this.toggleModalForm}
            />
         </ModalBody>
         <ModalFooter>
           <Button color="secondary" onClick={this.toggleModalForm}>Close</Button>
         </ModalFooter>
       </Modal>
      </div>
    );
  }
}
function mapStateToProps(state){
  return{
    categories: state.categories,
    posts: state.posts,
  }
}

function mapDispatchToProps(dispatch){
  return{
    getCategories: asyncGetCategories(dispatch),
    getPosts: asyncGetPosts(dispatch),
    getCategoryPosts: (categoryName)=> asyncGetCategoryPosts(dispatch)(categoryName),
    asyncSortPosts: (sortState)=>asyncSortPosts(dispatch)(sortState)
  }
}

const PostViewRouter = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostView));

export default PostViewRouter
