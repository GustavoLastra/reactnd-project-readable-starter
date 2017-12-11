import React, { Component } from 'react';
import {connect} from 'react-redux';
import FormSerialize from 'form-serialize';
import {asyncGetPosts,asyncGetCategoryPosts,asyncPostVote,asyncSortPosts,asyncAddPost,asyncEditPost,asyncDeletePost} from '../actions/posts';
import {asyncGetComments,asyncAddComment,asyncDeleteComment,asyncEditComment} from '../actions/comments';
import {asyncGetCategories} from '../actions/categories';
import {storeCategory} from '../actions/category';
import taco from '../Taco.png';
import { slide as Menu } from 'react-burger-menu'
import classNames from 'classnames';
import { Button, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import '../App.css';
import ListPosts from './ListPosts';
import PostFormAdd from './PostFormAdd';
import uuidv4 from 'uuid/v4'
import { Route } from 'react-router-dom' //imported the React Router
import {withRouter} from 'react-router-dom';

import ListCategories from './ListCategories';

import { Link } from 'react-router-dom'

class PostCategoryView extends Component {
  constructor (props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    const {getCategoryPosts, category} = this.props;
    const { match, location, history } = this.props;
    var currentLocation = location.pathname.substr(1);
    getCategoryPosts(currentLocation);
  }


  render() {
    const { match, location, history } = this.props;
    var currentLocation = match.params.category;//location.pathname.substr(1);
    console.log(" this.props.match.params.category111111111111111: "+ this.props.match.params.category)
    const {category} = this.props;
    return (
      <div>

        <div className=" App">
          <h2 className="">{currentLocation+"! "}</h2>
        </div>
        <ListPosts/>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    //categories: state.categories,
    //posts: state.posts,
    category: state.category,
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

const PostCategoryViewRouter = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostCategoryView));

export default PostCategoryViewRouter
