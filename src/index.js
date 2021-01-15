import ReactDOM from 'react-dom';
import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';
import App from './store';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
