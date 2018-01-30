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
  }
  handleSearch(event){
    this.props.changeSearch(event);
  }
  render(){
    return(
      <input className='search-bar' type='text' placeholder='Search Bar' onChange={this.handleSearch} value={this.props.value}/>
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
      />
    );
    const view_project = project_array.slice();
    this.setState({
      project_array: project_array,
      view_project: view_project,
      current: this.state.current+1,
    });
  }

  // need better search
  handleSearch(event){
    const view_project = this.state.view_project.slice();
    let current = 0;
    let added = false;
    for(let i = 0; i < all_projects['repos'].length; i++){
      for(let lang of all_projects['repos'][i]['languagesList']){
        if(lang.toLowerCase().includes(event.target.value.toLowerCase())){
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

  render(){
    const menuStuff = (
      <div className='menu-stuff'>
        <LinkButton link='/#' text='Home'/>
        <SearchBar changeSearch={this.handleSearch} value={this.state.search}/>
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
