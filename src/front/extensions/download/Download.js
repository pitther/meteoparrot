import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {branch} from 'baobab-react/higher-order';
import {Button} from '@blueprintjs/core';

import {download} from './actions';

import stylesheet from './Download.css';

class Download extends Component {
    constructor(props) {
        super(props);
        this.handleDownload = this.handleDownload.bind(this);
    }

    handleDownload() {
        const {dispatch, io} = this.props;
        dispatch(download, io);
    }

    render() {
        return <div className={stylesheet.root}>
            <Button
                text='Download'
                icon='download'
                onClick={this.handleDownload}
            />
        </div>;
    }
}

Download.propTypes = {
    io: PropTypes.object,
    dispatch: PropTypes.func
};

export default branch({}, Download);
