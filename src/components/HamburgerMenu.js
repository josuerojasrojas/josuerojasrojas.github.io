import React, { Component } from 'react';
import '../styles/sass/HamburgerMenu.css';

export default class HamburgerMenu extends Component{
  render(){
    const activeClass = this.props.active ? 'active' : '';
    return(
      <div>
        <div className={'hamburger-menu ' + activeClass} onClick={this.props.onClick}>
          <div className="line top"></div>
          <div className="line mid"></div>
          <div className="line bottom"></div>
        </div>
        <div className={'menu ' + activeClass}>
          {this.props.menuStuff}
        </div>
      </div>
    )
  }
}
