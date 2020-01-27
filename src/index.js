import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Tasks from './Tasks/tasks';

ReactDOM.render(<Tasks />, document.getElementById('root'));

serviceWorker.unregister()