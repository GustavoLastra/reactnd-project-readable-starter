//import api from '../utils/api'
import * as api from '../utils/api.js'
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_POSTS = 'GET_POSTS';
export const GET_COMMENTS = 'GET_COMMENTS';
export const POST_VOTE = 'POST_VOTE';
export const CATEGORY_POSTS = 'CATEGORY_POSTS';
export const SORT_POSTS = 'SORT_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';


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




export const categoryPosts = (posts) => ({
  type: CATEGORY_POSTS,
  posts
});

export const asyncGetCategoryPosts = (dispatch) => (category)=> {
  console.log("thorough asyncGetCategoryPosts action (category): " + category );
  api
    .getCategoryPosts(category)
    .then(posts => dispatch(categoryPosts(posts)))
};

export const sortPosts = (posts,sortState) => ({
  type: SORT_POSTS,
  posts,
  sortState
});

export const asyncSortPosts = (dispatch) => (sortState) => {
  console.log("through action asyncSortPosts sortState: " +  sortState );
    api
    .getPosts()
    .then(posts => dispatch(sortPosts(posts,sortState)))
};

export const addPost = (posts) => ({
  type: ADD_POST,
  posts,
});

export const asyncAddPost = (dispatch) => (post) => {
  console.log("through action asyncAddPost post.name: " + post.name );
    api
    .createPost(post)
    .then(() => api.getPosts()
    .then(posts => dispatch(addPost(posts))))
};

export const editPost = (posts) => ({
  type: EDIT_POST,
  posts,
});

export const asyncEditPost = (dispatch) => (post) => {
  console.log("through action asyncEditPost");
    api
    .updatePost(post)
    .then(() => api.getPosts()
    .then(posts => dispatch(editPost(posts))))
};

export const addComment = (comments) => ({
  type: ADD_COMMENT,
  comments,
});

export const asyncAddComment = (dispatch) => (comment) => {
  console.log("through action asyncAddComment comment.body: " + comment.body );
    api
    .createComment(comment)
    .then(() => api.getPostComments(comment.parentId)
    .then(comments => dispatch(addComment(comments))))
};

export const editComment = (comments) => ({
  type: EDIT_COMMENT,
  comments,
});

export const asyncEditComment = (dispatch) => (comment) => {
  console.log("through action asyncEditComment comment: "+ comment);
    api
    .updateCommentBody(comment)
    .then(() => api.getPostComments(comment.parentId)
    .then(comments => dispatch(editComment(comments))))
};
