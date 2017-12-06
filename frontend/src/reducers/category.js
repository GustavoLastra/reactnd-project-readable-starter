import * as actionTypes from '../actions/actionTypes'

export default function category (state = [], action) {
  if (action.type === actionTypes.STORE_CATEGORY) {
    console.log("On post reducer Category "+ action.category );
    return action.category
  }
  return state
}
