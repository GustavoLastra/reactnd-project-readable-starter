import {
  GET_COMMENTS,
} from '../actions'

export default function comments (state = [], action) {
  if (action.type === GET_COMMENTS) {
    console.log("On post reducer comments "+ action.comments );
    return action.comments
  }
  return state
}
