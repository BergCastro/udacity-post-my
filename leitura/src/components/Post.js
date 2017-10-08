import React, { Component } from 'react'
import * as PostsAPI from '../PostsAPI'
import Timestamp from 'react-timestamp'
import NavBarMy from './NavBar'
import Comment from './Comment'
import VoteScore from './VoteScore'
import sortBy from 'sort-by'
import Modal from 'react-modal';
import ModalEditComment from './ModalEditComment'
import AlertContainer from 'react-alert'


const customStyles = {
    content: {
        position: 'absolute',
        top: '60px',
        left: '250px',
        right: '250px',
        bottom: '250px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'
    }
};

class Post extends Component {


    state = {

        post: {},
        commentsLocal: [],
        body: '',
        author: '',
        modalIsOpen: false,
        titlePost: '',
        bodyPost: '',
        modalIsOpenComment: false,
        commentEditing: {},
        countBody: 100,
        alertSucess: false
    }


    categories = [
        'react',
        'redux',
        'udacity'
    ]
    alertOptions = {
        offset: 14,
        position: 'top right',
        theme: 'light',
        time: 2000,
        transition: 'scale'
    }

    componentDidMount() {
        const { id } = this.props
        console.log("valor id: " + id)
        PostsAPI.getPostById(id).then((post) => {
            PostsAPI.getCommentsByPost(id).then((comments) => {
                this.setState({
                    post,
                    commentsLocal: comments,
                    titlePost: post.title,
                    bodyPost: post.body

                })
            })


        })
    }

    showAlert = (text, type) => {
        this.msg.show(text, {
            time: 2000,
            type: type,

        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const parentId = this.state.post.id
        const body = this.state.body
        const author = this.state.author
        if(author === ''){
            this.showAlert("Author can't is empity", 'info')
        }
        if(body === ''){
            this.showAlert("Body can't is empity", 'info')
        }
        if(author !== '' && body !== ''){
            const id = Math.floor((Math.random() * 100000) + 1) + "";
            const newComment = {
                id: id,
                body: body,
                author: author,
                voteScore: 1,
                deleted: false
            }
    
    
            PostsAPI.addComment(id, parentId, body, author)
            this.showAlert('Comment added', 'success')
            this.setState({
                commentsLocal: [...this.state.commentsLocal,
                    newComment
                ],
                author: '',
                body: '',
                countBody: 100
    
            })
        }
        

    }

    handleAuthorChange = (event) => {
        this.setState({ author: event.target.value });
    }

    handleBodyChange = (event) => {
        const value = event.target.value
        const size = value.length
        if (size <= 100) {
            this.setState({
                body: value,
                countBody: 100 - size
            });
        } else {
            this.showAlert('only 100 caracters', 'info')
        }
    }

    handlerRemoveComment = (event) => {
        event.preventDefault()
        const id = event.target.id

        PostsAPI.removeComment(id)
        this.showAlert('Comment removed', 'success')
        this.setState({
            commentsLocal: this.state.commentsLocal.filter(comment => comment.id !== id)

        })

    }



    openModal = (event) => {
        event.preventDefault()
        this.setState({ modalIsOpen: true });
    }

    openModalEditComment = (event) => {
        event.preventDefault()
        const id = event.target.id

        console.log("id openModal: " + id)
        PostsAPI.getCommentById(id).then((comment) => {
            this.setState({
                modalIsOpenComment: true,
                commentEditing: comment
            })
        })

    }

    afterOpenModal = () => {

    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    closeModalEditComment = () => {
        this.setState({
            modalIsOpenComment: false
        });
    }

    updatePost = (event) => {
        event.preventDefault()
        const title = this.state.titlePost
        const body = this.state.bodyPost
        const id = this.state.post.id
        PostsAPI.updatePost(id, title, body)
        this.showAlert('Post edited', 'success')
        PostsAPI.getPostById(id).then((post) => {
            this.closeModal()
            this.setState({ post })

        })

    }

    updateComment = (event, id, body) => {
        event.preventDefault()
        const idPost = this.state.post.id
        PostsAPI.updateComment(id, body)
        this.showAlert('Comment edited', 'success')
        PostsAPI.getCommentsByPost(idPost).then((comments) => {
            this.closeModalEditComment()
            this.setState({ commentsLocal: comments })

        })

    }

    handleTitlePostChange = (event) => {
        this.setState({ titlePost: event.target.value });
    }

    handleBodyPostChange = (event) => {
        this.setState({ bodyPost: event.target.value });
    }

    render() {
        const { title, author, timestamp, body } = this.state.post
        const { commentsLocal } = this.state
        const commentsSorted = commentsLocal.sort(sortBy('-voteScore'))


        return (
            <div>
                <NavBarMy />
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-11">
                            <h1 className="mt-4">{title}</h1>
                        </div>
                        <div className="col-lg-1">
                            <button className="btn btn-primary btn-edit-post" onClick={this.openModal}>Edit</button>
                        </div>

                    </div>
                    <p className="lead">

                        {"by " + author}
                    </p>

                    <p>Posted on <Timestamp time={(timestamp) / 1000} /> </p>
                    <VoteScore entity={this.state.post} tipo={'post'} />
                    <hr />
                    <p className="lead">{body}</p>
                    <hr />
                    <div className="panel panel-default">
                        <div className="panel-heading">Leave a Comment:          </div>
                        <div className="panel-body">

                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="author-post">Author: </label>
                                    <input type="text" value={this.state.author} className=" form-control" id="author-post" onChange={this.handleAuthorChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="author-post">Body: </label> Characters remaining {this.state.countBody}
                                    <textarea className="form-control" value={this.state.body} rows="3" onChange={this.handleBodyChange}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>

                            </form>
                        </div>


                    </div>
                    <p>Comments: {commentsSorted.length}</p>
                    {commentsSorted.map((comment, index) => (

                        <Comment key={index}
                            indexRemove={index}
                            comment={comment}
                            handlerRemoveComment={this.handlerRemoveComment}
                            openModalEditComment={this.openModalEditComment} />


                    ))}


                    <br />
                    <br />

                </div>
                <div>

                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <h3>Editing Post</h3>


                    <form onSubmit={this.updatePost}>
                        <div className="form-group">
                            <label htmlFor="title-post">Title: </label>
                            <input type="text" value={this.state.titlePost} className="form-control" id="title-post" onChange={this.handleTitlePostChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="body-post">Body: </label>
                            <textarea value={this.state.bodyPost} className="form-control" id="body-post" rows="3" onChange={this.handleBodyPostChange}></textarea>
                        </div>
                        <div className="btn-toolbar">
                            <button type="submit" className="btn btn-primary">Save</button>
                            <button className="btn btn-primary" onClick={this.closeModal}>Cancel</button>
                        </div>
                    </form>
                </Modal>
                <ModalEditComment isOpen={this.state.modalIsOpenComment}
                    updateComment={this.updateComment}
                    closeModalEditComment={this.closeModalEditComment}
                    comment={this.state.commentEditing} />

            </div>

        )


    }
}

export default Post