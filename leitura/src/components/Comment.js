import React from 'react'
import VoteScore from './VoteScore'



function Comment(props){

   
        const { comment, handlerRemoveComment, openModalEditComment } = props

        return (

            <div className="media mb-4">
                <div className="row">

                    <div className="col-lg-4">
                        <h5 className="mt-0"><strong>{comment.author}</strong></h5>
                        <p>{comment.body}</p>
                    </div>
                    <div className="col-lg-2 votescore-comment">
                        <VoteScore entity={comment} tipo={'comment'} />

                    </div>
                    <div className="col-lg-1">
                        <a href=""  onClick={openModalEditComment}><span id={`${comment.id}`} className="btn-edit-comment glyphicon glyphicon-pencil"></span></a>

                    </div>
                    <div className="col-lg-5">
                        <div className="remove-btn-comment">
                            <a href="" id={`${comment.id}`} onClick={handlerRemoveComment}>delete</a>
                        </div>
                    </div>
                </div>

            </div>

        
    
        )
    

}

export default Comment