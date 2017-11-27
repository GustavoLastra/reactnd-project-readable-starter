import { combineReducers } from 'redux'
//import posts from './posts'
//import categories from './categories'
import {
  GET_CATEGORIES,
  GET_POSTS,
  GET_COMMENTS,
  POST_VOTE
}from '../actions'

function posts (state = [], action) {
  switch (action.type) {
      case GET_POSTS :
        //console.log("On post reducer action "+ action.posts );
        console.log("On post reducer votes post: " + JSON.stringify(action.posts, null, 4));
        return action.posts
      case POST_VOTE :

        state.map(element => console.log(element));
        const { post } = action;
        const { voteScore} =  post;
        console.log("On post reducer votes post: " + JSON.stringify(post, null, 4));
        console.log("On post reducer votes state: " + JSON.stringify(state, null, 4));
        console.log("On post reducer votes voteScore: "+ voteScore );
        console.log("On post reducer votes postid: "+ post.id );
        /*let newState= state.map(element => {
            if(element.id===post.id){
              element.voteScore=voteScore
            } else {
              element = "hola";
            }
          }
        )*/
        return {
          ...state,
          post:  state.map(element => {
              element.id===post.id
               ? element.voteScore=voteScore
               : element = "hola";
              return element
            })
        }

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
  if (action.type === GET_COMMENTS) {
    console.log("On post reducer comments "+ action.comments );
    return action.comments
  }
  return state
}

/*function votes (state = [], action) {

  return state
}*/


export default combineReducers({
  categories,
  posts,
  comments
})
