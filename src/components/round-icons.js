// props
// icon: location of svg
// main_color: color of icon
// hover_color: hover color
// link: link when click
// this component is round icons that look bubbly
// only svg
import React, {Component} from 'react';
import '../styles/sass/round-icons.css';

// hover from
// https://stackoverflow.com/questions/28365233/inline-css-styles-in-react-how-to-implement-ahover

export default class Round_Icon extends Component {
  constructor(props){
    super(props);
    this.state = {
      hover: false,
    }
    this.toggleHover = this.toggleHover.bind(this);
  }
  toggleHover(isHover){
    this.setState({hover: isHover});
  }


  render(){
    // console.log(this.props.main_color, this.props.hover_color);
    const color = this.state.hover ? this.props.hover_color : this.props.main_color;
    const style = {
      border: {
        border: '1px solid '+ color,
      },
      icon: {
        backgroundColor: color,
        mask: 'url(' + this.props.icon + ') no-repeat 50% 50%',
        WebkitMask: 'url(' + this.props.icon + ') no-repeat 50% 50%',
      }
    }
    // send args to onClick or other events
    // https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method
    return(
      <a
        href={this.props.link} style={style.border}
        className='round-icon-border'
        onMouseEnter={() => this.toggleHover(true)}
        onMouseLeave={() => this.toggleHover(false)}>
        <div
          className='icon'
          style={style.icon}>{this.state.hover}</div>
      </a>
    )
  }
}
