import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Loader from '../../components/Loader';
import {chartGenerator} from '../../utils/chartGenerator';
import { constants } from '../../utils/constants';
import moment from 'moment';
import * as d3 from 'd3';

import {
    MainContainer,
    Title,
    Widget
} from './styles';

import { Props, States } from './types';

import { fetchHourlyBlock, fetchPriorityBlock, fetchEndorsement} from '../../reducers/blocks/thunks';
import {
    getHourlyBlock,
    getHourlyBlockLoading,
    getPriorityBlock,
    getPriorityBlockLoading,
    getEndorsement,
    getEndorsementLoading
} from '../../reducers/blocks/selectors';

class BlocksComponent extends React.Component<Props, States> {

    hourlyBlockRef: any = null;
    priorityBlockRef: any = null;
    endorsementRef: any = null;
    graphContainer: any = null;

    constructor(props: Props) {
        super(props);
        
        this.hourlyBlockRef = React.createRef();
        this.graphContainer = React.createRef();
        this.priorityBlockRef = React.createRef();
        this.endorsementRef = React.createRef();
        this.state = {
            hourlyBlocksFilter: constants.one_day_filter,
            priorityBlockFilter: constants.one_day_filter,
            endorsementFilter: constants.one_day_filter,
            hourlyBlockGraphText: moment().format("YYYY MMMM Do"),
            priorityBlockGraphText: moment().format("YYYY MMMM Do"),
            endorsementGraphText: moment().format("YYYY MMMM Do")
        }
    }

    componentDidMount() {
        const defayltTimestamp = new Date().getTime() - constants.one_day_in_milliseconds;
        this.fetchHourlyBlockData(defayltTimestamp);
        this.fetchPriorityBlock(defayltTimestamp);
        this.fetchEndorsement(defayltTimestamp);
    }

    async fetchHourlyBlockData(date: number){
        const { fetchHourlyBlock } = this.props;
        // Fetch top ten
        await fetchHourlyBlock(date);
        const svg = d3.select(this.hourlyBlockRef.current);
        const width = this.graphContainer.current ? this.graphContainer.current.offsetWidth-200 : 0

        chartGenerator.seperateAxisPrioritizedBarChartGenerator(250, width, svg, this.props.hourlyBlock, "date", "value", "#CEE6CA" ,5);
        
        const xTooltipFn = function(d: any, i: number) {
            return d.value.toLocaleString() + " Blocks per Hour";
        }
    
        const yTooltipFn = function(d: any, i: number) {
            return moment(d.date).format("YYYY MMM DD, HH:mm");
        }

        chartGenerator.barGraphFloatingTooltipGenerator(svg, xTooltipFn, yTooltipFn);
    }

    async fetchPriorityBlock(date: number) {
        const { fetchPriorityBlock } = this.props;

        // Fetch top ten
        await fetchPriorityBlock(date);
        const svg = d3.select(this.priorityBlockRef.current);
        const width = this.graphContainer.current ? this.graphContainer.current.offsetWidth-200 : 0

        chartGenerator.seperateAxisPrioritizedBarChartGenerator(250, width, svg, this.props.priorityBlock, "date", "value", "#CEE6CA" ,5);
        
        const xTooltipFn = function(d: any, i: number) {
            return d.value.toLocaleString() + " Priority Zero Blocks per Hour";
        }
    
        const yTooltipFn = function(d: any, i: number) {
            return moment(d.date).format("YYYY MMM DD, HH:mm");
        }

        chartGenerator.barGraphFloatingTooltipGenerator(svg, xTooltipFn, yTooltipFn);
    }

    async fetchEndorsement(date: number) {
        const { fetchEndorsement } = this.props;

        // Fetch top ten
        await fetchEndorsement(date);
        const svg = d3.select(this.endorsementRef.current);
        const width = this.graphContainer.current ? this.graphContainer.current.offsetWidth-200 : 0
        if(this.props.endorsement[0].hasOwnProperty('cycle')) {
            chartGenerator.seperateAxisPrioritizedBarChartGenerator(250, width, svg, this.props.endorsement, "cycle", "count_kind", "#CEE6CA" ,5);
        } else {
            chartGenerator.seperateAxisPrioritizedBarChartGenerator(250, width, svg, this.props.endorsement, "date", "value", "#CEE6CA" ,5);
        }
        
    }

