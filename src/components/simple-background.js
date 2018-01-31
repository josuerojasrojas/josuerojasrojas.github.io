// this component is a background with a dark shade laid over it
import React, { Component } from 'react';
import '../styles/sass/simple-background.css';


export default class SimpleBackground extends Component {
  render(){
    const style = {
      backgroundImage: 'url('+ this.props.backgroundImage + ')',
    }
    return(
      <div className={this.props.active ? 'simple-background-wrapper active' : 'simple-background-wrapper'}>
        <div
          className='background'
          style={style}></div>
        <div className='shade'></div>
      </div>
    )
  }
}
