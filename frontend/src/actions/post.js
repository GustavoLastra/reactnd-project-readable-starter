import * as api from '../utils/api.js'
import * as actionTypes from './actionTypes'

export const getPostt = (post) => ({                 /* Get posts action*/
  type: actionTypes.GET_POST,
  post
})

export const asyncGetPost = (postId) => dispatch => {
  console.log("asyncGetPost55555555555555555555 :" + postId);
  api
    .getPost(postId)
    .then(post => dispatch(getPostt(post)))
};

export const postVote = (post) => ({               /* vote for a post action*/
  type: actionTypes.POST_VOTE,
  //posts,
  post
});

export const asyncPostVote = (postId) => dispatch => {
  console.log("thorough asyncPostVote action (postId, option)POST POST: " + postId );
  api
    .votePost(postId)
    .then(post => dispatch(postVote(post)))
};

export const downVotePost = (post) => ({               /* downvote for a post action*/
  type: actionTypes.POST_DOWNVOTE,
  //posts,
  post
});

export const asyncPostDownVote = (postId) => dispatch => {
  console.log("thorough asyncPostDownVote action (postId, option)POST POST: " + postId );
  api.downVotePost(postId).then(post => dispatch(downVotePost(post)))
};
