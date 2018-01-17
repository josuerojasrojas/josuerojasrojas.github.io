// props
// links: object key=name of links, value = link
// main_color: color when no hover
// hover_color: color when hover

import React, { Component } from 'react';
import '../styles/sass/simple-hidden-links.css';

class Link extends Component{
  constructor(props){
    super(props);
    this.state = {
      hover: false,
    }
    this.toggleHover = this.toggleHover.bind(this);
  }
  toggleHover(isHover){
    this.setState({hover: isHover});
  }
  render(){
    const color = this.state.hover ? this.props.hover_color : this.props.main_color;
    const styles = {
      link_button: {
        transition: '400ms',
        borderRadius: '5px',
        border: '1px solid ' + color,
        padding: '5px 7px',
        width: '90px',
        margin: '3px 5px',
        textDecoration: 'none',
        cursor: 'pointer',
        textAlign: 'center',
      },
      link_text: {
        transition: '800ms',
        color: color,
        zIndex: '2'
      }
    }
    return(
      <a
        style={styles.link_button}href={this.props.link}
        onMouseEnter={() => this.toggleHover(true)}
        onMouseLeave={() => this.toggleHover(false)}
      >
        <div style={styles.link_text}>{this.props.text}</div>
      </a>
    )
  }
}

export default class HiddenLinks extends Component{
  constructor(props){
    super(props);
    this.state = {
      isActive: false,
      maxHeight: Math.ceil(Object.keys(this.props.links).length / 2) * 40,
      iconHover: false,
    }
    this.handleClick = this.handleClick.bind(this);
    this.makeHiddenLinks = this.makeHiddenLinks.bind(this);
    this.handleIconHover = this.handleIconHover.bind(this);
  }

  handleClick(){
    this.setState({
      isActive: !this.state.isActive,
    })
  }

  makeHiddenLinks(link_pair, hover_color, main_color){
    let links = [];
    for(let key in this.props.links){
      links.push(
        <Link
          link={links[key]}
          text={key}
          hover_color={hover_color}
          main_color={main_color}
        />
      )
    }
    return links;
  }

  handleIconHover(hover){
    this.setState({iconHover: hover});
  }

  render(){
    const icon_color = this.state.iconHover ? this.props.hover_color : this.props.main_color;
    const styles = {
      links_wrapper: {
        maxHeight: this.state.isActive ? this.state.maxHeight +'px' : '0px',
      },
      icon_border: {
        border: '1px solid ' + icon_color,
      },
      icon: {
        marginTop: this.state.isActive ? '-2px': '3px',
        backgroundColor: icon_color,
        transform: this.state.isActive ? 'rotate(180deg)': 'rotate(0deg)',
      }
    }
    const links = this.makeHiddenLinks(styles.link_pair, this.props.hover_color, this.props.main_color);
    return(
      <div className='hidden-links-wrapper'>
        <div
          className='link-wrapper'
          style={styles.links_wrapper} >
          {links}
        </div>
        <div
          className='icon-border'
          style={styles.icon_border}
          onMouseEnter={() => this.handleIconHover(true)}
          onMouseLeave={() => this.handleIconHover(false)}
          onClick={this.handleClick} >
          <div className='icon' style={styles.icon}></div>
        </div>
      </div>
    )
  }
}
