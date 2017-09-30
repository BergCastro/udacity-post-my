import React, { Component } from 'react'

class VoteScore extends Component {
    
    
    

   

    

    render() {
        
        const { vote, increment, decrement } = this.props

        return (
            <h4> Votes: {vote} <a href="#" onClick={increment}>+</a>  <a href="#" onClick={decrement}>-</a></h4>
        )

    }
}

export default VoteScore