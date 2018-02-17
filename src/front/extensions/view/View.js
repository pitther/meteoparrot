import React, {Component} from 'react';

import {CONTENT_PORT} from '../../../config';

import stylesheet from './View.css';

export default class View extends Component {
    render() {
        return <div className={stylesheet.root}>
            <iframe className={stylesheet.frame} src={`http://${location.hostname}:${CONTENT_PORT}/climate/europe.html`} />
        </div>;
    }
}
