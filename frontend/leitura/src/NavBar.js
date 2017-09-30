import React, { Component } from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom'


class NavBarMy extends Component {

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
       
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="#">MyPosts</a>
        </div>
    
       
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/">Home<span className="sr-only">(current)</span></Link></li>
            <li className="active"><Link to="/categories">Categories</Link></li>
                      
          </ul>
                  
        </div>
      </div>
    </nav>

      
    );
  }
}

export default NavBarMy;
