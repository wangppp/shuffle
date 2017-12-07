import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './Store';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

const store = configureStore()

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

if (module.hot) {
    module.hot.accept('./App', () => {
        ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
    })
}

// registerServiceWorker();
