import api from '../utils/api'
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';
export const GET_COMMENTS = 'GET_COMMENTS';
export const POST_VOTE = 'POST_VOTE';

export function getCategories ({categories}) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

export const asyncGetCategories = (dispatch) => () => {
  api
    .fetchCategories()
    .then(categories => dispatch(getCategories(categories)))
};


export const getPosts = (posts) => ({
  type: GET_POSTS,
  posts
})

export const asyncGetPosts = (dispatch) => () => {
  api
    .fetchPosts()
    .then(posts => dispatch(getPosts(posts)))
};

export const getComments = (postId,comments) => ({
  type: GET_COMMENTS,
  comments,
  postId
})

export const asyncGetComments = (dispatch) => (postId) => {
  api
    .fetchCommentsForAPost(postId)
    .then(comments => dispatch(getComments(postId,comments)))
};

export const postVote = (post) => ({
  type: POST_VOTE,
  post
});

export const asyncPostVote = (dispatch) => (postId, option)=> () => {
  console.log("thorough asyncPostVote action (postId, option): " + postId + " " + option );
  api
    .voteForAPost(postId, option)
    .then(post => dispatch(postVote(post)))
};
