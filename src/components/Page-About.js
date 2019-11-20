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
        <p>
          Hello, my name is Josue Rojas. I am a web developer. Knowledge in Javascript, HTML5, CSS3, SASS, SCSS, React.js, Node.js, Apollo, GraphQL, Sequelize, PostgreSQL, JQuery, Firebase, Travis-CI, Heroku, Jest, Git, and many more things. I graduated form CUNY Lehman College. I have a diverse intereset including data science machine learning, scripting, web development, open source, and other things besides tech (like reading books and just learning new things).
        </p>
        <p>
          Besides tech I like to do other things like skateboard, bike, and just exploring. I am always looking for ways to learn new things and keeping improving what I know. Any conversation is welcome if you want to learn more about me or just want to chat about anything. (most social media things I am 'witcheesepls')
        </p>
      </SimpleContainer>
    )
  }
}
