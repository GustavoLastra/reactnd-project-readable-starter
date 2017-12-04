import { combineReducers } from 'redux'
import {
  GET_CATEGORIES,
  GET_POSTS,
  GET_COMMENTS,
  POST_VOTE,
  CATEGORY_POSTS,
  SORT_POSTS,
  ADD_POST,
  EDIT_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_POST,
  DELETE_COMMENT
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
      case SORT_POSTS:
        console.log("Reducer SORT_POST action.sortState: "+ action.sortState );
        if(action.sortState==="hot") {
            return action.posts.sort((a , b) => b.voteScore - a.voteScore)
        }
        return action.posts.sort((a,b) => b.timestamp-a.timestamp)
      case ADD_POST:
        return action.posts
      case EDIT_POST:
        return action.posts
        case DELETE_POST:
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
  switch (action.type) {
    case GET_COMMENTS :
      console.log("On post reducer comments "+ action.comments );
      return action.comments
    case ADD_COMMENT :
      return action.comments
    case EDIT_COMMENT :
      console.log("On post reducer EDIT_COMMENT "+ action.comments );
      return action.comments
    case DELETE_COMMENT :
      return action.comments
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})
