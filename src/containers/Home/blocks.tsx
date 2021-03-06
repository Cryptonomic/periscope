import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { constants } from '../../utils/constants';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import ChartWithoutAxisWrapper from '../../components/ChartgeneratorWithoutAxis';
import ChartWrapper from '../../components/ChartGenerator';

import { fetchHourlyBlock, fetchPriorityBlock, fetchEndorsement} from '../../reducers/blocks/thunks';
import {
    getHourlyBlock,
    getPriorityBlock,
    getEndorsement,
    getHourlyBlockQuery,
    getPriorityBlockQuery,
    getEndorsementQuery,

} from '../../reducers/blocks/selectors';

export interface Props {
    hourlyBlock: Blocks[];
    priorityBlock: Blocks[];
    endorsement: Blocks[];
    hourlyBlockQuery: string,
    endorsementQuery: string,
    priorityBlockQuery: string,
    fetchPriorityBlock: (date: number) => void;
    fetchHourlyBlock: (date: number) => void;
    fetchEndorsement: (date: number) => void;
}

export interface States {
    hourlyBlocksFilter: string,
    priorityBlockFilter: string,
    endorsementFilter: string,
    hourlyBlockGraphText: string,
    priorityBlockGraphText: string,
    endorsementGraphText: string,
    endorsementXKey: string,
    endorsementYKey: string,
}

