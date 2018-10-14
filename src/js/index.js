// import '@babel/polyfill';
require("@babel/polyfill");
import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/style.scss';
import App from './components/App/App';

const sayHello = () => {
    console.log('hello from func')
}
sayHello();
console.log(DEV);
console.log('helllooretrefoo')
ReactDOM.render(<App/>, document.getElementById('app'));