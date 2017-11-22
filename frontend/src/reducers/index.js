import { combineReducers } from 'redux'
import {
  ADD_POST,
  REMOVE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions'

function post (state = {}, action) {
  switch (action.type) {
    case ADD_POST :
      const { recipe } = action

      return {
        ...state,
        [recipe.label]: recipe,
      }
    case REMOVE_POST:
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: null,
        }
      }
    default :
      return state
  }
}
function comment (state = {}, action) {
  switch (action.type) {
    case ADD_COMMENT :
      const { recipe } = action

      return {
        ...state,
        [recipe.label]: recipe,
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: null,
        }
      }
    default :
      return state
  }
}


export default combineReducers({
  post,
  comment,
})
