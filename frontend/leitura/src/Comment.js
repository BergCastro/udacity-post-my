import React, { Component } from 'react'
import * as PostsAPI from './PostsAPI'
import Timestamp from 'react-timestamp'
import NavBarMy from './NavBar'
import Footer from './Footer'

class Comment extends Component {

    state = {

        comment: {}

    }



    render() {
        const { comment,  handlerRemoveComment } = this.props
       
        return (


            <div className="media mb-4">
                <img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="" />
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