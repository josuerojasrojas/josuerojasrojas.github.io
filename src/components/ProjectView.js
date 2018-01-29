import React, { Component } from 'react';
import ProjectBox from './ProjectBox.js';
import '../styles/sass/ProjectView.css';
import all_projects from '../data/data.json';



export default class ProjectView extends Component{
  fetchData(){
    console.log(all_projects['repos'][2]['languages']);
  }
  makeProjectBoxes(){
    let projectBox = [];
    for(let project of all_projects['repos']){
      console.log(project['languages'])
      projectBox.push(
        <ProjectBox
          key={project['repo_name']}
          languages={project['languagesList']}
          title={project['repo_name']}
          date={project['created']}
          description={project['description']}
        />
      )
    }
    return projectBox;
  }
  render(){
    this.fetchData();
    const projectBox = this.makeProjectBoxes();
    return (
    <div className='projects-view'>
      {projectBox}
    </div>)
  }
}
