import React, { Component } from 'react';
import '../styles/sass/Link-Button.css';

export default class LinkButton extends Component{
  render(){
    return(
      <a
        className='link-button'
        href={this.props.link}>
        <div className='link-text'>{this.props.text}</div>
      </a>
    )
  }
}
