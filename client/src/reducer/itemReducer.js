import {
    GET_ITEMS,
    ADD_ITEM,
    GET_ITEMS_COMMENTS,
    ADD_ITEM_COMMENT,
    DELETE_ITEM,
    USER_LOADING
  } from '../actions/types';
import { deletePost } from '../actions/itemsAction';

  const initialState = {
      token: localStorage.getItem('token'),
      posts: [],
      comments: [],
      loading: false,
      user: null
  }

  export default ( state = initialState, action ) => {
      switch (action.type) {
            case  GET_ITEMS:
                // console.log('Action', action.posts.posts)
              return {
                  ...state,
                  ...action,
                  loading: false,
                  posts: action.posts.posts,
              };
              case GET_ITEMS_COMMENTS:
                  return {
                      ...state,
                      ...action,
                    comments: action.comments.comments

                  }
            
            case ADD_ITEM:
                    let newState = { ...state }
                    // console.log(newState)
                    newState.posts = action.post
                return {
                    ...state,
                    ...action,
                    isLoading: false
                };
            case ADD_ITEM_COMMENT:
                // console.log(action.comment)
                return {
                    ...state,
                    ...action,
                    isLoading: false
                };
                case DELETE_ITEM:
                        // console.log('Delete', action.deletePost)
                        console.log('Delete', state)
                        let newDellState = { ...state }
                        let delPosts = action.deletePost
                         
                        newDellState.posts = delPosts.deletePost
                return {
                    ...newDellState,
                    ...action
                }
                case USER_LOADING: 
                return {
                    ...state,
                    ...action,
                    user: action.user.user
                }
    default:
      return state;
              
      }
  }