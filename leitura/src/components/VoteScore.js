import React, { Component } from 'react'
import { connect } from 'react-redux'
import { incrementVoteComment, decrementVoteComment } from '../actions/comment'
import { incrementVotePost, decrementVotePost } from '../actions/post'

class VoteScore extends Component {
    
    

    incrementVote = (event) => {
        event.preventDefault()
        const { entity, tipo } = this.props
        if(tipo === 'comment'){
            this.props.incrementVoteComment(entity.id)
        }else if(tipo === 'post'){
            this.props.incrementVotePost(entity.id)
        }

    }

    decrementVote = (event) => {
        event.preventDefault()
        const { entity, tipo } = this.props
        if(tipo === 'comment'){
            this.props.decrementVoteComment(entity.id)
        }else if(tipo === 'post'){
            this.props.decrementVotePost(entity.id)
        }

    }


    render() {
        const { entity } = this.props

        return (
            <h4> Votes:  <button className="btn btn-default" onClick={this.incrementVote}><span className="glyphicon glyphicon-thumbs-up"></span></button> {entity.voteScore} <button className="btn btn-default" onClick={this.decrementVote} > <span className="glyphicon glyphicon-thumbs-down"></span></button></h4>
        )

    }
}

const mapDispatchToProps = dispatch => ({
    
    incrementVoteComment: (id) => dispatch(incrementVoteComment(id)),
    decrementVoteComment: (id) => dispatch(decrementVoteComment(id)),
    incrementVotePost: (id) => dispatch(incrementVotePost(id)),
    decrementVotePost: (id) => dispatch(decrementVotePost(id))

});

export default connect(null, mapDispatchToProps)(VoteScore)