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
    document.title = "Josue's Projecs";
  }

  makeLangCircles(langs){
    let langCir = [];
    for(let l of langs){
      langCir.push(<a href={`https://github.com/josuerojasrojas?utf8=✓&tab=repositories&language=${l}`}><LanguageCircle language={l}/></a>);
    }
    return langCir;
  }

  render() {
    console.log(all_projects['languages'])
    return(
      <div className='simple-container view'>
        <div className='top-wrapper'>
          <span className='title'>Featured Projects</span>
          <div onClick={()=>window.location='#'} className='close-btn-wrapper'><div></div><div></div></div>
        </div>
        <div className='project-boxes'>
          <ProjectBox
            key='project'
            languages={['Java', 'Python']}
            title='Example'
            date={'may'}
            description='This is a  description'
            url={'http://google.com'}
            projectLink={'http://google.com'}/>
          <ProjectBox
            key='project'
            languages={['Java', 'Python']}
            title='Example'
            date={'may'}
            description='This is a much longer description to describe'
            url={'http://google.com'}
            projectLink={'http://google.com'}/>
          <ProjectBox
            key='project'
            languages={['Java', 'Python']}
            title='Example 3'
            date={'may'}
            description='This is a much longer description to describe this project with '
            url={'http://google.com'}
            projectLink={'http://google.com'}/>
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
