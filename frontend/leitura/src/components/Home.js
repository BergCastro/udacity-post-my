import React, { Component } from 'react'
import NavBarMy from './NavBar';
import ListPosts from './ListPosts';
import * as PostsAPI from '../PostsAPI'
import { Link } from 'react-router-dom'


class Home extends Component {

    state = {

        posts: []
        

    }

    componentDidMount() {
        PostsAPI.getAll().then((posts) => {
           
            this.setState({ posts })

        })
    }

    handlerRemovePost = (event) => {
        const id = event.target.id
        PostsAPI.removePost(id)
        PostsAPI.getAll().then((posts) => {
            
            this.setState({ posts })

        })
      
        
    }

    render() {
        console.log('home renderizado')
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