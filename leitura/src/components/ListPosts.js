import React, { Component } from 'react'
import Timestamp from 'react-timestamp'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import { removePost } from '../actions/post'
import { connect } from 'react-redux'




class ListPosts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ordenar: "vote"


        };

    }

    sortByChange = (event) => {
        event.preventDefault();
        const id = event.target.id
        this.setState((prevState, props) => {
            return { ordenar: id }
        })


    }
    handleRemovePost = (event) => {
        event.preventDefault();
        const { removePost, showAlert } = this.props
        const id = event.target.id
        removePost(id, false)
        showAlert('Post Removed', 'success')
    }

    render() {

        const { posts } = this.props
        const { ordenar } = this.state
        const postsFiltered = posts.filter((post) => post.deleted === false)
        const fieldToSort = ordenar === 'vote' ? '-voteScore' : '-timestamp'
        let postsSorted = postsFiltered.sort(sortBy(fieldToSort))


        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">

                    </div>
                    <div className="col-lg-3">
                        Sort by:
                           <a href="" id="date" onClick={this.sortByChange}> Date </a>
                        --
                           <a href="" id="vote" onClick={this.sortByChange}> Votes</a>
                    </div>

                </div>
                <ul>
                    {postsSorted.map((post) => (

                        <li key={post.title}>
                            <div className="row">
                                <div className="col-lg-9">
                                    <Link to={`/${post.category}/${post.id}`}><h3 className="mt-4">{post.title}</h3></Link>

                                    <p>Posted on <Timestamp time={(post.timestamp) / 1000} /></p>

                                </div>
                                <div className="col-lg-2">
                                    <h5 className="vote-list">Votes: {post.voteScore}</h5>
                                </div>
                                <div className="col-lg-1">

                                    <div className="remove-btn" >
                                        <a href="" id={`${post.id}`} onClick={this.handleRemovePost}>delete</a>
                                    </div>
                                </div>


                            </div>
                            <hr />
                        </li>



                    ))}

                </ul>

            </div>

        );
    }
}



const mapDispatchToProps = dispatch => ({
    removePost: (id, redirect) => dispatch(removePost(id, redirect)),

});

export default connect(null, mapDispatchToProps)(ListPosts)