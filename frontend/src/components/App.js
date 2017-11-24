import React, { Component } from 'react';
import {connect} from 'react-redux';
import {asyncGetCategories,asyncGetPosts} from '../actions'
import taco from '../Taco.png';
import { slide as Menu } from 'react-burger-menu'
import classNames from 'classnames';
import { Button } from 'reactstrap';
import '../App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick() {
	   this.setState({
		     open: !this.state.open
	      });
  }
  showSettings (event) {
    event.preventDefault();
  }

  componentDidMount() {
    const { categories, posts } =  this.props;
    if ( Object.keys(categories).length === 0 ) {
      this.props.getCategories();
      this.props.getPosts();
    }
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
            {categories.map(category =>
              <li key={category.name}><a id={category.name}  className="menu-item" href="/awesome">{category.name}</a></li>
            )}
        </ul>
      </Menu>

        <header className="App-header">
          <img src={taco} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to LordTaco</h1>
        </header>
        <p className="App-intro">
        </p>
      </div>
    );
  }
}


/*<li><a id="funny" className="menu-item" href="/funny">FUNNY</a></li>
<li><a id="food" className="menu-item" href="/food">FOOD</a></li>
<li><a id="sports" className="menu-item" href="/sports">SCIENCE</a></li>
<li><a onClick={ this.showSettings } className="menu-item" href="">SPORTS</a></li>*/

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
)(App);
