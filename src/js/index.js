import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/style.scss';

console.log('hellloooo')
ReactDOM.render(<App/>, document.getElementById('app'));

// class Hello extends React.Component {
//     render() {
//       return React.createElement('div', null, `Hello ${this.props.toWhat}`);
//     }
//   }
  
//   ReactDOM.render(
//     React.createElement(Hello, {toWhat: 'REact'}, null),
//     document.getElementById('app')
//   );