    onHourlyBlockDateChange (filter: string) {
        let timestamp = 0;
        // calculate timestamp for conseiljs query builder
        if(filter === constants.all_time_filter) {
            timestamp = constants.all_time_date;
        } else {
            timestamp = new Date().getTime() - constants[filter];
        }

        const text = `${moment(timestamp).format("YYYY MMMM Do")} - ${moment().format("YYYY MMMM Do")}`;
        this.setState({hourlyBlockGraphText: text, hourlyBlocksFilter: filter});
        this.fetchHourlyBlockData(timestamp);
    }


    onPriorityBlockDateChange (filter: string) {
        let timestamp = 0;
        // calculate timestamp for conseiljs query builder
        if(filter === constants.all_time_filter) {
            timestamp = constants.all_time_date;
        } else {
            timestamp = new Date().getTime() - constants[filter];
        }

        const text = `${moment(timestamp).format("YYYY MMMM Do")} - ${moment().format("YYYY MMMM Do")}`;
        this.setState({priorityBlockGraphText: text, priorityBlockFilter: filter});
        this.fetchPriorityBlock(timestamp);
    }

    onEndorsementDateChange (filter: string) {
        let timestamp = 0;
        // calculate timestamp for conseiljs query builder
        if(filter === constants.all_time_filter) {
            timestamp = constants.all_time_date;
        } else {
            timestamp = new Date().getTime() - constants[filter];
        }

        const text = `${moment(timestamp).format("YYYY MMMM Do")} - ${moment().format("YYYY MMMM Do")}`;
        this.setState({endorsementGraphText: text, endorsementFilter: filter});
        this.fetchEndorsement(timestamp);
    }

