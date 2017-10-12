import * as PostsAPI from '../PostsAPI'

export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const INCREMENT_VOTE_COMMENT = 'INCREMENT_VOTE_COMMENT'
export const DECREMENT_VOTE_COMMENT = 'DECREMENT_VOTE_COMMENT'

export function addComment(parentId, body, author) {
    const id = Math.floor((Math.random() * 100000) + 1) + "";
    PostsAPI.addComment(id, parentId, body, author)

   
    return {
            type: ADD_COMMENT,
            payload: {
                   id: id,
                   parentId: parentId,
                   timestamp: Date.now(),
                   body: body,
                   author: author,
                   voteScore: 1,
                   deleted: false,
                   parentDeleted: false 
            }
    }
}
export function removeComment(id) {
    
    PostsAPI.removeComment(id)
   
   
    return {
            type: REMOVE_COMMENT,
            payload: id
            
    }
}

export function updateComment(id, body) {
    
    PostsAPI.updateComment(id, body)
   
   
    return {
            type: UPDATE_COMMENT,
            payload: {
                    id: id,
                    body: body
            }
            
    }
}

export function incrementVoteComment(id) {
    PostsAPI.voteComment(id, 'upVote')
    return {
            type: INCREMENT_VOTE_COMMENT,
            payload: id
           
    }
}

export function decrementVoteComment(id) {
    PostsAPI.voteComment(id, 'downVote')
    return {
            type: DECREMENT_VOTE_COMMENT,
            payload: id
           
    }
}

