import { combineReducers } from 'redux'
import categories from './categoryReducer'
import posts from './postListReducer'
import comments from './commentsReducer'
import sortOrder from './sortReducer'
import count from './countReducer'

const postApp = combineReducers({
  categories,
  posts,
  comments,
  sortOrder,
  count
})

export default postApp