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
      modalDetails: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalDetails = this.toggleModalDetails.bind(this);
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleModalDetails() {
    this.setState({
      modalDetails: !this.state.modalDetails
    });
  }

  /*postVote(postId) {
    this.props.postVote(postId,'upVote' )
  }*/

  render() {
    const {post, postVote} =  this.props;
    let target  = post.author + "hola";
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
            <Button color="primary" onClick={this.toggleModal}>Comments</Button>
            <Button id={target} color="info" onClick={this.toggleModalDetails}>Details</Button>

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
                <Button color="primary" onClick={this.toggleModal}>Comment</Button>
                <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modalDetails} toggle={this.toggleModalDetails} className={this.props.className}>
              <ModalHeader toggle={this.toggleModalDetails}>Details</ModalHeader>
              <ModalBody>
                <p>Author: {post.author}</p>
                <p>Timestamp: {post.timestamp}</p>
                <p>Category: {post.category}</p>
              </ModalBody>
              <ModalFooter>
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
    postVote:asyncPostVote(dispatch)(post.id),
    //postVote: (postId) => dispatch(asyncPostVote(postId, "upVote")),
  }
}

 export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
