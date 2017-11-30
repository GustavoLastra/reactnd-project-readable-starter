import React, { Component } from 'react';
import {connect} from 'react-redux';
import {asyncGetCategories,asyncGetPosts} from '../actions'
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
  }


  render() {
    const {categories} =  this.props;
    return (
      <div className="App">

        <Menu
          id={ "sidebar" }
          className={ "my-menu" }
          isOpen={this.state.open}
        >
          <ul className="menu-list">
            <li key="sortBy" className="menu-segment">Sort by</li>
            <li key="hot"><a id="hot" className="menu-item" href="/">HOT</a></li>
            <li key="fresh"><a id="fresh" className="menu-item" href="/about">FRESH</a></li>
            <li key="categories" className="menu-segment">Categories</li>
              <ListCategories/>
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
  }
}

const ConnectedApp =  connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export default ConnectedApp
