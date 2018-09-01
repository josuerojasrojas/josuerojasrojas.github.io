import React, { Component } from 'react';
import SimpleContainer from './simple-container';

export default class AboutPage extends Component {
  render(){
    return (
      <SimpleContainer
        title='About Josue Rojas'
        box_title='About'
        main_color={'#989DA1'}
        hover_color={'#05fbff'}>
        <p>Hello world! This view should have not appeared. If it did then you must know something others don't. Anyway this page is not finished yet becuase I have not written anything about me yet...</p>
      </SimpleContainer>
    )
  }
}
