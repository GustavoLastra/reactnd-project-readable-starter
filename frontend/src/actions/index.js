export const ADD_POST = 'ADD_POST'
export const REMOVE_POST = 'REMOVE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'


export function addPost ({x , y }) {
  return {
    type: ADD_POST,
    x,
    y,
  }
}

export function removePost ({x , y }) {
  return {
    type: REMOVE_POST,
    x,
    y,
  }
}

export function addComment ({x , y }) {
  return {
    type: ADD_COMMENT,
    x,
    y,
  }
}

export function removeComment ({x , y }) {
  return {
    type: REMOVE_COMMENT,
    x,
    y,
  }
}
