import React, { Component } from 'react'
import * as PostsAPI from '../PostsAPI'

class VoteScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votes: 0,
            getProp: true


        }


    }


    changeVote = (event) => {
        event.preventDefault()
        const id = event.target.id
        const action = event.target.name


        PostsAPI.voteUp(id, action)
        if (action === 'upVote') {
            this.setState((prevtState) => ({
                votes: prevtState.votes + 1,
                getProp: false
            }))
        } else {
            this.setState((prevtState) => ({
                votes: prevtState.votes - 1,
                getProp: false
            }))
        }


    }


    render() {
        const { post } = this.props

        let postId = post.id
        if (this.state.getProp) {

            this.state.votes = post.voteScore

        }

        return (
            <h4> Votes: {this.state.votes} <a href="#" id={postId} name={'upVote'} onClick={this.changeVote}>+</a>  <a id={postId} name={'downVote'} onClick={this.changeVote} href="#" >-</a></h4>
        )

    }
}

export default VoteScore