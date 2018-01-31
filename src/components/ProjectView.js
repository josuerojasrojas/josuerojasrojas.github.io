import React, { Component } from 'react';
// components needed
import ProjectBox from './ProjectBox.js';
import HamburgerMenu from './HamburgerMenu';
import LinkButton from './Link-Button';
// extra sass and data
import '../styles/sass/ProjectView.css';
import all_projects from '../data/data.json';

class SearchBar extends Component{
  constructor(props){
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleSearch(event){
    this.props.changeSearch(event);
  }
  // https://stackoverflow.com/questions/31272207/to-call-onchange-event-after-pressing-enter-key
  handleKeyPress(e){
    if (e.key === 'Enter') {
      this.props.handleEnterPress();
    }
  }
  render(){
    return(
      <input className='search-bar' type='text' placeholder='Search Bar' onChange={this.handleSearch} value={this.props.value} onKeyPress={this.handleKeyPress}/>
    )
  }
}

class LanguageSearchButton extends Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    this.props.handleClick(this.props.language);
  }
  render(){
    return(
      <div className='language-search' onClick={this.handleClick}>
        {this.props.language} <div className={'language-circle ' + this.props.language}></div>
      </div>
    )
  }
}

export default class ProjectView extends Component{
  constructor(props){
    super(props);
    this.state = {
      current: 0,
      total_projects: all_projects['repos'].length,
      project_array: [],
      view_project: Array(all_projects['repos'].length).fill(''), // projects that will show up
      search: '',
      menuActive: false,
    }
    this.addProjectBox = this.addProjectBox.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.menuClick = this.menuClick.bind(this);
    this.handleLanguageClick = this.handleLanguageClick.bind(this);
  }

  componentDidMount(){
    document.title = "Josue's Projects"
    this.timer = setInterval(this.addProjectBox, 10);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  addProjectBox(){
    if(this.state.current === this.state.total_projects){
      return clearInterval(this.timer)
    }
    const project = all_projects['repos'][this.state.current];
    const project_array = this.state.project_array.slice();
    project_array.push(
      <ProjectBox
        key={project['repo_name']}
        languages={project['languagesList']}
        title={project['repo_name']}
        date={project['created']}
        description={project['description']}
        url={project['url']}
        projectLink={project['projectLink']}/>
    );
    const view_project = project_array.slice();
    this.setState({
      project_array: project_array,
      view_project: view_project,
      current: this.state.current+1,
    });
  }

  // need better search
  handleSearch(event, exact_match=false){
    const view_project = this.state.view_project.slice();
    let added = false;
    console.log(event)
    for(let i = 0; i < all_projects['repos'].length; i++){
      for(let lang of all_projects['repos'][i]['languagesList']){
        const search_check = exact_match ? lang.toLowerCase() === event.target.value.toLowerCase() : lang.toLowerCase().includes(event.target.value.toLowerCase());
        if(search_check){
         view_project[i] = this.state.project_array[i];
         added = true;
         break;
        }
      }
      if(!added){
        view_project[i] = '';
      }
      added = false;
    }
    this.setState({
      search: event.target.value,
      view_project: view_project
    })
  }

  menuClick(){
    this.setState({menuActive: !this.state.menuActive})
  }

  makeLanguageSearchButtons(){
    const langSearch = [];
    for(let lang of all_projects['languages']){
      langSearch.push(<LanguageSearchButton
        language={lang}
        handleClick={this.handleLanguageClick}/>);
    }
    return langSearch;
  }

  handleLanguageClick(language){

    this.handleSearch({target:{value:language}}, true);
    this.setState({
      menuActive: false,
    })
  }


  render(){
    // <LinkButton link='/#' text='Home'/>
    const menuStuff = (
      <div className='menu-stuff'>
        <a href='/#'><div className='home'></div></a>
        <SearchBar
          handleEnterPress={this.menuClick}
          changeSearch={this.handleSearch}
          value={this.state.search}/>
        {this.makeLanguageSearchButtons()}
      </div>)
    return (
      <div className={'projects-view ' + (this.state.menuActive ? 'active-menu' : '')}>
        <HamburgerMenu
          active={this.state.menuActive}
          onClick={this.menuClick}
          menuStuff={menuStuff}/>
        <div className='projects-wrapper'>
          {this.state.view_project}
        </div>
      </div>
  )
  }
}
