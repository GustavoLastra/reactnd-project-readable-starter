import {
  GET_POSTS,
} from '../actions'

export default function posts (state = [], action) {
  if (action.type === GET_POSTS) {
    console.log("On post reducer action "+ action.posts );
    return action.posts
  }
  return state
}
