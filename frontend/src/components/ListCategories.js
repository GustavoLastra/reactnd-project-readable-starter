import React, { Component } from 'react';
import {connect} from 'react-redux';
import {asyncGetPosts,asyncGetCategoryPosts,asyncPostVote,asyncSortPosts,asyncAddPost,asyncEditPost,asyncDeletePost} from '../actions/posts';
import {asyncGetComments,asyncAddComment,asyncDeleteComment,asyncEditComment} from '../actions/comments';
import {asyncGetCategories} from '../actions/categories';
import classNames from 'classnames';
import Post from './Post';
import { Jumbotron, Container, Button,  Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';

import '../App.css';
import { Link } from 'react-router-dom'

class ListCategories extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
    this.selectCategory = this.selectCategory.bind(this);

  }

  componentDidMount() {
    const { getCategories } =  this.props;
      getCategories();
  }

  selectCategory(categoryName) {
    const { onCategorySelect } = this.props
    console.log("on ListCategory's selectCategory function");
    onCategorySelect(categoryName);
  }

  render() {
    const { categories} =  this.props;
    return (
      <div>
        {categories.map(category =>
          <li onClick= {() =>this.selectCategory(category.name)} key={category.name}><a id={category.name} className="menu-item" >{category.name}</a></li>
        )}
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    categories: state.categories,
    posts: state.posts,
    //categoriesIds: state.categoriesIds
  }
}

function mapDispatchToProps(dispatch){
  return{
    getCategories: asyncGetCategories(dispatch),
    getPosts: asyncGetPosts(dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCategories);
