import React, { Component } from 'react'
import Post from './Post.js'
import Search from './Search.js'
import Categories from './Categories.js'

class PageContent extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Post />
                    <div className="col-md-4">
                        <Search />
                        <Categories />

                    </div>

                </div>


            </div>



        )
    }

}

export default PageContent