import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {branch} from 'baobab-react/higher-order';
import {FileInput, Label, Classes} from '@blueprintjs/core';
import _ from 'lodash';
import moment from 'moment';
import {AutoSizer, Table, Column} from 'react-virtualized';

import * as branches from '../../data/branches';
import {setStations} from '../../actions';
import {loadStations, getStations} from './actions';

import stylesheet from './Stations.css';

class Stations extends Component {
    constructor(props) {
        super(props);

        this.handleData = this.handleData.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
        this.getRowData = this.getRowData.bind(this);

        this.columns = [{
            field: 'id',
            label: 'Id',
            width: 50
        }, {
            field: 'usaf',
            label: 'USAF',
            width: 50
        }, {
            field: 'wban',
            label: 'WBAN'
        }, {
            field: 'name',
            label: 'І\'мя',
            grow: 1
        }, {
            field: 'country',
            label: 'Країна'
        }, {
            field: 'state',
            label: 'Регіон'
        }, {
            field: 'icao',
            label: 'ICAO'
        }, {
            field: 'lat',
            label: 'Широта',
            cellDataGetter: this.coordCellDataGetter
        }, {
            field: 'lon',
            label: 'Довгота',
            cellDataGetter: this.coordCellDataGetter
        }, {
            field: 'elev',
            label: 'Висота',
            cellDataGetter: this.coordCellDataGetter
        }, {
            field: 'begin',
            label: 'Початок',
            width: 100,
            cellDataGetter: this.dateCellDataGetter
        }, {
            field: 'end',
            label: 'Кінець',
            width: 100,
            cellDataGetter: this.dateCellDataGetter
        }];

        this.state = {};
    }

    componentDidMount() {
        const {dispatch, io} = this.props;
        io.on('stations.data', this.handleData);
        dispatch(getStations, io);
    }

    componentWillUnmount() {
        const {io} = this.props;
        io.off('stations.data', this.handleData);
    }

    handleFileInput(event) {
        const {dispatch, io} = this.props;
        const file = _.get(event, ['target', 'files', 0]);
        const filename = _.get(event, ['target', 'files', 0, 'name']);

        this.setState({filename}, () => {
            if (file) {
                const reader = new FileReader();
                reader.onload = result => {
                    dispatch(loadStations, io, result.target.result);
                };
                reader.readAsText(file);
            }
        });
    }

    handleData(data) {
        const {dispatch}= this.props;
        dispatch(setStations, data);
    }

    getRowData({index}) {
        const {stations} = this.props;
        return stations[index];
    }

    coordCellDataGetter({dataKey, rowData}) {
        const data = rowData[dataKey];
        return data === 'NaN' ? null : data;
    }

    dateCellDataGetter({dataKey, rowData}) {
        const data = rowData[dataKey];
        return moment(data).format('DD.MM.YYYY');
    }

    renderColumns() {
        return _.map(this.columns, ({field, label, width = 80, grow, shrink, renderCell, cellDataGetter}) => <Column
            key={field}
            dataKey={field}
            width={width}
            label={label}
            flexGrow={grow}
            flexShrink={shrink}
            renderCell={renderCell}
            cellDataGetter={cellDataGetter}
        />);
    }

    render() {
        const {filename} = this.state;
        const {stations} = this.props;

        const count = stations.length;

        return <div className={stylesheet.root}>
            <Label className={Classes.INLINE} text='Файл для оновлення списку'>
                <FileInput
                    className={stylesheet.file}
                    text={filename || 'Виберіть файл...'}
                    onInputChange={this.handleFileInput}
                />
            </Label>

            {count > 0 && <div className={stylesheet.table}>
                <AutoSizer>
                    {({width, height}) => <Table
                        width={width}
                        height={height}
                        disableHeader={false}
                        headerHeight={32}
                        rowCount={count}
                        rowGetter={this.getRowData}
                        rowHeight={32}
                        overscanRowCount={2}
                    >{this.renderColumns()}</Table>}
                </AutoSizer>
            </div>}
        </div>;
    }
}

Stations.propTypes = {
    stations: PropTypes.array,
    io: PropTypes.object,
    dispatch: PropTypes.func
};

export default branch({
    stations: branches.STATIONS
}, Stations);
