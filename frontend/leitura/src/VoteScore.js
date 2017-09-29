import React, { Component } from 'react'

class VoteScore extends Component {
    
    state = {
        voteScore: 0
    }
    

    incrementVote = () => {
        console.log('increment')
        this.setState({
            voteScore: this.state.voteScore + 1
        })
    }
    decrementVote = () => {
        console.log('decrement')
        this.setState((prevState, props) => ({
            voteScore: prevState.voteScore - 1
        }))
    }

    

    render() {
        
        console.log(this.state.voteScore)

        return (
            <h5> Votes: {this.state.voteScore} <a href="#" onClick={this.incrementVote}>+</a>  <a href="#" onClick={this.decrementVote}>-</a></h5>
        )

    }
}

export default VoteScore