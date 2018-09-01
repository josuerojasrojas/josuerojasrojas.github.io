import React, { Component } from 'react';
import '../styles/sass/ProjectBox.css';
import LanguageCircle from './LanguageCircle';

class Dash extends Component{
  render(){
    const styles = {
      icon: {
        backgroundColor: this.props.isActive ? '#05fbff' : '',
      }
    }
    return(
      <div className='icon-border dash'>
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
  }

  render(){
    const projectLink = this.props.projectLink !== '#' ? <a href={this.props.projectLink} target='_blank' className='icon-border link'><div className='icon'></div></a> : '';
    const githubLink = this.props.url !== '#' ? (<a href={this.props.url} target='_blank' className='icon-border octo'><div className='icon'></div></a>) : '';


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
            <p>{this.props.description}</p>
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
