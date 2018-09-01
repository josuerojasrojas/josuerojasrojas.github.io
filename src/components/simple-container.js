// simmilar to simple-card but bigger (wider) for projects if not for something else.... maybe
import React, { Component } from 'react';
import '../styles/sass/simple-container.css';

export default class SimpleContainer extends Component {
  componentDidMount() {
    document.title = this.props.title;
  }

  render() {
    return(
      <div className='simple-container view'>
        <div className='top-wrapper'>
          <span className='title'>{this.props.box_title}</span>
          <div onClick={()=>window.location='#'} className='close-btn-wrapper'><div></div><div></div></div>
        </div>
        {this.props.children}
      </div>
    )
  }
}
