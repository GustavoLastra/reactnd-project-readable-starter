import React, { Component } from 'react';
import {asyncGetCategories,asyncGetPosts} from '../actions'
import ConnectedListComments from './ListComments';
import { Jumbotron, Container, Button,  Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { Badge } from 'reactstrap';
import '../App.css';
import { Link } from 'react-router-dom'

class Post extends Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      modal: false,
      popover: false
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

  render() {
    const {post} =  this.props;
    return (
      <Jumbotron >
        <Container fluid>
          <h1 className="display-3">{post.title}</h1>
          <p className="lead">
            {post.body}
          </p>
          <hr className="my-2" />
          <p>Author: {post.author}</p>
          <p className="lead">
            <Button color="success" onClick={this.toggleModal}>Give a Taco <Badge color="success">{post.voteScore}</Badge></Button>
            <Button color="primary" onClick={this.toggleModal}>Comment</Button>
            <Button id="PopoverDetails" color="info" onClick={this.togglePopup}>Details</Button>
            <Popover placement="bottom" isOpen={this.state.popover} target="PopoverDetails" toggle={this.togglePopup}>
              <PopoverHeader>Popover Title</PopoverHeader>
              <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
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


export default Post
