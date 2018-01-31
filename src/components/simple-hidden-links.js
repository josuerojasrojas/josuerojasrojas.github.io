// props
// links: object key=name of links, value = link
// main_color: color when no hover
// hover_color: color when hover

import React, { Component } from 'react';
import ChevronButton from './Chevron-Button';
import LinkButton from './Link-Button';
import '../styles/sass/simple-hidden-links.css';


export default class HiddenLinks extends Component{
  constructor(props){
    super(props);
    this.state = {
      isActive: false,
      maxHeight: Math.ceil(Object.keys(this.props.links).length / 2) * 50,
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

  makeHiddenLinks(links_obj, hover_color, main_color){
    let links = [];
    for(let key in links_obj){
      links.push(
        <LinkButton
          link={links_obj[key]}
          text={key}/>
        )
    }
    return links;
  }

  handleIconHover(hover){
    this.setState({iconHover: hover});
  }

  render(){
    const styles = {
      links_wrapper: {
        maxHeight: this.state.isActive ? this.state.maxHeight +'px' : '0px',
      },
    }
    const links = this.makeHiddenLinks(this.props.links, this.props.hover_color, this.props.main_color);
    return(
      <div className='hidden-links-wrapper'>
        <div
          className='link-wrapper'
          style={styles.links_wrapper} >
          {links}
        </div>
        <ChevronButton
          onClick={this.handleClick}
          isActive={this.state.isActive}/>
      </div>
    )
  }
}
