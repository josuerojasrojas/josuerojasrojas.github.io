// simmilar to simple-card but bigger (wider) for projects if not for something else.... maybe
import React, { Component } from 'react';
import RoundIcon from './round-icons';
import Github from '../images/svg/Github_simple_icon.svg';
import '../styles/sass/simple-container.css';
import ProjectBox from './ProjectBox';
import LanguageCircle from './LanguageCircle';
import all_projects from '../data/data.json';

export default class SimpleContainer extends Component {
  componentDidMount() {
    document.title = "Josue's Projects";
  }

  addProjectBox(repos) {
    const project_box = [];
    for(let repo of repos){
      project_box.push(
        <ProjectBox
          key={repo['name']}
          languages={repo['languagesList']}
          title={repo['name']}
          date={repo['created_at']}
          description={repo['description']}
          url={repo['url']}
          projectLink={repo['projectLink']}/>
      )
    }
    return project_box;
  }

  makeLangCircles(langs) {
    let langCir = [];
    for(let l of langs){
      // might cause error (not show) if the sass for language-circles doesnt exist maybe make language circles have option for links
      langCir.push(<a className={`language-circle ${l}`} href={`https://github.com/josuerojasrojas?utf8=✓&tab=repositories&language=${l}`}></a>);
    }
    return langCir;
  }

  render() {
    return(
      <div className='simple-container view'>
        <div className='top-wrapper'>
          <span className='title'>Featured Projects</span>
          <div onClick={()=>window.location='#'} className='close-btn-wrapper'><div></div><div></div></div>
        </div>
        <div className='project-boxes'>
          {this.addProjectBox(all_projects['repos'])}
        </div>
        <div className='container-footer'>
          <div className='text'>Check out more at</div>
          <RoundIcon
            key={'simple-container github'}
            icon={Github}
            main_color={this.props.main_color}
            hover_color={this.props.hover_color}
            link={'https://github.com/josuerojasrojas'}
            />
          <div className='language-search-bar'>
            {this.makeLangCircles(all_projects['languages'])}
          </div>
        </div>
      </div>
    )
  }
}
