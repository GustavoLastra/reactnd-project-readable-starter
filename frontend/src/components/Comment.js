import React, { Component } from 'react';
import '../App.css';
import { Jumbotron, Container, Button,  Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import CommentFormEdit from './CommentFormEdit';

class Comment extends Component {
  constructor (props) {
    super(props);
    this.state = {
      modalEditComment: false,
    };
    this.toggleModalEditComment = this.toggleModalEditComment.bind(this);
  }

  toggleModalEditComment= ()=> {
    this.setState({
      modalEditComment : !this.state.modalEditComment
    });
  }



  render() {
    const {comment, postId} =  this.props;
    return (
      <div>
      <ListGroupItem>
        {comment.body}
        <Button color="warning" onClick={this.toggleModalEditComment}>Edit</Button>
        <Button color="danger" >Delete</Button>
      </ListGroupItem>

      <Modal isOpen={this.state.modalEditComment} toggle={this.toggleModalEditComment} className={this.props.className}>
        <ModalHeader toggle={this.toggleModalEditComment}>Edit the post!</ModalHeader>
        <ModalBody>

          <CommentFormEdit
            comment={comment}
          />

        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleModalEditComment}>Close</Button>
          <Button color="primary" onClick={this.toggleModalAddPost}>Close</Button>
        </ModalFooter>
      </Modal>

      </div>
    );
  }
}


export default Comment
