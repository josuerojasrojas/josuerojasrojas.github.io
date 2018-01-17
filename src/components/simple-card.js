// this component is a simple card that....
import React, { Component } from 'react';
// things the card uses
import RoundIcon from './round-icons';
import HiddenLinks from './simple-hidden-links';
import '../styles/sass/simple-card.css';

// icons supported (for social link)
import Instagram from '../images/svg/Instagram_simple_icon.svg';
import Facebook from '../images/svg/Facebook_simple_icon.svg';
import LinkedIn from '../images/svg/LinkedIn_simple_icon.svg';
import Github from '../images/svg/Github_simple_icon.svg';

const icons = {
  'Instagram': Instagram,
  'Facebook': Facebook,
  'LinkedIn': LinkedIn,
  'Github': Github
}

export default class SimpleCard extends Component {
  makeSocialBar(sociality ,main_color, hover_color){
    let socialBar = [];
    for(let key in sociality){
      socialBar.push(
        <RoundIcon
          key={key}
          icon={icons[key]}
          main_color={main_color}
          hover_color={hover_color}
          link={sociality[key]}
          />
      )
    }
    return socialBar;
  }
  render(){
    const socialbar = this.makeSocialBar(this.props.social, this.props.main_color, this.props.hover_color);
    return(
      <div className='card-wrapper'>
        <div className='card'>
          {socialbar}
          <HiddenLinks
            links={{'Projects': '/projects','Resume': '/projects'}}
            main_color={this.props.main_color}
            hover_color={this.props.hover_color}
          />
        </div>
      </div>
    )
  }
}
