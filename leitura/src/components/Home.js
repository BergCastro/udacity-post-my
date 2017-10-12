import React, { Component } from 'react'
import NavBarMy from './NavBar';
import ListPosts from './ListPosts';
import ModalAddPost from './ModalAddPost'
import AlertContainer from 'react-alert'
import { connect } from 'react-redux'
import { fetchPosts, addPost } from '../actions/post';




class Home extends Component {

    

    state = {
        modalIsOpen: false
    }

    alertOptions = {
        offset: 14,
        position: 'top right',
        theme: 'light',
        time: 2000,
        transition: 'scale'
    }

   

    componentWillMount() {
       
           this.props.fetchPosts()
       
    }
    openModal = (event) => {
        event.preventDefault()
        this.setState({ modalIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }



    render() {
       const { posts, showAlert } = this.props
        
        return (
            <div>

                <NavBarMy />
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                <div className="add-post">
                    <a href='' onClick={this.openModal}>Add Post</a>
                </div>
               
                    <ListPosts posts={posts} showAlert={showAlert} />
                    
                <ModalAddPost isOpen={this.state.modalIsOpen} closeModal={this.closeModal} addPost={this.props.addPost} showAlert={showAlert} />

            </div>

        )
    }

}

const mapStateToProps = state => ({
    posts: state.posts

});


const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts()),
    addPost: (title, author, category, body) => dispatch(addPost(title, author, category, body))
  });

export default connect(mapStateToProps, mapDispatchToProps)(Home) 