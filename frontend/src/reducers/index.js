import { combineReducers } from 'redux'
//import posts from './posts'
//import categories from './categories'
import {
  GET_CATEGORIES,
  GET_POSTS,
  GET_COMMENTS,
  POST_VOTE,
  CATEGORY_POSTS
}from '../actions'

function posts (state = [], action) {
  switch (action.type) {
      case GET_POSTS :
        return action.posts
      case POST_VOTE :
        return action.posts
      case CATEGORY_POSTS:
        console.log("On post reducer posts by categories hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh " );
        return action.posts

      default :
        return state
  }
}

function categories (state = [], action) {
  if (action.type === GET_CATEGORIES) {
    console.log("On post reducer categories "+ action.categories );
    return action.categories
  }
  return state
}

function comments (state = [], action) {
  if (action.type === GET_COMMENTS) {
    console.log("On post reducer comments "+ action.comments );
    return action.comments
  }
  return state
}

/*function votes (state = [], action) {

  return state
}*/


export default combineReducers({
  categories,
  posts,
  comments
})
