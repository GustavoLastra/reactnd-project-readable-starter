import * as actionTypes from '../actions/actionTypes'

export default function post (state = [], action) {
  console.log("On post reducer99999999 ");
  if (action.type === actionTypes.GET_POST) {
    console.log("On post reducer Category "+ action.post );
    return action.post
  }
  return state
}
