import React, {Component} from 'react'
import AlertContainer from 'react-alert'
 
export default class Alert extends Component {
  alertOptions = {
    offset: 14,
    position: 'bottom right',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
  }
 
  showAlert = () => {
    this.msg.show('Some text or component', {
      time: 2000,
      type: 'success',
      icon: <img src="path/to/some/img/32x32.png" />
    })
  }
 
  render () {
    return (
      <div>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
        <button onClick={this.showAlert}>Show Alert</button>
      </div>
    )
  }
}