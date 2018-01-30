import React, { Component } from 'react';
import ProjectBox from './ProjectBox.js';
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
      // missing: 0, // missing is when filter pops a project out
      total_projects: all_projects['repos'].length,
      project_array: [],
      view_project: Array(all_projects['repos'].length).fill(''), // projects that will show up
      search: '',
    }
    this.addProjectBox = this.addProjectBox.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    // this.handleBoxFilter = this.handleBoxFilter.bind(this);
  }

  componentDidMount(){
    document.title = "Josue's Projects"
    this.timer = setInterval(this.addProjectBox, 10);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  addProjectBox(){
    // console.log('hello')
    if(this.state.current === this.state.total_projects){
      // this.handleSearch()
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
    // console.log(event.target.value)
    const view_project = this.state.view_project.slice();
    let current = 0;
    let added = false;
    for(let project of all_projects['repos']){
     for(let lang of project['languagesList']){
       if(lang.toLowerCase().includes(event.target.value.toLowerCase())){
        view_project[current] = this.state.project_array[current];
        added = true;
         break;
       }
     }
     if(!added){
       // console.log(current)
       view_project[current] = '';
     }
     added = false;
     current++;
   }
    this.setState({
      search: event.target.value,
      view_project: view_project
    })
  }

  render(){
    return (
    <div className='projects-view'>
      <SearchBar changeSearch={this.handleSearch} value={this.state.search}/>
      <div className='projects-wrapper'>
        {this.state.view_project}
      </div>
    </div>
  )
  }
}
