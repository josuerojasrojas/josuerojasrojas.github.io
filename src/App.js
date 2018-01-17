import React, { Component } from 'react';
import SimpleBackground from './components/simple-background.js';
import SimpleCard from './components/simple-card.js';
import space from './images/space.jpg';


class App extends Component {
  render() {
    return (
      <div>
        <SimpleBackground backgroundImage={space}/>
        <SimpleCard
          social={
            {'Github': 'https://github.com/josuerojasrojas',
            'LinkedIn': 'https://www.linkedin.com/in/josuerojasz/',
            'Facebook': 'https://www.facebook.com/withcheesepls',
            'Instagram': 'https://www.instagram.com/withcheesepls/',}
          }
          hover_color='#05fbff'
          main_color='#989DA1'
        />
      </div>
    );
  }
}

export default App;
