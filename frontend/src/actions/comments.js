import * as api from '../utils/api.js'
import * as actionTypes from './actionTypes'

export const getComments = (postId,comments) => ({                    /* Get comment action*/
  type: actionTypes.GET_COMMENTS,
  comments,
  postId
})

export const asyncGetComments = (dispatch) => (postId) => {
  api
    .getPostComments(postId)
    .then(comments => dispatch(getComments(postId,comments)))
};

export const addComment = (comments) => ({                          /* Add comment action*/
  type: actionTypes.ADD_COMMENT,
  comments,
});

export const asyncAddComment = (dispatch) => (comment) => {
  console.log("through action asyncAddComment comment.body: " + comment.body );
    api
    .createComment(comment)
    .then(() => api.getPostComments(comment.parentId)
    .then(comments => dispatch(addComment(comments))))
};

export const editComment = (comments) => ({                         /* Edit comment action*/
  type: actionTypes.EDIT_COMMENT,
  comments,
});

export const asyncEditComment = (dispatch) => (comment) => {
  console.log("through action asyncEditComment comment: "+ comment);
    api
    .updateCommentBody(comment)
    .then(() => api.getPostComments(comment.parentId)
    .then(comments => dispatch(editComment(comments))))
};

export const deleteComment = (comments) => ({                       /* Delete comment action*/
  type: actionTypes.DELETE_COMMENT,
  comments,
});

export const asyncDeleteComment = (dispatch) => (comment) => {
  console.log("through action asyncDeleteComment ");
    api
    .deleteComment(comment.id)
    .then(() => api.getPostComments(comment.parentId)
    .then(comments => dispatch(deleteComment(comments))))
};

export const commentVote = (comments) => ({                         /* Edit comment action*/
  type: actionTypes.COMMENT_VOTE,
  comments,
});

export const asyncCommentVote = (dispatch) => (comment) => {
  console.log("through action asynccCommentVote: "+ comment);
    api
    .voteComment(comment.id)
    .then(() => api.getPostComments(comment.parentId)
    .then(comments => dispatch(commentVote(comments))))
};

export const commentDownVote = (comments) => ({                         /* Edit comment action*/
  type: actionTypes.COMMENT_DOWNVOTE,
  comments,
});

export const asyncCommentDownVote = (dispatch) => (comment) => {
  console.log("through action asynccCommentDownVote: "+ comment);
    api
    .downVoteComment(comment.id)
    .then(() => api.getPostComments(comment.parentId)
    .then(comments => dispatch(commentDownVote(comments))))
};
