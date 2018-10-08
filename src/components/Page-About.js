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
          Hello, my name is Josue Rojas. I graduated from CUNY Lehman College. I have experience in Java, Python, JavaScript, HTML, CSS, SASS, Node.js, React.js, PostgresSQL, ejs, and other technologies (you can check out my resume or ask me for more). I have an interest in a variety of topics which include data science, machine learning, scripting, web development, app development, and new innovative technologies (again you can ask me, I am usually interested in new ideas and always looking to learn new things).
        </p>
        <p>
          Besides computer science I also have other interest and hobbies. Some of them include skateboarding, bike riding, reading, stocks, and learning different things. I am especially always interested in learning new things. If you want to know more just ask me. 
        </p>
      </SimpleContainer>
    )
  }
}
