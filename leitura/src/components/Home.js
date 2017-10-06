import React, { Component } from 'react'
import NavBarMy from './NavBar';
import ListPosts from './ListPosts';
import * as PostsAPI from '../PostsAPI'
import { Link } from 'react-router-dom'
import ModalAddPost from './ModalAddPost'
import AlertContainer from 'react-alert'



class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            modalIsOpen: false,


        }

    }

    alertOptions = {
        offset: 14,
        position: 'top right',
        theme: 'light',
        time: 2000,
        transition: 'scale'
    }

    showAlert = (text, type) => {
        this.msg.show(text, {
            time: 2000,
            type: type,

        })
    }

    handlerRemovePost = (event) => {
        event.preventDefault()
        const id = event.target.id
        PostsAPI.removePost(id)
        this.showAlert('Post removed', 'success')
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
        const { title, body, author, category } = post
        PostsAPI.addPost(title, body, author, category)
        this.showAlert('Post add', 'success')
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
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                <div className="add-post">
                    <a href='' onClick={this.openModal}>Add Post</a>
                </div>
                <ListPosts posts={this.state.posts} handlerRemovePost={this.handlerRemovePost} />
                <ModalAddPost isOpen={this.state.modalIsOpen} closeModal={this.closeModal} handleSubmit={this.handleSubmit} />
            </div>

        )
    }

}

export default Home