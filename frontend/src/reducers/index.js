import { combineReducers } from 'redux'
//import posts from './posts'
//import categories from './categories'
import {
  GET_CATEGORIES,
  GET_POSTS,
  GET_COMMENTS
}from '../actions'

function posts (state = [], action) {
  if (action.type === GET_POSTS) {
    console.log("On post reducer action "+ action.posts );
    return action.posts
  }
  return state
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


export default combineReducers({
  categories,
  posts,
  comments
})
