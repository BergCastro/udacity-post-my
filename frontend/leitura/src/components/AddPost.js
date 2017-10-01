import React, { Component } from 'react'
import NavBarMy from './NavBar';
import * as PostsAPI from '../PostsAPI'



class AddPost extends Component {

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


    handleSubmit = (event) => {
        const title = this.state.title
        const body = this.state.body
        const author = this.state.author
        const category = this.state.category
        PostsAPI.addPost(title, body, author, category)


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

    render() {
        console.log(this.state.categories)
        return (

            <div>
                <NavBarMy />
                <div className='container'>


                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title-post">Title: </label>
                            <input type="text" value={this.state.title} className="form-control" id="title-post" onChange={this.handleTitleChange} />
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
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Submit</button>
                           
                        </div>
                    </form>
                </div>

                
            </div>
        )
    }
}

export default AddPost