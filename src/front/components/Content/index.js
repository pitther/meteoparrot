import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {branch} from 'baobab-react/higher-order';

import {branches} from '../../data';
import {io} from '../../data';

class Content extends Component {
    render() {
        const {className, extensions, currentExtension} = this.props;
        const Component = extensions[currentExtension].component;

        return <div key={currentExtension} className={className}>
            <Component io={io} />
        </div>;
    }
}

Content.propTypes = {
    className: PropTypes.string,
    extensions: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        component: PropTypes.func
    })),
    currentExtension: PropTypes.number
};

export default branch({
    extensions: branches.EXTENSIONS,
    currentExtension: branches.CURRENT_EXTENSION
}, Content);
