import React, { Component } from 'react';
import '../styles/sass/Chevron-Button.css';

export default class ChevronButton extends Component{
  render(){
    const styles = {
      icon_border: {
        marginTop: this.props.isActive ? '7px' : '0px',
      },
      icon: {
        marginTop: this.props.isActive ? '-3px': '3px',
        transform: this.props.isActive ? 'rotate(180deg)': 'rotate(0deg)',
      }
    }
    return(
      <div
        className='icon-border chevron-down'
        style={styles.icon_border}
        onClick={this.props.onClick} >
        <div className='icon' style={styles.icon}></div>
      </div>
    )
  }
}
