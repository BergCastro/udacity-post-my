import React, { Component } from 'react'
import NavBarMy from './NavBar';
import ListPosts from './ListPosts';
import * as PostsAPI from './PostsAPI'



class ByCategory extends Component {

    state = {
        category: '',
        posts: []

    }
    categories = [
        'all',
        'react',
        'redux',
        'udacity'
    ]

    componentDidMount() {

        PostsAPI.getAll().then((posts) => {

            this.setState({ posts })

        })
    }
    handleCategoryChange = (event) => {
        const category = event.target.value
        if (category === 'all') {
            PostsAPI.getAll().then((posts) => {

                this.setState({ posts, category })

            })
        } else {
            PostsAPI.getPostsByCategory(category).then((posts) => {

                this.setState({ posts, category })

            })
        }
    }

    render() {
        return (
            <div>
                <NavBarMy />
                <div className='container'>
                    <div className='row'>
                        <div className="form-group">
                            <label htmlFor="categories-post">Category: </label>
                            <select value={this.state.category} className="form-control" onChange={this.handleCategoryChange}>
                                {this.categories.map((category) => (
                                    <option key={category}>{category}</option>
                                )
                                )}

                            </select>
                        </div>
                    </div>
                </div>
                <ListPosts posts={this.state.posts} />
               
            </div>
        )
    }
}

export default ByCategory