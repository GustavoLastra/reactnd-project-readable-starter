import React, { Component } from 'react';
import {connect} from 'react-redux';
import {asyncGetCategories,asyncGetPosts} from '../actions'
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
        <main className="container">
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
        <ul className="menu-list">
            {posts.map(post =>
              <li key={post.title}>
                <Post
                post={ post}
                />
              </li>
            )}
        </ul>
        </main>
        <p className="App-intro">
        </p>
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
