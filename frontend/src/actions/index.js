//import api from '../utils/api'
import * as api from '../utils/api.js'
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';
export const GET_COMMENTS = 'GET_COMMENTS';
export const POST_VOTE = 'POST_VOTE';

export function getCategories (categories) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export const asyncGetCategories = (dispatch) => () => {
  api
    .getCategories()
    .then(categories => dispatch(getCategories(categories)))
};


export const getPosts = (posts) => ({
  type: GET_POSTS,
  posts
})

export const asyncGetPosts = (dispatch) => () => {
  api
    .getPosts()
    .then(posts => dispatch(getPosts(posts)))
};

export const getComments = (postId,comments) => ({
  type: GET_COMMENTS,
  comments,
  postId
})

export const asyncGetComments = (dispatch) => (postId) => {
  api
    .getPostComments(postId)
    .then(comments => dispatch(getComments(postId,comments)))
};

export const postVote = (posts) => ({
  type: POST_VOTE,
  //posts,
  posts
});

export const asyncPostVote = (dispatch) => (postId)=> () => {
  console.log("thorough asyncPostVote action (postId, option): " + postId + " " );
  api
    .votePost(postId)
    .then(() => api.getPosts()
    .then(posts => dispatch(postVote(posts))))
};
