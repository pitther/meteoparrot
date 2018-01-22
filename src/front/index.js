import React from 'react';
import ReactDOM from 'react-dom';
import {FocusStyleManager} from '@blueprintjs/core';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import bluePrintStyles from '!style-loader/useable!css-loader!@blueprintjs/core/dist/blueprint.css';
import './index.css';

bluePrintStyles.use();
FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
