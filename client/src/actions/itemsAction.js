import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  TEMS_LOADING,
  GET_ITEMS_COMMENTS,
  ADD_ITEM_COMMENT,
  USER_LOADING
  } from './types';
  import{ getToken } from '../App'
  // import { getPosts } from './itemsAction';

  export const getPosts =  () =>  async dispatch => {
    // console.log('actions', )
    const posts = await getToken().request(
      `query  {
          posts{
          _id
          title
          imgURL
          description
          date
          author{
            _id
            email
            name
          }
         }
       }`,
      )
      // console.log(posts)
      dispatch({type: GET_ITEMS, posts})

  }

  export const addPost =  (title, imgURL, description) =>  async dispatch => {
    // console.log('actions', )
    const post = await getToken().request(
      `mutation ($title: String!, $imgURL: String, $description: String!) {
        createPost(postInput: {title: $title, imgURL: $imgURL, description: $description}){
          title
          description
          imgURL
          _id
          date
        }
      }`,
      {title, imgURL, description})
      // console.log(post)
      dispatch({type: ADD_ITEM, post})
      dispatch(getPosts())
  }

  export const deletePost = (postId) => async dispatch => {
    const deletePost = await getToken().request(
      `mutation ($postId: ID!) {
        deletePost (postId: $postId) {
          _id
          title
          imgURL
          description
          date
          author{
            _id
            email
            name
          }
        }
      }`,
      {postId})
      // console.log('DEletePosr',deletePost)
      dispatch({type: DELETE_ITEM, deletePost})
  }

  export const getComments =  () =>  async dispatch => {
    // console.log('actions', )
    const comments = await getToken().request(
      `query  {
        comments{
          _id
          description
          author{
              email
              name
            }
            postId{
              _id
            }
          }
       }`,
      )
      // console.log('comments', comments)
      dispatch({type: GET_ITEMS_COMMENTS, comments })

  }
  export const addComment =  (postId, description) =>  async dispatch => {
    // console.log('actions', )
    const comment = await getToken().request(
      `mutation ($postId: ID!, $description: String!) {
        createComment(commentInput: {postId: $postId, description: $description}){
          description
          _id
        }
      }`,
      { postId, description})
      // console.log(comment)
      dispatch({type: ADD_ITEM_COMMENT, comment})
      dispatch(getComments())
  }
  export const getUser = () => async dispatch => {
    const user = await getToken().request(`
      query {
        user {
          name
          email
          _id 
        }
      }`
    )
    console.log(user)
    dispatch({type: USER_LOADING, user})
  }
