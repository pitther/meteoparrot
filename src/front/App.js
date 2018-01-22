import React, {Component} from 'react';
import {Button} from '@blueprintjs/core';

import stylesheet from './App.css';

export default class App extends Component {
    render() {
        return <div className={stylesheet.root}>
            MAN React Template
            <Button text='Ok' />
        </div>;
    }
}
