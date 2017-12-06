import * as actionTypes from '../actions/actionTypes'
export default function posts (state = [], action) {
  switch (action.type) {
      case actionTypes.GET_POSTS :
        return action.posts
      case actionTypes.POST_VOTE_POSTS :
        return action.posts
      case actionTypes.POST_DOWNVOTE_POSTS:
        return action.posts
      case actionTypes.CATEGORY_POSTS:
        return action.posts
      case actionTypes.SORT_POSTS:
        if(action.sortState==="hot") {
            return action.posts.sort((a , b) => b.voteScore - a.voteScore)
        }
        return action.posts.sort((a,b) => b.timestamp-a.timestamp)
      case actionTypes.ADD_POST:
        return action.posts
      case actionTypes.EDIT_POST:
        return action.posts
      case actionTypes.DELETE_POST:
        return action.posts
      default :
        return state
  }
}
