import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Loader from '../../components/Loader';
import { constants } from '../../utils/constants';
import moment from 'moment';

import {
    MainContainer,
    Title,
    Widget
} from './styles';

import { ErrorDialog } from '../../components/ErrorDialog';
import ChartWrapper from '../../components/ChartGenerator';

import { Props, States } from './types';

import { fetchHourlyBlock, fetchPriorityBlock, fetchEndorsement} from '../../reducers/blocks/thunks';
import {
    getHourlyBlock,
    getHourlyBlockLoading,
    getPriorityBlock,
    getPriorityBlockLoading,
    getEndorsement,
    getEndorsementLoading,
    getHourlyBlockQuery,
    getPriorityBlockQuery,
    getEndorsementQuery,

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
        const date = new Date();
        date.setMinutes(0);
        date.setSeconds(0);
        const defayltTimestamp = date.getTime() - constants.one_day_in_milliseconds;
        this.fetchHourlyBlockData(defayltTimestamp);
        this.fetchPriorityBlock(defayltTimestamp);
        this.fetchEndorsement(defayltTimestamp);
    }

    componentDidUpdate(prevProps: Props) {
        const currParams = new URLSearchParams(this.props.history.location.search);
        const currId: any = currParams.get('q');

        const element: any = document.getElementById(currId);
        if(element) {
            window.scrollTo(0, element.offsetTop); 
        }
    }

    updateQueryParams = (param: string) => {
        this.props.history.push({
            pathname: this.props.history.location.pathname,
            search: '?q='+param
        })
    }

    async fetchHourlyBlockData(date: number){
        const { fetchHourlyBlock } = this.props;
        await fetchHourlyBlock(date);
    }

    xTooltipForBlocksFn = (d: any, i: number) => {
        return d.value.toLocaleString() + " Blocks per Hour";
    }

    yTooltipForBlocksFn = function(d: any, i: number) {
        return moment(d.date).format("YYYY MMM DD, HH:mm");
    }

    async fetchPriorityBlock(date: number) {
        const { fetchPriorityBlock } = this.props;
        await fetchPriorityBlock(date);
    }

    xTooltipForPriorityFn = (d: any, i: number) => {
        return d.value.toLocaleString() + " Priority Zero Blocks per Hour";
    }

    yTooltipForPriorityFn = (d: any, i: number) => {
        return moment(d.date).format("YYYY MMM DD, HH:mm");
    }

    async fetchEndorsement(date: number) {
        const { fetchEndorsement } = this.props;
        await fetchEndorsement(date);
        
    }

    xTooltipForEndorsementFn = (d: any, i: number) => {
        return d.value.toLocaleString() + " Endorsements";
    }

    yTooltipForEndorsementFn = (d: any, i: number) => {
        return moment(d.date).format("YYYY MMM DD, HH:mm");
    }

    onHourlyBlockDateChange = (limit: number, date: number, filter: string) => {
        this.updateQueryParams('hourlyBlocks');
        const text = `${moment(date).format("YYYY MMMM Do")} - ${moment().format("YYYY MMMM Do")}`;
        this.setState({hourlyBlockGraphText: text, hourlyBlocksFilter: filter});
        this.fetchHourlyBlockData(date);
    }


    onPriorityBlockDateChange = (limit: number, date: number, filter: string) => {
        this.updateQueryParams('priorityBlocks');

        const text = `${moment(date).format("YYYY MMMM Do")} - ${moment().format("YYYY MMMM Do")}`;
        this.setState({priorityBlockGraphText: text, priorityBlockFilter: filter});
        this.fetchPriorityBlock(date);
    }

    onEndorsementDateChange = (limit: number, date: number, filter: string) => {
        this.updateQueryParams('endorsement');

        const text = `${moment(date).format("YYYY MMMM Do")} - ${moment().format("YYYY MMMM Do")}`;
        this.setState({endorsementGraphText: text, endorsementFilter: filter});
        this.fetchEndorsement(date);
    }

    render() {
        const { isHourlyBlockLoading, isPriorityBlockLoading, isEndorsementLoading } = this.props;
        return (
            <MainContainer>
                <Title>Blocks</Title>
                <Widget id="hourlyBlocks">
                    <div className="linkHolder">
                        <ul>
                            <li className="leftAlign">
                                <h3>Blocks per Hour</h3>
                            </li>
                            <li className="rightAlign">
                                <a href={this.props.hourlyBlockQuery} target="_blank" rel="noopener noreferrer">Arronax Query
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.55553 0L7.38498 1.82944L3.49609 5.71832L4.28165 6.50388L8.17053 2.615L9.99997 4.44444V0H5.55553Z" fill="#5CBBD4"/>
                                        <path d="M8.88887 8.88887H1.11111V1.11111H4.99999L3.88888 0H1.11111C0.498332 0 0 0.498332 0 1.11111V8.88887C0 9.50165 0.498332 9.99998 1.11111 9.99998H8.88887C9.50165 9.99998 9.99998 9.50165 9.99998 8.88887V6.1111L8.88887 4.99999V8.88887Z" fill="#5CBBD4"/>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <React.Fragment>
                        {
                            this.props.hourlyBlock.length && 
                            <ChartWrapper data= {this.props.hourlyBlock}
                                color= '#CEE6CA'
                                hoverColor='#677365'
                                height= {250}
                                xKey= "date"
                                yKey= "value"
                                spacing= {10}
                                onLimitChange= {this.onHourlyBlockDateChange}
                                xTooltip= {this.xTooltipForBlocksFn}
                                yTooltip= {this.yTooltipForBlocksFn}
                                _ref= {this.hourlyBlockRef}
                                isLimitAvailable={false}
                                isDateFilter={true}
                                text={moment().format("YYYY MMMM Do")}
                                selectedFilter={this.state.hourlyBlocksFilter}
                                isDateAxis={true}/>
                        }
                    </React.Fragment>
                       
                    </Widget>
                    <Widget id="priorityBlocks">
                    
                    <div className="linkHolder">
                        <ul>
                            <li className="leftAlign">
                                <h3>Priority Zero Blocks per Hour</h3>
                            </li>
                            <li className="rightAlign">
                                <a href={this.props.priorityBlockQuery} target="_blank" rel="noopener noreferrer">Arronax Query
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
                                {
                                    this.props.priorityBlock.length && 
                                    <ChartWrapper data= {this.props.priorityBlock}
                                        color= '#CEE6CA'
                                        hoverColor='#677365'
                                        height= {250}
                                        xKey= "date"
                                        yKey= "value"
                                        spacing= {10}
                                        onLimitChange= {this.onPriorityBlockDateChange}
                                        xTooltip= {this.xTooltipForPriorityFn}
                                        yTooltip= {this.yTooltipForPriorityFn}
                                        _ref= {this.priorityBlockRef}
                                        isLimitAvailable={false}
                                        isDateFilter={true}
                                        text={moment().format("YYYY MMMM Do")}
                                        selectedFilter={this.state.priorityBlockFilter}
                                        isDateAxis={true}/>
                                }
                            </React.Fragment>
                        }
                    </div>      
                    </Widget>
                    <Widget id="endorsement">
                    
                    <div className="linkHolder">
                        <ul>
                            <li className="leftAlign">
                            <h3>Endorsements per Hour</h3>
                            </li>
                            <li className="rightAlign">
                                <a href={this.props.endorsementQuery} target="_blank" rel="noopener noreferrer">Arronax Query
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
                                {
                                    this.props.endorsement.length && 
                                    <ChartWrapper data= {this.props.endorsement}
                                        color= '#CEE6CA'
                                        hoverColor='#677365'
                                        height= {250}
                                        xKey= "date"
                                        yKey= "value"
                                        spacing= {10}
                                        onLimitChange= {this.onEndorsementDateChange}
                                        xTooltip= {this.xTooltipForEndorsementFn}
                                        yTooltip= {this.yTooltipForEndorsementFn}
                                        _ref= {this.endorsementRef}
                                        isLimitAvailable={false}
                                        isDateFilter={true}
                                        text={moment().format("YYYY MMMM Do")}
                                        selectedFilter={this.state.endorsementFilter}
                                        isDateAxis={true}/>
                                }
                            </React.Fragment>
                        }
                    </div>      
                    </Widget>
                    <ErrorDialog/>
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
    isEndorsementLoading: getEndorsementLoading(state),
    hourlyBlockQuery: getHourlyBlockQuery(state),
    priorityBlockQuery: getPriorityBlockQuery(state),
    endorsementQuery: getEndorsementQuery(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchHourlyBlock: (date: number) => dispatch(fetchHourlyBlock(date)),
    fetchPriorityBlock: (date: number) => dispatch(fetchPriorityBlock(date)),
    fetchEndorsement: (date: number) => dispatch(fetchEndorsement(date)),
});


export const Blocks: any = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(BlocksComponent);
