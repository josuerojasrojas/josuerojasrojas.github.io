import React, { Component } from 'react';
import '../styles/sass/SideMenu.css';
import LinkButton from './Link-Button';


class LanguageSquare extends Component {
  render() {
    const style = {
      square: {
        height: '172px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        float: 'left',
        border: '1px solid rgba(31, 31, 31, 0.8)',
        fontWeight: '400',
        fontSize: '.9rem',
        letterSpacing: '.1rem',
        cursor: 'pointer',
      },
    }
    return(
      <div style={style.square} className={'language laguagesquare-' + this.props.language} onClick={()=> this.props.onClick(this.props.language)}>
        {this.props.language}
      </div>
    )
  }
}

class DotButton extends Component {
  render() {
    return(
      <div className={'DotButton-wrapper ' + this.props.isActive} onClick={this.props.handleClick}>
        <div className='DotButton'>
          <div />
          <div />
          <div />
        </div>
      </div>

    )
  }
}

export default class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
    this.makeLangSquare = this.makeLangSquare.bind(this);
    this.dotMenuClick = this.dotMenuClick.bind(this);
  }

  makeLangSquare() {
    const langSqu = [];
    langSqu.push(
      <LanguageSquare
        language={'All'}
        onClick={this.props.languageSquareClick}/>
    )
    for(let i = 0; i < this.props.languages.length; i++){
      langSqu.push(
        <LanguageSquare
          language={this.props.languages[i]}
          onClick={this.props.languageSquareClick}/>
      )

    }
    return(langSqu)
  }

  dotMenuClick(){
    this.setState({
      active: !this.state.active
    })
  }

  render() {
    const style = {
      menu: {
        height: '100vh',
        backgroundColor: 'rgba(31, 31, 31, 0.3)',
        overflow: 'scroll',
        position: 'fixed',
        right: '0',
        transition: '400ms',
        color: '#989da1',
      },
      home: {
        height: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        float: 'left',
        border: '1px solid rgba(31, 31, 31, 0.8)',
        fontWeight: '400',
        fontSize: '1.2rem',
        letterSpacing: '.1rem',
        cursor: 'pointer',
        width: '100%',
        backgroundColor: 'rgba(31, 31, 31, .6)',
      },
      title: {
        fontSize: '1.2rem',
        textAlign: 'center',
        fontWeight: '400',
        letterSpacing: '.1rem',
        marginBottom: '20px',
      },
      laguages: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%'
      }

    }
    return(
      <div>
        <DotButton
          isActive={this.state.active}
          handleClick={this.dotMenuClick}/>
        <div style={style.menu} className={'SideMenu ' + this.state.active}>
          <a href='/#' style={style.home}>Home</a>
          <div style={style.laguages}>
            {this.makeLangSquare()}
          </div>
        </div>
      </div>
    )
  }
}
