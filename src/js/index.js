import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/style.scss';
import App from './components/App/App';

const sayHello = () => {
    console.log('hello from func')
}
sayHello();
console.log('helllooretrefoo')
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