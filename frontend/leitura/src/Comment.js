import React, { Component } from 'react'



class Comment extends Component {

   



    render() {
        const { comment,  handlerRemoveComment } = this.props
       
        return (


            <div className="media mb-4">
            
                <div className="media-body">
                    <h5 className="mt-0">{comment.author}</h5>
                    {comment.body}
                </div>
                <div className="col-lg-6">
                    <div className="remove-btn-comment">
                        <a href="#" id={`${comment.id}`} onClick={handlerRemoveComment}></a>
                    </div>
                </div>
            </div>

        )


    }
}

export default Comment