import React, { Component } from 'react';
import {connect} from 'react-redux';
import {asyncGetPosts,asyncGetCategoryPosts,asyncPostVote,asyncSortPosts,asyncAddPost,asyncEditPost,asyncDeletePost} from '../actions/posts';
import {asyncGetComments,asyncAddComment,asyncDeleteComment,asyncEditComment} from '../actions/comments';
import {asyncGetCategories} from '../actions/categories';
import {storeCategory} from '../actions/category';
import classNames from 'classnames';
import Post from './Post';
import { withRouter } from 'react-router'
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
    const { onCategorySelect,history } = this.props
    console.log("on ListCategory's selectCategory function");
    const {storeCategory} = this.props;
    //getCategoryPosts(categoryName);
    storeCategory(categoryName)
    history.push('/' + categoryName);

  }

  render() {
    //onClick= {() =>this.selectCategory(category.name)}
    const { categories} =  this.props;
    return (
      <div>
        {categories.map(category =>
          <li
            onClick={() =>this.selectCategory(category.name)}
            key={category.name}>
            <div className="menu-item">{category.name}</div>
          </li>
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
    getCategoryPosts: (categoryName)=> asyncGetCategoryPosts(dispatch)(categoryName),
    storeCategory: (category) => dispatch(storeCategory(category))
  }
}

const ListCategoryRouter = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCategories));

export default ListCategoryRouter
