import React, { Component } from 'react';
import './css/blog-post.css';
import Home from './components/Home'
import ByCategory from './components/ByCategory'
import Post from './components/Post'
import AlertContainer from 'react-alert'
import NoFound from './components/NoFound'


import { Route, Switch } from 'react-router-dom'

class App extends Component {
  
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

  render() {
    const PostId = ({ match }) => {
      return <Post showAlert={this.showAlert} category={match.params.category} id={match.params.id} />
    }
   

    return (
      
      
      
      
      <div>
      
      <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
      <Switch>
        <Route exact path='/' render={() => (
          <Home showAlert={this.showAlert} />
        )} />

        <Route exact path='/categories' render={() => (
          <ByCategory showAlert={this.showAlert} />
        )} />

        <Route path='/:category/:id' component={PostId} />
        <Route component={NoFound}/>
        </Switch>
       
      </div>
      
        
    )
  }
}


export default App;
