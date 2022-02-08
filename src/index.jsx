import React from 'react';
import ReactDOM from 'react-dom';
import TagManager from 'react-gtm-module';
import App from './App';
import './index.css';
import 'draft-js/dist/Draft.css';
import * as serviceWorker from './serviceWorker';
import './languages';
import { GTM_ID } from './configs';

const tagManagerArgs = {
  gtmId: GTM_ID,
};

TagManager.initialize(tagManagerArgs);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
