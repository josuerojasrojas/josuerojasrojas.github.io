import React, { Component } from 'react';
import SimpleBackground from './components/simple-background.js';
import SimpleCard from './components/simple-card.js';
import SimpleContainer from './components/simple-container.js';
import SimpleFooter from './components/simple-footer.js';
import ProjectView from './components/ProjectView.js';
import './styles/sass/app.css';
import space from './images/space.jpg';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      projects: window.location.hash === '#projects' ? true : false,
    }
    this.changeWindow = this.changeWindow.bind(this);
  }
  // change state when window.location change
  // https://stackoverflow.com/questions/38965807/how-to-rerender-a-component-when-hash-change-and-change-the-state
  componentDidMount() {
    window.addEventListener("hashchange", this.changeWindow, false);
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.changeWindow, false);
  }
  changeWindow(h){
    this.setState({
      projects: window.location.hash === '#projects' ? true : false,
    })
  }

  getView(isProjects) {
    return isProjects ? (<SimpleContainer/>) : (<SimpleCard
      social={
        {'Github': 'https://github.com/josuerojasrojas',
        'LinkedIn': 'https://www.linkedin.com/in/josuerojasz/',
        'Facebook': 'https://www.facebook.com/withcheesepls',
        'Instagram': 'https://www.instagram.com/withcheesepls/',}
      }
      hover_color='#05fbff'
      main_color='#989DA1'
      profile_image='https://avatars0.githubusercontent.com/u/10749061'
      title='Josue Rojas'
      sub_title='Software Developer / Wonderer'
    />);
  }

  render() {
    const background =  (<SimpleBackground backgroundImage={space} active={this.state.projects}/>);
    // const view = this.state.projects ? this.projects : this.home;
    return (
      <div>
      {background}
      <div className='view-wrapper'>
        {this.getView(this.state.projects)}
        <SimpleFooter
          main_color={'#989DA1'}
          hover_color={'#05fbff'} />
      </div>
      </div>
    );
  }
}

export default App;
