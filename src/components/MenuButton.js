import React, { Component } from 'react';
import '../styles/sass/MenuButton.css';

// this component acts as both X and dot icons for the SideMenu
// determined by prop isX
export default class MenuButton extends Component {
  render() {
    return(
      <div className={'DotButton-wrapper ' + this.props.isX + ' ' +  (this.props.isActive ? 'active' : '')} onClick={this.props.handleClick}>
        <div className='DotButton'>
          <div />
          <div />
          <div />
        </div>
      </div>
    )
  }
}
