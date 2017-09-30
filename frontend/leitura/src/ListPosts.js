import React, { Component } from 'react'
import Timestamp from 'react-timestamp'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'



class ListPosts extends Component {

    

    
    render() {
        const { posts, handlerRemovePost } = this.props
        const postsFiltered = posts.filter((post) => post.deleted === false)
        const postsSorted = postsFiltered.sort(sortBy('-voteScore'))
        return (
            <div className="container">

                <ul>
                    {postsSorted.map((post) => (

                        <li key={post.title}>
                            <div className="row">
                                <div className="col-lg-9">
                                    <Link to={`/post/${post.id}`}><h3 className="mt-4">{post.title}</h3></Link>

                                    <p>Posted on <Timestamp time={(post.timestamp) / 1000} /></p>
                                </div>
                                <div className="col-lg-2">
                                <h5 className="vote-list">Votes: {post.voteScore}</h5>
                                </div>
                                <div className="col-lg-1">
                                    
                                    <div className="remove-btn">
                                        <a href="#" id={`${post.id}`} onClick={handlerRemovePost}></a>
                                    </div>
                                </div>


                            </div>
                            <hr />
                        </li>



                    ))}

                </ul>

            </div>

        )
    }
}



export default ListPosts