// this component is a background with a dark shade laid over it
import React, { Component } from 'react';
import '../styles/sass/simple-background.css';


export default class SimpleBackground extends Component {
  render(){
    return(
      <div className='simple-background-wrapper'>
        <div
          className='background'
          style={{backgroundImage: 'url('+ this.props.backgroundImage + ')'}}></div>
        <div className='shade'></div>
      </div>
    )
  }
}
