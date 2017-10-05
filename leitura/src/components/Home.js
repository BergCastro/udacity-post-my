import React, { Component } from 'react'
import NavBarMy from './NavBar';
import ListPosts from './ListPosts';
import * as PostsAPI from '../PostsAPI'
import { Link } from 'react-router-dom'



class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],


        }

    }



    handlerRemovePost = (event) => {
        event.preventDefault()
        const id = event.target.id
        PostsAPI.removePost(id)
        PostsAPI.getAll().then((posts) => {

            this.setState({ posts })

        })


    }

    componentDidMount() {
        PostsAPI.getAll().then((posts) => {

            this.setState({ posts })

        })
    }




    render() {
       
        return (

            <div>

                <NavBarMy />
                <div className="add-post">
                    <Link to='/add'>Add Post</Link>
                </div>
                <ListPosts posts={this.state.posts} handlerRemovePost={this.handlerRemovePost} />

            </div>

        )
    }

}

export default Home