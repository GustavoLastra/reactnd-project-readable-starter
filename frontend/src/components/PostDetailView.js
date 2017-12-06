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
import uuidv4 from 'uuid/v4'
import { Route } from 'react-router-dom' //imported the React Router

import ListCategories from './ListCategories';

import { Link } from 'react-router-dom'

class PostDetailView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
    };

  }

  render() {
    console.log("renderPostDetail");
    return (
      <div>
      <h1>Post Detail</h1>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailView);
