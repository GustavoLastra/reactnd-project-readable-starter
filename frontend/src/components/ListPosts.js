import React, { Component } from 'react';
import {connect} from 'react-redux';
//import {asyncGetCategories,asyncGetPosts} from '../actions'
import {asyncGetPosts,asyncGetCategoryPosts,asyncPostVote,asyncSortPosts,asyncAddPost,asyncEditPost,asyncDeletePost} from '../actions/posts';
import {asyncGetComments,asyncAddComment,asyncDeleteComment,asyncEditComment} from '../actions/comments';
import {asyncGetCategories} from '../actions/categories';
import classNames from 'classnames';
import Post from './Post';
import '../App.css';
import { Link } from 'react-router-dom'

class ListPosts extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    const { posts } =  this.props;
      //this.props.getCategories();
      this.props.getPosts();
  }

  render() {
    const { posts} =  this.props;
    return (
      <div className="App">
        <div className="<ListPosts/>">

        <ul className="menu-list">
            {posts.map(post =>
              <li key={post.title}>
                <Post
                post={ post}
                />
              </li>
            )}
        </ul>
        </div>
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

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPosts);