    render() {
        const { isHourlyBlockLoading, isPriorityBlockLoading, isEndorsementLoading } = this.props;
        const width = this.graphContainer.current ? this.graphContainer.current.offsetWidth-200 : 0
        const { 
            hourlyBlocksFilter, 
            priorityBlockFilter, 
            endorsementFilter, 
            hourlyBlockGraphText,
            priorityBlockGraphText,
            endorsementGraphText
        } = this.state;
        const svgLength = `0,0,${width},${250}`;
        return (
            <MainContainer>
                <Title>Blocks</Title>
                <Widget>
                    <h3>Blocks per Hour</h3>
                    <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <a href="">Arronax Query
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.55553 0L7.38498 1.82944L3.49609 5.71832L4.28165 6.50388L8.17053 2.615L9.99997 4.44444V0H5.55553Z" fill="#5CBBD4"/>
                                        <path d="M8.88887 8.88887H1.11111V1.11111H4.99999L3.88888 0H1.11111C0.498332 0 0 0.498332 0 1.11111V8.88887C0 9.50165 0.498332 9.99998 1.11111 9.99998H8.88887C9.50165 9.99998 9.99998 9.50165 9.99998 8.88887V6.1111L8.88887 4.99999V8.88887Z" fill="#5CBBD4"/>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="mapHolder">
                        {
                            <React.Fragment>
                                <div className="pos-abs-right">
                                    <span onClick={e=> this.onHourlyBlockDateChange(constants.one_day_filter)} className={hourlyBlocksFilter=== constants.one_day_filter ? 'selected': ' '} >Day</span>
                                    <span onClick={e=> this.onHourlyBlockDateChange(constants.one_week_filter)} className={hourlyBlocksFilter=== constants.one_week_filter ? 'selected': ' '}>Week</span>
                                    <span onClick={e=> this.onHourlyBlockDateChange(constants.one_month_filter)} className={hourlyBlocksFilter=== constants.one_month_filter ? 'selected': ' '}>Month</span>
                                    <span onClick={e=> this.onHourlyBlockDateChange(constants.one_year_filter)} className={hourlyBlocksFilter=== constants.one_year_filter ? 'selected': ' '}>Year</span>
                                    <span onClick={e=> this.onHourlyBlockDateChange(constants.all_time_filter)} className={hourlyBlocksFilter=== constants.all_time_filter ? 'selected': ' '}>All Time</span>
                                </div>
                                
                                <div className="graph-holder" ref={this.graphContainer}>
                                    <svg viewBox={svgLength} className="account-graph" ref={this.hourlyBlockRef}></svg>
                                </div>
                                <p className="year-text">{hourlyBlockGraphText}</p>
                            </React.Fragment>
                        }
                    </div>
                       
                    </Widget>
                    <Widget>
                    <h3>Priority Zero Blocks per Hour</h3>
                    <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <a href="">Arronax Query
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.55553 0L7.38498 1.82944L3.49609 5.71832L4.28165 6.50388L8.17053 2.615L9.99997 4.44444V0H5.55553Z" fill="#5CBBD4"/>
                                        <path d="M8.88887 8.88887H1.11111V1.11111H4.99999L3.88888 0H1.11111C0.498332 0 0 0.498332 0 1.11111V8.88887C0 9.50165 0.498332 9.99998 1.11111 9.99998H8.88887C9.50165 9.99998 9.99998 9.50165 9.99998 8.88887V6.1111L8.88887 4.99999V8.88887Z" fill="#5CBBD4"/>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="mapHolder">
                        {
                            <React.Fragment>
                                <div className="pos-abs-right">
                                    <span onClick={e=> this.onPriorityBlockDateChange(constants.one_day_filter)} className={priorityBlockFilter=== constants.one_day_filter ? 'selected': ' '} >Day</span>
                                    <span onClick={e=> this.onPriorityBlockDateChange(constants.one_week_filter)} className={priorityBlockFilter=== constants.one_week_filter ? 'selected': ' '}>Week</span>
                                    <span onClick={e=> this.onPriorityBlockDateChange(constants.one_month_filter)} className={priorityBlockFilter=== constants.one_month_filter ? 'selected': ' '}>Month</span>
                                    <span onClick={e=> this.onPriorityBlockDateChange(constants.one_year_filter)} className={priorityBlockFilter=== constants.one_year_filter ? 'selected': ' '}>Year</span>
                                    <span onClick={e=> this.onPriorityBlockDateChange(constants.all_time_filter)} className={priorityBlockFilter=== constants.all_time_filter ? 'selected': ' '}>All Time</span>
                                </div>
                                
                                <div className="graph-holder" ref={this.graphContainer}>
                                    <svg viewBox={svgLength} className="account-graph" ref={this.priorityBlockRef}></svg>
                                </div>
                                <p className="year-text">{priorityBlockGraphText}</p>
                            </React.Fragment>
                        }
                    </div>      
                    </Widget>
                    <Widget>
                    <h3>Endorsements per Hour</h3>
                    <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <a href="">Arronax Query
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.55553 0L7.38498 1.82944L3.49609 5.71832L4.28165 6.50388L8.17053 2.615L9.99997 4.44444V0H5.55553Z" fill="#5CBBD4"/>
                                        <path d="M8.88887 8.88887H1.11111V1.11111H4.99999L3.88888 0H1.11111C0.498332 0 0 0.498332 0 1.11111V8.88887C0 9.50165 0.498332 9.99998 1.11111 9.99998H8.88887C9.50165 9.99998 9.99998 9.50165 9.99998 8.88887V6.1111L8.88887 4.99999V8.88887Z" fill="#5CBBD4"/>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="mapHolder">
                        {
                            <React.Fragment>
                               <div className="pos-abs-right">
                                    <span onClick={e=> this.onEndorsementDateChange(constants.one_day_filter)} className={endorsementFilter=== constants.one_day_filter ? 'selected': ' '} >Day</span>
                                    <span onClick={e=> this.onEndorsementDateChange(constants.one_week_filter)} className={endorsementFilter=== constants.one_week_filter ? 'selected': ' '}>Week</span>
                                    <span onClick={e=> this.onEndorsementDateChange(constants.one_month_filter)} className={endorsementFilter=== constants.one_month_filter ? 'selected': ' '}>Month</span>
                                    <span onClick={e=> this.onEndorsementDateChange(constants.one_year_filter)} className={endorsementFilter=== constants.one_year_filter ? 'selected': ' '}>Year</span>
                                    <span onClick={e=> this.onEndorsementDateChange(constants.all_time_filter)} className={endorsementFilter=== constants.all_time_filter ? 'selected': ' '}>All Time</span>
                                </div>
                                
                                <div className="graph-holder" ref={this.graphContainer}>
                                    <svg viewBox={svgLength} className="account-graph" ref={this.endorsementRef}></svg>
                                </div>
                                <p className="year-text">{endorsementGraphText}</p>
                            </React.Fragment>
                        }
                    </div>      
                    </Widget>
                    { (isHourlyBlockLoading || isPriorityBlockLoading || isEndorsementLoading) && <Loader /> }      
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: any) => ({
    hourlyBlock: getHourlyBlock(state),
    isHourlyBlockLoading: getHourlyBlockLoading(state),
    priorityBlock: getPriorityBlock(state),
    isPriorityBlockLoading: getPriorityBlockLoading(state),
    endorsement: getEndorsement(state),
    isEndorsementLoading: getEndorsementLoading(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchHourlyBlock: (date: number) => dispatch(fetchHourlyBlock(date)),
    fetchPriorityBlock: (date: number) => dispatch(fetchPriorityBlock(date)),
    fetchEndorsement: (date: number) => dispatch(fetchEndorsement(date)),
});


export const Blocks: any = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(BlocksComponent);