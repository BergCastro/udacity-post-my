import React, { Component } from 'react'
import NavBarMy from './NavBar';
import ListPosts from './ListPosts';
import * as PostsAPI from '../PostsAPI'
import { Link } from 'react-router-dom'
import ModalAddPost from './ModalAddPost'



class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            modalIsOpen: false,


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

    openModal = (event) => {
        event.preventDefault()
        this.setState({ modalIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    handleSubmit = (event, post) => {
        console.log("Entrou no handle Home")
        const { title , body, author, category} = post
        PostsAPI.addPost(title, body, author, category)
        PostsAPI.getAll().then((posts) => {
            
                        this.setState({ 
                            posts,
                            modalIsOpen: false
                         })
            
                    })

    }



    render() {
       
        return (

            <div>

                <NavBarMy />
                <div className="add-post">
                    <a href='' onClick={this.openModal}>Add Post</a>
                </div>
                <ListPosts posts={this.state.posts} handlerRemovePost={this.handlerRemovePost} />
                <ModalAddPost isOpen={this.state.modalIsOpen} closeModal={this.closeModal} handleSubmit={this.handleSubmit}/>
            </div>

        )
    }

}

export default Home