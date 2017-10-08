import React, { Component } from 'react'
import Modal from 'react-modal'

const customStyles = {
    content: {
        position: 'absolute',
        top: '10%',
        left: '20%',
        right: '20%',
        bottom: '15%',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'
    }
};

class ModalAddPost extends Component {
   
    state = {
        title: '',
        author: '',
        category: '',
        body: ''


    }
    categories = [
        'react',
        'redux',
        'udacity'
    ]

    

    afterOpenModal = () => {
        this.title.focus()
    }

    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }
    handleAuthorChange = (event) => {
        this.setState({ author: event.target.value });
    }
    
    handleCategoryChange = (event) => {
        this.setState({ category: event.target.value });
    }
    handleBodyChange = (event) => {
        this.setState({ body: event.target.value });
    }

    cleanInputs = (event) => {
        event.preventDefault()
        this.setState({
            title: '',
            author: '',
            category: '',
            body: ''
        })    
    }

    submitPost = (event) => {
        event.preventDefault()
        const { handleSubmit } = this.props
        const newPost = {
            title: this.state.title,
            author: this.state.author,
            category: this.state.category,
            body: this.state.body
        }
        this.cleanInputs(event)
        
        handleSubmit(event, newPost)

    }

    

    render() {
        const { isOpen , closeModal, handleSubmit } = this.props
        return (
            <Modal
                isOpen={isOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <h3>Add Post</h3>


                <form onSubmit={this.submitPost}>
                    <div className="form-group">
                        <label htmlFor="title-post">Title: </label>
                        <input ref={title => this.title = title} type="text" value={this.state.title} className="form-control" id="title-post" onChange={this.handleTitleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author-post">Author: </label>
                        <input type="text" value={this.state.author} className="form-control" id="author-post" onChange={this.handleAuthorChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="categories-post">Category: </label>
                        <select className="form-control" value={this.state.category} onChange={this.handleCategoryChange}>
                            <option>Selecione uma opção</option>
                            {this.categories.map((category) => (

                                <option key={category}>{category}</option>
                            )
                            )}

                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="body-post">Body: </label>
                        <textarea value={this.state.body} className="form-control" id="body-post" rows="3" onChange={this.handleBodyChange}></textarea>
                    </div>
                    <div className="btn-toolbar">
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button className="btn btn-primary" onClick={closeModal}>Cancel</button>
                        <button  className="btn btn-primary" onClick={this.cleanInputs}>Reset</button>
                    </div>
                </form>
            </Modal>
        )
    }
}

export default ModalAddPost