export interface Blocks {
    timestamp: number;
    value: number;
}

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
            hourlyBlocksFilter: '',
            priorityBlockFilter: '',
            endorsementFilter: '',
            hourlyBlockGraphText: moment().format("YYYY MMMM Do"),
            priorityBlockGraphText: moment().format("YYYY MMMM Do"),
            endorsementGraphText: moment().format("YYYY MMMM Do"),
            endorsementXKey: 'date',
            endorsementYKey: 'value',
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

    async fetchHourlyBlockData(date: number){
        const { fetchHourlyBlock } = this.props;
        // Fetch top ten
        await fetchHourlyBlock(date);
    }

    xTooltipFnHourlyBlock = (d: any, i: number) => {
        return d.value.toLocaleString() + " Blocks per Hour";
    }

    yTooltipFnHourlyBlock = (d: any, i: number) => {
        return moment(d.date).format("YYYY MMM DD, HH:mm");
    }

    xTooltipForEndorsementFn = (d: any, i: number) => {
        return d.value.toLocaleString() + " Endorsement per Hour";
    }

    yTooltipForEndorsementFn = (d: any, i: number) => {
        return moment(d.date).format("YYYY MMM DD, HH:mm");
    }

    async fetchPriorityBlock(date: number) {
        const { fetchPriorityBlock } = this.props;
        await fetchPriorityBlock(date);
    }

    xTooltipFnPriorityBlock = (d: any, i: number) => {
        return d.value.toLocaleString() + " Priority Zero Blocks per Hour";
    }

    yTooltipFnPriorityBlock = (d: any, i: number) => {
        return moment(d.date).format("YYYY MMM DD, HH:mm");
    }

    async fetchEndorsement(date: number) {
        const { fetchEndorsement } = this.props;

        // Fetch top ten
        await fetchEndorsement(date);
        if(this.props.endorsement && this.props.endorsement[0].hasOwnProperty('cycle')) {
            this.setState({endorsementXKey: "cycle", endorsementYKey: "count_kind"});
        } else {
            this.setState({endorsementXKey: "date", endorsementYKey: "value"});
        }
        
    }

    onHourlyBlockDateChange = (limit: string, timestamp: number, filter: string) => {
        this.setState({hourlyBlocksFilter: filter});
        this.fetchHourlyBlockData(timestamp);
    }


    onPriorityBlockDateChange = (limit: string, timestamp: number, filter: string) => {
        this.setState({priorityBlockFilter: filter});
        this.fetchPriorityBlock(timestamp);
    }

    onEndorsementDateChange =  (limit: string, timestamp: number, filter: string) => {
        this.setState({endorsementFilter: filter});
        this.fetchEndorsement(timestamp);
    }

    render() {
        const { 
            hourlyBlockGraphText,
            priorityBlockGraphText,
            endorsementGraphText
        } = this.state;
        return (
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <span className="subHeading">Endorsements per Hour</span>
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
                        <React.Fragment>
                            {
                                this.props.endorsement.length && 
                                <ChartWrapper data= {this.props.endorsement}
                                    color= '#CEE6CA'
                                    hoverColor='#677365'
                                    height= {250}
                                    xKey= {this.state.endorsementXKey}
                                    yKey= {this.state.endorsementYKey}
                                    spacing= {5}
                                    onLimitChange= {this.onEndorsementDateChange}
                                    xTooltip= {this.xTooltipForEndorsementFn}
                                    yTooltip= {this.yTooltipForEndorsementFn}
                                    _ref= {this.endorsementRef}
                                    isLimitAvailable={false}
                                    isDateFilter={true}
                                    marginLeft={50}
                                    selectedFilter={this.state.endorsementFilter}
                                    text={endorsementGraphText}
                                    tickSpacing={3}
                                    isDateAxis={true}/>
                            }
                        </React.Fragment>
                    </div>
                </Grid>
                <Grid item xs={6}>
                        <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <span className="subHeading">Blocks per Hour</span>
                                <a href={this.props.hourlyBlockQuery} target="_blank" rel="noopener noreferrer">Arronax Query
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.55553 0L7.38498 1.82944L3.49609 5.71832L4.28165 6.50388L8.17053 2.615L9.99997 4.44444V0H5.55553Z" fill="#5CBBD4"/>
                                        <path d="M8.88887 8.88887H1.11111V1.11111H4.99999L3.88888 0H1.11111C0.498332 0 0 0.498332 0 1.11111V8.88887C0 9.50165 0.498332 9.99998 1.11111 9.99998H8.88887C9.50165 9.99998 9.99998 9.50165 9.99998 8.88887V6.1111L8.88887 4.99999V8.88887Z" fill="#5CBBD4"/>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="mapHolder">
                        <React.Fragment>
                            {
                                this.props.hourlyBlock.length && 
                                <ChartWrapper data= {this.props.hourlyBlock}
                                    color= '#CEE6CA'
                                    hoverColor='#677365'
                                    height= {250}
                                    xKey= "date"
                                    yKey= "value"
                                    spacing= {5}
                                    onLimitChange= {this.onHourlyBlockDateChange}
                                    xTooltip= {this.xTooltipFnHourlyBlock}
                                    yTooltip= {this.yTooltipFnHourlyBlock}
                                    _ref= {this.hourlyBlockRef}
                                    isLimitAvailable={false}
                                    isDateFilter={true}
                                    marginLeft={50}
                                    selectedFilter={this.state.hourlyBlocksFilter}
                                    text={hourlyBlockGraphText}
                                    tickSpacing={3}
                                    isDateAxis={true}/>
                            }
                        </React.Fragment>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    
                    <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <span className="subHeading">Priority Zero Blocks per hour</span>
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
                        <React.Fragment>
                            {
                                this.props.priorityBlock.length && 
                                <ChartWrapper data= {this.props.priorityBlock}
                                    color= '#CEE6CA'
                                    hoverColor='#677365'
                                    height= {250}
                                    xKey= "date"
                                    yKey= "value"
                                    spacing= {5}
                                    xTooltip= {this.xTooltipFnPriorityBlock}
                                    yTooltip= {this.yTooltipFnPriorityBlock}
                                    onLimitChange= {this.onPriorityBlockDateChange}
                                    _ref= {this.priorityBlockRef}
                                    isLimitAvailable={false}
                                    isDateFilter={true}
                                    marginLeft={50}
                                    selectedFilter={this.state.priorityBlockFilter}
                                    text={priorityBlockGraphText}
                                    tickSpacing={3}
                                    isDateAxis={true}/>
                            }
                        </React.Fragment>
                        
                    </div>    
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state: any) => ({
    hourlyBlock: getHourlyBlock(state),
    priorityBlock: getPriorityBlock(state),
    endorsement: getEndorsement(state),
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
