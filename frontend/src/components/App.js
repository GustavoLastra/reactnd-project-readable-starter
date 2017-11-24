import React, { Component } from 'react';
import {connect} from 'react-redux';
import {asyncGetCategories,asyncGetPosts} from '../actions'
import taco from '../Taco.png';
import { slide as Menu } from 'react-burger-menu'
import classNames from 'classnames';
import { Jumbotron, Container, Button,  Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import '../App.css';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
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
    const {categories, posts} =  this.props;
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
          <h1 className="App-title">LordTaco</h1>
        </header>

        <main className="container">
        <ul className="menu-list">
            {posts.map(post =>
              <li key={post.title}>
                <Jumbotron >
                  <Container fluid>
                    <h1 className="display-3">{post.title}</h1>
                    <p className="lead">
                      {post.body}
                    </p>
                    <hr className="my-2" />
                    <p>Author: {post.author}</p>
                    <p className="lead">
                      <Button onClick={this.toggle} color="primary">Deteils</Button>
                      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                        <ModalBody>
                          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                      </Modal>
                    </p>
                  </Container>

                </Jumbotron>

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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
