import { combineReducers } from 'redux'
import todos from './reducer1'
import visibilityFilter from './reducer2'

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

export default todoApp