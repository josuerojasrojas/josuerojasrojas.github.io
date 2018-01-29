import React, { Component } from 'react';
import '../styles/sass/ProjectBox.css';

class LanguageCircle extends Component{
  render(){
    const className = 'language-circle ' +  this.props.language;
    return(
      <span className={className}></span>
  )}
}

export default class ProjectBox extends Component{
  constructor(props){
    super(props);
  }
  makeLangCircles(langs){
    let langCir = [];
    for(let l of langs){
      langCir.push(<LanguageCircle language={l}/>);
    }
    return langCir;
  }
  render(){
    const date = new Date(this.props.date)
    return (
      <div className='project-box'>
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
    )
  }
}
