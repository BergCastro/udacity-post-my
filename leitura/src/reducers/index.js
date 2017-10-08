import {
    ADD_POST,
    EDIT_POST,
    REMOVE_POST
} from '../actions'
import { combineReducers } from 'redux' 

const INITIAL_STATE_POST = {
    posts: []
}

const INITIAL_STATE_COMMENTS = {
    comments: []
}


function reducerPost(state = INITIAL_STATE_POST, action) {
    const { title, author, body } = action

    switch (action.type) {
        case ADD_POST:
            return {
                ...state
            }
        case EDIT_POST:
            return {}
        case REMOVE_POST:
            return {}
        default:
            return state
    }
}

function reducerComment(state= INITIAL_STATE_COMMENTS, action){
    return state
}


export default combineReducers({reducerPost, reducerComment})