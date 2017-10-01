import React, { Component } from 'react';
import './css/blog-post.css';
import Home from './components/Home'
import AddPost from './components/AddPost'
import ByCategory from './components/ByCategory'
import Post from './components/Post'

import { Route } from 'react-router-dom'

class App extends Component {

  render() {
    const PostId = ({ match }) => {
      return <Post id={match.params.id} />
    }
    return (
      <div>
        <Route exact path='/' render={() => (
          <Home />
        )} />


        <Route exact path='/add' render={() => (
          <AddPost />
        )} />

        <Route exact path='/categories' render={() => (
          <ByCategory />
        )} />

        <Route path='/post/:id' component={PostId} />

      </div>

    )
  }
}

export default App;
