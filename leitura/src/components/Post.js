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
import { connect } from 'react-redux'
import { addComment, removeComment, updateComment } from '../actions/comment';
import { fetchComments, updatePost } from '../actions/post';


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
    

    componentWillMount() {
        const { id } = this.props
        this.props.fetchComments(id)

    }

    

    handleSubmit = (event) => {
        event.preventDefault()
        const parentId = this.props.post.id
        const body = this.state.body
        const author = this.state.author
        if(author === ''){
            this.props.showAlert("Author can't is empity", 'info')
        }
        if(body === ''){
            this.props.showAlert("Body can't is empity", 'info')
        }
        if(author !== '' && body !== ''){
         
            
            this.props.addComment(parentId, body, author)
            this.props.showAlert('Comment added', 'success')
            //this.props.fetchComments(parentId)
            this.setState({
                
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
            this.props.showAlert('only 100 caracters', 'info')
        }
    }

    handlerRemoveComment = (event) => {
        event.preventDefault()
        const id = event.target.id

        this.props.removeComment(id)
        this.props.showAlert('Comment removed', 'success')
       // this.props.fetchComments(this.props.post.id)

    }



    openModal = (event) => {
        event.preventDefault()
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal = () => {
        const { post } = this.props
        this.setState({
            titlePost: post.title,
            bodyPost: post.body
        })
    }

    openModalEditComment = (event) => {
        event.preventDefault()
        const id = event.target.id
        PostsAPI.getCommentById(id).then((comment) => {
            this.setState({
                modalIsOpenComment: true,
                commentEditing: comment
            })
        })

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
        const { titlePost, bodyPost } = this.state
        const title = titlePost
        const body = bodyPost
        const id = this.props.post.id
        this.closeModal()
        this.props.updatePost(id, title, body)
        this.props.showAlert('Post edited', 'success')
      
    }

    updateComment = (event, id, body) => {
        event.preventDefault()
        this.props.updateComment(id, body)
        this.props.showAlert('Comment edited', 'success')
        this.closeModalEditComment()
        
    }

    handleTitlePostChange = (event) => {
        this.setState({ titlePost: event.target.value });
    }

    handleBodyPostChange = (event) => {
        this.setState({ bodyPost: event.target.value });
    }

    render() {
        const { title, author, timestamp, body } = this.props.post
        const { comments } = this.props
        const commentsSorted = comments.filter((comment) => comment.deleted === false).sort(sortBy('-voteScore'))
        
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
                    <VoteScore entity={this.props.post} tipo={'post'} />
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
const mapStateToProps = state => ({
    post: state.postCurrent,
    comments: state.commentsPost

});

const mapDispatchToProps = dispatch => ({
    fetchComments: (id) => dispatch(fetchComments(id)),
    addComment: (parentId, body, author) => dispatch(addComment(parentId, body, author)),
    removeComment: (id) => dispatch(removeComment(id)),
    updateComment: (id, body) => dispatch(updateComment(id, body)),
    updatePost: (id, title, body) => dispatch(updatePost(id, title, body))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post)