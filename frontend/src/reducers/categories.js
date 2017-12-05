import * as actionTypes from '../actions/actionTypes'

export default function categories (state = [], action) {
  if (action.type === actionTypes.GET_CATEGORIES) {
    console.log("On post reducer categories "+ action.categories );
    return action.categories
  }
  return state
}
