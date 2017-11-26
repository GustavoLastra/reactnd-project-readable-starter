import React, { Component } from 'react';
import {connect} from 'react-redux';
import {asyncGetCategories,asyncGetPosts} from '../actions'
import classNames from 'classnames';
import Post from './Post';
import '../App.css';
import { Link } from 'react-router-dom'

class ListCategories extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { getCategories } =  this.props;
      getCategories();
  }

  render() {
    const { categories} =  this.props;
    return (
      <div>
        {categories.map(category =>
          <li key={category.name}><a id={category.name}  className="menu-item" href="/awesome">{category.name}</a></li>
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

const ConnectedListCategories =  connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCategories);

export default ConnectedListCategories
