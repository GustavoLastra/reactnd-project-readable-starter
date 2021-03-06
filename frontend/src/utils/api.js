const url = "http://localhost:3001"

const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever-you-want'
}

export const getCategories = () =>
  fetch(`${url}/categories`, {
    headers: {
      ...headers
    }
  }).then(res => res.json()).then(data => data.categories)

export const getPosts = () =>
  fetch(`${url}/posts`, {
    headers: {
      ...headers
    }
  }).then(res => res.json())

export const getCategoryPosts = (category) =>
  fetch(`${url}/${category}/posts`, {
    headers: {
      ...headers
    }
  }).then(res => res.json())

export const getPost = (postId) =>
  fetch(`${url}/posts/${postId}`, {
    headers: {
      ...headers
    }
  }).then(res => res.json())

export const getPostComments = (postId) =>
  fetch(`${url}/posts/${postId}/comments`, {
    headers: {
      ...headers
    }
  }).then(res => res.json())

export const updateComment = (comment, option) =>
  fetch(`${url}/comments/${comment.id}`, {
    method: 'POST',
    headers: {
      ...headers,
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(option)
  }).then(res => res.json())

export const deleteComment = (commentId) =>
  fetch(`${url}/comments/${commentId}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'whatever-you-want' }
  }).then(res => res.json())

export const deletePost = (postId) =>
  fetch(`${url}/posts/${postId}`, {
    method: 'DELETE',
    headers: { 'Authorization': 'whatever-you-want' }
  }).then(res => res.json())

export const createComment = (data) =>
  fetch(`${url}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())

export const votePost = (postId) =>
  fetch(`${url}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'upVote'})
  }).then(res => res.json())


export const voteComment = (commentId) =>
   fetch(`${url}/comments/${commentId}`, {
    method: "POST",
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'upVote'})
  }).then(res => res.json())


export const downVotePost = (postId) =>
  fetch(`${url}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'downVote'})
  }).then(res => res.json())

export const downVoteComment = (commentId) =>
   fetch(`${url}/comments/${commentId}`, {
    method: "POST",
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'downVote'})
  }).then(res => res.json())

export const createPost = (data) =>
  fetch(`${url}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())

export const updatePost = (data) =>
  fetch(`${url}/posts/${data.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())

export const updateCommentBody = (comment) =>
  fetch(`${url}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())

export const getComment = (commentId) =>
  fetch(`${url}/comments/${commentId}`, {
    headers: {
      ...headers
    }
  }).then(res => res.json())
