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
    componentDidMount(){
        const voteScore = this.props.entity.voteScore
        this.setState({
            votes: voteScore
        })
    }

    changeVote = (event) => {
        event.preventDefault()
        const id = event.target.id
        const action = event.target.name
        const { tipo } = this.props
        if (tipo === 'post') {
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
        }else if(tipo === 'comment'){
            PostsAPI.voteComment(id, action)
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



    }


    render() {
        const { entity } = this.props

        let entityId = entity.id
        if (this.state.getProp) {

            this.state.votes = entity.voteScore

        }

        return (
            <h4> Votes: {this.state.votes} <a href="" id={entityId} name={'upVote'} onClick={this.changeVote}>+</a>  <a href="" id={entityId} name={'downVote'} onClick={this.changeVote} >-</a></h4>
        )

    }
}

export default VoteScore