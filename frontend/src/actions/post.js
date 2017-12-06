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
