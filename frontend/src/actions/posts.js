import * as api from '../utils/api.js'
import * as actionTypes from './actionTypes'

export const getPosts = (posts) => ({                 /* Get posts action*/
  type: actionTypes.GET_POSTS,
  posts
})

export const asyncGetPosts = (dispatch) => () => {
  api
    .getPosts()
    .then(posts => dispatch(getPosts(posts)))
};

export const categoryPosts = (posts) => ({          /* Get posts by category action*/
  type: actionTypes.CATEGORY_POSTS,
  posts
});

export const asyncGetCategoryPosts = (dispatch) => (category)=> {
  console.log("thorough asyncGetCategoryPosts action (category): " + category );
  api
    .getCategoryPosts(category)
    .then(posts => dispatch(categoryPosts(posts)))
};

export const postVote = (posts) => ({               /* vote for a post action*/
  type: actionTypes.POST_VOTE_POSTS,
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

export const downVotePost = (posts) => ({               /* downvote for a post action*/
  type: actionTypes.POST_DOWNVOTE_POSTS,
  //posts,
  posts
});

export const asyncPostDownVote = (dispatch) => (postId)=> () => {
  console.log("thorough asyncPostDownVote action (postId, option): " + postId + " " );
  api
    .downVotePost(postId)
    .then(() => api.getPosts()
    .then(posts => dispatch(downVotePost(posts))))
};

export const sortPosts = (posts,sortState) => ({    /* Sort posts action*/
  type: actionTypes.SORT_POSTS,
  posts,
  sortState
});

export const asyncSortPosts = (dispatch) => (sortState) => {

    api
    .getPosts()
    .then(posts => dispatch(sortPosts(posts,sortState)))
};

export const asyncSortPostsCategory = (dispatch) => (sortState,category) => {
  console.log("through action asyncSortPostsCategory sortState and category: " +  sortState +" "+ category);
    api
    .getCategoryPosts(category)
    .then(posts => dispatch(sortPosts(posts,sortState)))
};

export const addPost = (posts) => ({              /* Add a post action*/
  type: actionTypes.ADD_POST,
  posts,
});

export const asyncAddPost = (dispatch) => (post) => {
  console.log("through action asyncAddPost post.name: " + post.name );
    api
    .createPost(post)
    .then(() => api.getPosts()
    .then(posts => dispatch(addPost(posts))))
};

export const editPost = (posts) => ({             /* Edit a post action*/
  type: actionTypes.EDIT_POST,
  posts,
});

export const asyncEditPost = (dispatch) => (post) => {
  console.log("through action asyncEditPost");
    api
    .updatePost(post)
    .then(() => api.getPosts()
    .then(posts => dispatch(editPost(posts))))
};

export const deletePost = (posts) => ({            /* Delete a post action*/
  type: actionTypes.DELETE_POST,
  posts,
});

export const asyncDeletePost = (dispatch) => (postId) => {
  console.log("through action asyncDeletePost ");
    api
    .deletePost(postId)
    .then(() => api.getPosts()
    .then(posts => dispatch(deletePost(posts))))
};
