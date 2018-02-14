import React, {Component} from 'react';
import {Navbar, NavbarGroup, NavbarHeading} from '@blueprintjs/core';

import logo from './logo.png';

import stylesheet from './TopPanel.css';

const TITLE = 'MeteoParrot';

export default class TopPanel extends Component {
    render() {
        return <Navbar className={stylesheet.root}>
            <NavbarGroup className={stylesheet.group}>
                <NavbarHeading className={stylesheet.heading}>
                    <img src={logo} alt={TITLE} title={TITLE} />
                    {TITLE}
                </NavbarHeading>
            </NavbarGroup>
        </Navbar>;
    }
}
