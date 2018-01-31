import React, { Component } from 'react';
import '../styles/sass/ProjectBox.css';
class LanguageCircle extends Component{
  render(){
    const className = 'language-circle ' +  this.props.language;
    return(
      <span className={className}></span>
  )}
}

class Dash extends Component{
  render(){
    const styles = {
      icon_border: {
        transform: this.props.isActive ? 'rotate(180deg)': 'rotate(0deg)',
        bottom: this.props.isActive ? 'calc(100% - 30px)' : '10px',
      },
      icon: {
        backgroundColor: this.props.isActive ? '#05fbff' : '',
      }
    }
    return(
      <div
        className='icon-border dash'
        style={styles.icon_border}>
        <div className='icon' style={styles.icon}></div>
      </div>
    )
  }
}

export default class ProjectBox extends Component{
  constructor(props){
    super(props);
    this.state = {
      showing: false,
    }
    this.activeBox = this.activeBox.bind(this);
  }

  makeLangCircles(langs){
    let langCir = [];
    for(let l of langs){
      langCir.push(<LanguageCircle language={l}/>);
    }
    return langCir;
  }

  activeBox(e){
    this.setState({
      showing: !this.state.showing,
    })
    // e.stopPropagation();
    // e.preventPropagation();
  }

  render(){
    const projectLink = this.props.projectLink !== '#' ? <a href={this.props.projectLink} className='icon-border link'><div className='icon'></div></a> : '';
    const githubLink = this.props.url !== '#' ? (<a href={this.props.url} className='icon-border octo'><div className='icon'></div></a>) : '';


    const date = new Date(this.props.date)
    return (
      <div className={'project-box ' + (this.state.showing ? ' showing': '')} onClick={this.activeBox} >
        <div className='information'>
          <div className='languages'>
            {this.makeLangCircles(this.props.languages)}
          </div>
          <div className='title'>
            {this.props.title}
          </div>
          <div className='date'>
            Date Created {date.getFullYear() + '-' + ( (date.getMonth()+1 > 9) ? (date.getMonth()+1) : '0' + (date.getMonth()+1)) + '-' + ( (date.getDate() > 9) ? (date.getDate()) : '0'  + (date.getDate() + 1))}
          </div>
          <div className='description'>
            {this.props.description}
          </div>
        </div>
        <Dash isActive={this.state.showing}/>
        <div className='show-box'>
          {githubLink}
          {projectLink}
        </div>
      </div>
    )
  }
}
