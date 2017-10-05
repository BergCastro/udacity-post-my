import React, { Component } from 'react'
import * as PostsAPI from '../PostsAPI'
import Timestamp from 'react-timestamp'
import NavBarMy from './NavBar'
import Comment from './Comment'
import VoteScore from './VoteScore'
import sortBy from 'sort-by'

class Post extends Component {

    state = {

        post: {},
        commentsLocal: [],
        body: '',
        author: '',

    }




    componentDidMount() {
        const { id } = this.props
        console.log("valor id: " + id)
        PostsAPI.getPostById(id).then((post) => {
            PostsAPI.getCommentsByPost(id).then((comments) => {
                this.setState({ post, commentsLocal: comments })
            })


        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const parentId = this.state.post.id
        const body = this.state.body
        const author = this.state.author
        
        const id = Math.floor((Math.random() * 100000) + 1) + "";
        const newComment = {
            id: id,
            body: body,
            author: author,
            voteScore: 1,
            deleted: false
        }


        PostsAPI.addComment(id, parentId, body, author)
        this.setState({
            commentsLocal: [...this.state.commentsLocal,
                newComment
            ],
            author: '',
            body: ''

        })

    }

    handleAuthorChange = (event) => {
        this.setState({ author: event.target.value });
    }

    handleBodyChange = (event) => {
        this.setState({ body: event.target.value });
    }

    handlerRemoveComment = (event) => {
        event.preventDefault()
        const id = event.target.id
              
        PostsAPI.removeComment(id)
        this.setState({
            commentsLocal: this.state.commentsLocal.filter(comment => comment.id !== id)

        })




    }



    render() {
        const { title, author, timestamp, body } = this.state.post
        const { commentsLocal } = this.state
        const commentsSorted = commentsLocal.sort(sortBy('-voteScore'))
        
       
        return (
            <div>
                <NavBarMy />
                <div className="col-lg-12">


                    <h1 className="mt-4">{title}</h1>


                    <p className="lead">

                        {"by " + author}
                    </p>



                    <p>Posted on <Timestamp time={(timestamp) / 1000} /> </p>
                    <VoteScore entity={this.state.post} tipo={'post'} />


                    <hr />

                    <p className="lead">{body}</p>

                    <hr />

                    <div className="card my-4">
                        <h5 className="card-header">Leave a Comment:</h5>


                        <div className="card-block">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="author-post">Author: </label>
                                    <input type="text" value={this.state.author} className="form-control" id="author-post" onChange={this.handleAuthorChange} />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" value={this.state.body} rows="3" onChange={this.handleBodyChange}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>

                            </form>
                        </div>


                    </div>

                    {commentsSorted.map((comment, index) => (

                        <Comment key={index} indexRemove={index} comment={comment} handlerRemoveComment={this.handlerRemoveComment} />


                    ))}


                    <br />
                    <br />

                </div>
                <div>

                </div>
            </div>

        )


    }
}

export default Post