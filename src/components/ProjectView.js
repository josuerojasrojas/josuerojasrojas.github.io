import React, { Component } from 'react';
import ProjectBox from './ProjectBox';
import SideMenu from './SideMenu';
import MenuButton from './MenuButton';
import '../styles/sass/ProjectView.css';
import all_projects from '../data/data.json';

export default class ProjectView extends Component{
  constructor(props){
    super(props);
    // language categories/indexing
    // this should be made somewhere else....
    const lang_search = {};
    lang_search['All'] = []; //all category
    for(let i = 0; i < all_projects['languages'].length; i++){
      lang_search[all_projects['languages'][i]] = [];
    }
    this.state = {
      current: 0,
      total_projects: all_projects['repos'].length,
      lang_search: lang_search,
      lang_view: 'All',
      menuActive: false,
    }
    this.addProjectBox = this.addProjectBox.bind(this);
    this.filterLanguage = this.filterLanguage.bind(this);
    this.menuTrigger = this.menuTrigger.bind(this);
  }

  componentDidMount() {
    document.title = "Josue's Projects";
    this.timer = setInterval(this.addProjectBox, 10);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  // while adding each project this also adds them in the language category (indexing sort of) for faster searching/switching
  addProjectBox(){
    if(this.state.current === this.state.total_projects)
      return clearInterval(this.timer)
    const project = all_projects['repos'][this.state.current];
    const project_box = (<ProjectBox
      key={project['repo_name']}
      languages={project['languagesList']}
      title={project['repo_name']}
      date={project['created']}
      description={project['description']}
      url={project['url']}
      projectLink={project['projectLink']}/>)
    // bad habit to change state.............
    this.state.lang_search['All'].push(project_box);
    for(let i = 0; i < project['languagesList'].length; i++){
      this.state.lang_search[project['languagesList'][i]].push(project_box);
    }
    this.setState({
      current: this.state.current+1,
    });
  }

  filterLanguage(language){
    this.setState({
      lang_view: language,
      menuActive: false,
    });
  }

  menuTrigger(active) {
    this.setState({menuActive: active})
  }

  render(){
    return(
      <div>
        <MenuButton
          isX={false}
          isActive={this.state.menuActive}
          handleClick={()=>this.menuTrigger(true)}/>
        <SideMenu
          languages={all_projects['languages']}
          active_lang={this.state.lang_view}
          languageSquareClick={this.filterLanguage}
          isActive={this.state.menuActive}
          closeMenu={this.menuTrigger}/>
        <div className={'projects-view ' + this.state.menuActive}>
          <div className='projects-wrapper'>
            {this.state.lang_search[this.state.lang_view]}
          </div>
        </div>
      </div>
    )
  }
}
