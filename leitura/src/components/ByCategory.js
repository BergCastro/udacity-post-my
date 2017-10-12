import React, { Component } from 'react'
import NavBarMy from './NavBar';
import ListPosts from './ListPosts';
import * as PostsAPI from '../PostsAPI'
import { connect } from 'react-redux'
import { fetchPosts } from '../actions/post';




class ByCategory extends Component {

    state = {
        category: 'all',
    }

    componentWillMount() {
        this.props.fetchPosts()
    }

    

    handleCategoryChange = (event) => {
        event.preventDefault()
        const category = event.target.value

        this.setState({ category })

    }

    

    render() {
        const { posts, alertOptions, categories, showAlert } = this.props
        const { category } = this.state
        let postsByCategory = []
        if (category !== 'all') {
            postsByCategory = posts.filter((post) => post.category === this.state.category)
        } else {
            postsByCategory = posts
        }
        return (
            <div>
                <NavBarMy />
                
                <div className='container'>
                    <div className='row'>
                        <div className="form-group">
                            <label htmlFor="categories-post">Category: </label>
                            <select value={this.state.category} className="form-control" onChange={this.handleCategoryChange}>
                                {categories.map((category) => (
                                    <option key={category}>{category}</option>
                                )
                                )}

                            </select>
                        </div>
                    </div>
                </div>
                <ListPosts posts={postsByCategory} showAlert={showAlert} />

            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts,
    categories: state.categories
    
});



//const mapDispatchToProps = dispatch => bindActionCreators({getPosts, fetchPosts}, dispatch)
const mapDispatchToProps = dispatch => ({
    fetchPosts: () => dispatch(fetchPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(ByCategory)