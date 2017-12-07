import * as actionTypes from '../actions/actionTypes'

export default function comments (state = [], action) {
  switch (action.type) {
    case actionTypes.GET_COMMENTS :
      console.log("On post reducer comments "+ action.comments );
      return action.comments
    case actionTypes.ADD_COMMENT :
      return action.comments
    case actionTypes.EDIT_COMMENT :
      console.log("On post reducer EDIT_COMMENT "+ action.comments );
      return action.comments
    case actionTypes.DELETE_COMMENT :
      return action.comments
    case actionTypes.COMMENT_VOTE :
      return action.comments
    case actionTypes.COMMENT_DOWNVOTE :
      return action.comments
    default:
      return state
  }
}
