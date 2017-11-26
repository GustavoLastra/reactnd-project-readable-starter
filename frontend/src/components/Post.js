import React, { Component } from 'react';
import {asyncGetCategories,asyncGetPosts} from '../actions'
import ConnectedListComments from './ListComments';
import { Jumbotron, Container, Button,  Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import '../App.css';
import { Link } from 'react-router-dom'

class Post extends Component {
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
            <Button onClick={this.toggle} color="primary">Details</Button>
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
                <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </p>
        </Container>
      </Jumbotron>
    );
  }
}


export default Post
