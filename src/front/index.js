import React from 'react';
import ReactDOM from 'react-dom';
import {FocusStyleManager} from '@blueprintjs/core';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import '!style-loader!css-loader!@blueprintjs/core/lib/css/blueprint.css';
import '!style-loader!css-loader!@blueprintjs/icons/lib/css/blueprint-icons.css';
import './index.css';

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
