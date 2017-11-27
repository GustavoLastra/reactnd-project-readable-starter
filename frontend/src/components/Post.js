import React, { Component } from 'react';
import {asyncGetCategories, asyncGetPosts, asyncPostVote} from '../actions'
import {connect} from 'react-redux';
import ConnectedListComments from './ListComments';
import { Jumbotron, Container, Button,  Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import '../App.css';
import { Link } from 'react-router-dom'

class Post extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      modal: false,
      popover: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  togglePopup() {
    this.setState({
      popover: !this.state.popover
    });
  }

  /*postVote(postId) {
    this.props.postVote(postId,'upVote' )
  }*/

  render() {
    const {post, postVote} =  this.props;
    return (
      <Jumbotron >
        <Container fluid>
          <h1 className="display-5">"{post.title}"</h1>
          <p className="lead">
            {post.body}
          </p>
          -{post.author}
          <p className="buttonlist">
            <Button color="success" onClick={postVote}>Tacos<span className="votes">{post.voteScore}</span></Button>
            <Button color="primary" onClick={this.toggleModal}>Comment</Button>
            <Button id="PopoverDetails" color="info" onClick={this.togglePopup}>Details</Button>
            <Popover placement="top" isOpen={this.state.popover} target="PopoverDetails" toggle={this.togglePopup}>
              <PopoverHeader>Details</PopoverHeader>
              <PopoverBody>
                <p>Author: {post.author}</p>
                <p>Timestamp: {post.timestamp}</p>
                <p>Category: {post.category}</p>
              </PopoverBody>
            </Popover>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>{post.title}</ModalHeader>
              <ModalBody>
                {"<Posts body>: " + post.body}
                <hr className="my-2" />
                <ConnectedListComments
                postId={post.id}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggleModal}>Do Something</Button>
                <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </p>
        </Container>
      </Jumbotron>
    );
  }
}

function mapStateToProps(state){
  return {
    categories: state.categories,
    posts: state.posts,
    //categoriesIds: state.categoriesIds
  }
}

function mapDispatchToProps(dispatch, OwnProps){
  const {post} =  OwnProps;
  console.log("mapDispatchToProps post:" + post);
  return{
    getCategories: asyncGetCategories(dispatch),
    getPosts: asyncGetPosts(dispatch),
    //postVote: asyncPostVote(dispatch)(post.id, "upVote")
    postVote:asyncPostVote(dispatch)(post.id, 'upVote'),
    //postVote: (postId) => dispatch(asyncPostVote(postId, "upVote")),
  }
}

const ConnectedPost =  connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);

export default ConnectedPost
