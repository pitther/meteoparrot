import React, {Component} from 'react';
import {root} from 'baobab-react/higher-order';

import TopPanel from '../TopPanel';
import LeftPanel from '../LeftPanel';
import Content from '../Content';

import {tree} from '../../data';

import stylesheet from './App.css';

class App extends Component {
    render() {
        return <div className={stylesheet.root}>
            <TopPanel/>

            <div className={stylesheet.main}>
                <LeftPanel className={stylesheet.left} />
                <Content className={stylesheet.content} />
            </div>
        </div>;
    }
}

export default root(tree, App);
