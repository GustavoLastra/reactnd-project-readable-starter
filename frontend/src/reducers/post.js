import * as actionTypes from '../actions/actionTypes'

export default function post (state = [], action) {
  switch (action.type) {
      case actionTypes.GET_POST :
        return action.post
      case actionTypes.POST_VOTE :
        return action.post
      case actionTypes.POST_DOWNVOTE :
        return action.post
      default :
        return state
  }
}
