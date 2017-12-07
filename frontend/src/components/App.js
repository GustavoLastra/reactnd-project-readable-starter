import React, { Component } from 'react';
import {connect} from 'react-redux';
import FormSerialize from 'form-serialize';
import {asyncGetPosts,asyncGetCategoryPosts,asyncPostVote,asyncSortPosts,asyncAddPost,asyncEditPost,asyncDeletePost,asyncSortPostsCategory} from '../actions/posts';
import {asyncGetComments,asyncAddComment,asyncDeleteComment,asyncEditComment} from '../actions/comments';
import {asyncGetCategories} from '../actions/categories';
import taco from '../Taco.png';
import { slide as Menu } from 'react-burger-menu'
import classNames from 'classnames';
import { Button, Jumbotron, Container, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import '../App.css';
import ListPosts from './ListPosts';
import PostFormAdd from './PostFormAdd';
import PostCategoryView from './PostCategoryView';
import uuidv4 from 'uuid/v4'
import { Route } from 'react-router-dom' //imported the React Router
import ListCategories from './ListCategories';
import PostsView from './PostsView'
import PostDetailView from './PostDetailView'
import {withRouter} from 'react-router-dom';



import { Link } from 'react-router-dom'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      modal: false,
      modalForm:false
    };
    this.sortPostsHot = this.sortPostsHot.bind(this);
    this.sortPostsFresh = this.sortPostsFresh.bind(this);
    this.toggleModalForm = this.toggleModalForm.bind(this);
  }

  sortPostsHot() {
    const { match, location, history } = this.props;
    var currentcategory =  location.pathname.substr(1);//match.params.category;
    console.log("function sortPostsHot currentcategory:" + currentcategory);
    if(currentcategory ){
      console.log("true !!!!!!!!!!!");
      this.props.asyncSortPostsCategory("hot",currentcategory);
    } else {
      this.props.asyncSortPosts("hot");
    }

  }

  sortPostsFresh() {
    console.log("function sortPosts this.state.sortState:" +this.state.sortState);
    const { match, location, history } = this.props;
    var currentcategory = location.pathname.substr(1);
    if(currentcategory){
      console.log("true !!!!!!!!!!!");
      this.props.asyncSortPostsCategory("fresh",currentcategory);
    } else {
      this.props.asyncSortPosts("fresh");
    }
  }

  toggleModalForm() {
    this.setState({
      modalForm: !this.state.modalForm
    });
  }

  render() {
    const {categories, getPosts, category} =  this.props;

    /*<Route exact path='/technology' render={() => (
      <PostCategoryView
      />
    )}/>
    <Route exact path='/food' render={() => (
      <PostCategoryView
      />
    )}/>
    <Route exact path='/Awesome' render={() => (
      <PostCategoryView
      />
    )}/> */
    return (
      <div className="App">

        <Menu
          id={ "sidebar" }
          className={ "my-menu" }
          isOpen={this.state.open}
        >
          <ul className="menu-list">
            <li><Link to='/' key="home"><h5>HOME</h5></Link></li>
            <li key="sortBy" className="menu-segment" >Sort by</li>
            <li key="hot"><a id="hot" className="menu-item" onClick={this.sortPostsHot}>HOT</a></li>
            <li key="fresh"><a id="fresh" className="menu-item" onClick={this.sortPostsFresh}>FRESH</a></li>
            <li key="categories" className="menu-segment">Categories</li>
            <ListCategories
            />
          </ul>
        </Menu>

        <header className="App-header">
          <img src={taco} className="App-logo" alt="logo" />
          <h1 className="App-title">LordTaco</h1>

        </header>

        <Route exact path='/' render={() => (
          <main>
            <PostsView
            />
          </main>
        )}/>

        <Route exact path='/:category' render={() => (
          <PostCategoryView
          />
        )}/>

        <Route exact path='/:category/:postId' render={() => (
          <PostDetailView
          />
        )}/>


        <Button className="open-search"  onClick={this.toggleModalForm}></Button>
        <Modal isOpen={this.state.modalForm} toggle={this.toggleModalForm} className={this.props.className}>
         <ModalHeader toggle={this.toggleModalForm}>Post something! :D</ModalHeader>
         <ModalBody>
            <PostFormAdd
            onReady={this.toggleModalForm}
            />
         </ModalBody>
         <ModalFooter>
           <Button color="secondary" onClick={this.toggleModalForm}>Close</Button>
         </ModalFooter>
       </Modal>
      </div>
    );
  }
}
function mapStateToProps(state){
  return{
    categories: state.categories,
    posts: state.posts,
    category: state.category
  }
}

function mapDispatchToProps(dispatch){
  return{
    getCategories: asyncGetCategories(dispatch),
    getPosts: asyncGetPosts(dispatch),
    asyncSortPosts: (sortState)=>asyncSortPosts(dispatch)(sortState),
    asyncSortPostsCategory: (sortState,category)=>asyncSortPostsCategory(dispatch)(sortState,category),
  }
}

const AppRouter = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));

export default AppRouter
