 import React, { Component } from 'react';
import {connect} from 'react-redux';
import {asyncGetCategories,asyncGetPosts, asyncGetCategoryPosts} from '../actions'
import taco from '../Taco.png';
import { slide as Menu } from 'react-burger-menu'
import classNames from 'classnames';
import { Jumbotron, Container, Button,  Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import '../App.css';
import ListPosts from './ListPosts';
import ListCategories from './ListCategories';

import { Link } from 'react-router-dom'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      modal: false
    };
    this.showPostsByCategory = this.showPostsByCategory.bind(this);
  }

  showPostsByCategory(categoryName) {
    const {getCategoryPosts} = this.props
      console.log("on App's showPostsByCategory function: " + categoryName);
    getCategoryPosts(categoryName);
  }


  render() {
    const {categories, getPosts} =  this.props;
    return (
      <div className="App">

        <Menu
          id={ "sidebar" }
          className={ "my-menu" }
          isOpen={this.state.open}
        >
          <ul className="menu-list">
            <li key="home"><a id="home" className="menu-item" onClick={getPosts}><h5>HOME</h5></a></li>
            <li key="sortBy" className="menu-segment">Sort by</li>
            <li key="hot"><a id="hot" className="menu-item" >HOT</a></li>
            <li key="fresh"><a id="fresh" className="menu-item">FRESH</a></li>
            <li key="categories" className="menu-segment">Categories</li>

              <ListCategories
                onCategorySelect= {this.showPostsByCategory}

              />
          </ul>
        </Menu>
        <header className="App-header">
          <img src={taco} className="App-logo" alt="logo" />
          <h1 className="App-title">LordTaco</h1>
        </header>

        <ListPosts/>

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
    getCategoryPosts: (categoryName)=> asyncGetCategoryPosts(dispatch)(categoryName),
  }
}

const ConnectedApp =  connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export default ConnectedApp
