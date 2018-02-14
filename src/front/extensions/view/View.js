import React, {Component} from 'react';

import stylesheet from './View.css';

export default class View extends Component {
    render() {
        return <div className={stylesheet.root}>
            View
        </div>;
    }
}
