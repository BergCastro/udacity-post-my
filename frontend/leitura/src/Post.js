import React, { Component } from 'react'
import * as PostsAPI from './PostsAPI'
import Timestamp from 'react-timestamp'
import NavBarMy from './NavBar'
import Footer from './Footer'
import Comment from './Comment'
import VoteScore from './VoteScore'

class Post extends Component {

    state = {

        post: {},
        comments: [],
        body: '',
        author: '',
        



    }

    incrementVote = () => {
        const id = this.state.post.id
        PostsAPI.voteUp(this.state.post.id, "upVote")
        PostsAPI.getPostById(id).then((post) => {    
            this.setState(post)
        })
        
    }
    decrementVote = () => {
        const id = this.state.post.id
        PostsAPI.voteUp(this.state.post.id, "downVote")
        PostsAPI.getPostById(id).then((post) => {    
            this.setState(post)
        })
    }

    componentWillMount() {
        const { id } = this.props
        PostsAPI.getPostById(id).then((post) => {
            PostsAPI.getCommentsByPost(id).then((comments) => {
                this.setState({ post, comments})
            })


        })
    }

    handleSubmit = (event) => {
        const parentId = this.state.post.id
        const body = this.state.body
        const author = this.state.author

        PostsAPI.addComment(parentId, body, author)


    }
    handleAuthorChange = (event) => {
        this.setState({ author: event.target.value });
    }

    handleBodyChange = (event) => {
        this.setState({ body: event.target.value });
    }

    handlerRemoveComment = (event) => {
        const id = event.target.id
        const { idPost } = this.props
        PostsAPI.removeComment(id)
        PostsAPI.getCommentsByPost(idPost).then((comments) => {
            this.setState({ comments })
        })





    }

    render() {
        const { title, author, timestamp, body, voteScore } = this.state.post
        const { comments } = this.state
        console.log('post')
        return (
            <div>
                <NavBarMy />
                <div className="col-lg-12">


                    <h1 className="mt-4">{title}</h1>


                    <p className="lead">
                        by
                <a href="#"> {author}</a>
                    </p>



                    <p>Posted on <Timestamp time={(timestamp) / 1000} /> </p>
                    <VoteScore vote={this.state.post.voteScore} increment={this.incrementVote} decrement={this.decrementVote}/> 
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
                                    <textarea className="form-control" rows="3" onChange={this.handleBodyChange}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>

                            </form>
                        </div>


                    </div>



                    {comments.map((comment) => (

                        <Comment key={comment.id} comment={comment} handlerRemoveComment={this.handlerRemoveComment} />


                    ))}



                </div>
            </div>

        )


    }
}

export default Post