import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Loader from '../../components/Loader';
import ChartWrapper from '../../components/ChartGenerator';
import Grid from '@material-ui/core/Grid';
import {constants} from '../../utils/constants';
import moment from 'moment';
import { Blocks } from './blocks';
import {TopBakers} from './topBakers';

import {
    MainContainer,
    Title,
    Widget,
    Label
} from './styles';

import { Props, States } from './types';

import { fetchHourlyTransaction, fetchHourlyVolume, fetchHourlyGas} from '../../reducers/Operations/thunks';

import {
    getHourlyTransaction,
    getHourlyTransactionLoading,
    getHourlyVolume,
    getHourlyVolumeLoading,
    getHourlyVolumeQuery,    
    getHourlyTransactionQuery,
    getHourlyGas,
    getHourlyGasLoading,
    getHourlyGasQuery
} from '../../reducers/Operations/selectors'

import {
    getTopBakersByStakeLoading,
} from '../../reducers/bakers/selectors';

import {
    getHourlyBlockLoading,
    getPriorityBlockLoading,
    getEndorsementLoading,

} from '../../reducers/blocks/selectors';

import { ErrorDialog } from '../../components/ErrorDialog';

class HomeComponent extends React.Component<Props, States> {

    topAccountsRef: any = null;
    hourlyTransactionRef: any = null;
    hourlyVolumeRef: any = null;
    hourlyGasRef: any = null;

    constructor(props: Props) {
        super(props);
        
        this.topAccountsRef = React.createRef();
        this.hourlyTransactionRef = React.createRef();
        this.hourlyVolumeRef = React.createRef();
        this.hourlyGasRef = React.createRef();
        this.state = {
            limit: 15,
            xHourlyTransactionKey: 'date',
            yHourlyTransactionKey: 'values',
            xHourlyVolumeKey: 'date',
            yHourlyVolumeKey: 'values',
            xHourlyGasKey: 'date',
            yHourlyGasKey: 'values',
            hourlyTransactionFilter: '',
            HourlyVolumeFilter: '',
            hourlyGasFilter: ''
        }
    }

    componentDidMount() {
        const date = new Date();
        date.setMinutes(0);
        date.setSeconds(0);
        const defaultTimestamp = date.getTime() - constants.one_day_in_milliseconds;
        this.fetchHourlyTransactionData(defaultTimestamp);
        this.fetchHourlyVolumeData(defaultTimestamp);
        this.fetchHourlyGasData(defaultTimestamp);
    }

    async fetchHourlyTransactionData(date: number){
        const { fetchHourlyTransaction } = this.props;
        await fetchHourlyTransaction(date);
        if(this.props.hourlyTransaction[0].hasOwnProperty('cycle')) {
            this.setState({xHourlyTransactionKey: 'cycle', yHourlyTransactionKey: 'sum_amount'})
        }
    }
    
    onHourlyTransactionChange = (limit: any, date: number, filter: string) => {
        this.setState({hourlyTransactionFilter: filter});
        this.fetchHourlyTransactionData(date);
    }

    xToolTipForHourlyTransaction = (d:any, i:any) => {
        if(d.hasOwnProperty('cycle')) {
            return "Cycle "+ d.cycle;
        }
        return d.values.toLocaleString();
    }

    yToolTipForHourlyTransaction = (d:any, i:any) => {
        if(d.hasOwnProperty('count_kind')) {
            return d.sum_amount + "Transaction per Cycle";
        }
        return moment(d.date).format("YYYY MMM DD, HH:mm");
    }

    async fetchHourlyVolumeData(date: number){
        const { fetchHourlyVolume } = this.props;
        await fetchHourlyVolume(date);
        if(this.props.hourlyVolume[0].hasOwnProperty('cycle')) {
            this.setState({xHourlyVolumeKey: 'cycle', yHourlyVolumeKey: 'sum_amount'})
        }
    }
    
    getFormattedToken = (tokenId: string) => {
        let subStr1 = tokenId.substring(0, 6);
        let subStr2 = tokenId.substring(tokenId.length-6, tokenId.length);
        return `${subStr1}...${subStr2}`;
    }

    onHourlyVolumeChange = (limit: any, date: number, filter: string) => {
        this.setState({HourlyVolumeFilter: filter})
        this.fetchHourlyVolumeData(date);
    }

    xToolTipForHourlyVolume = (d:any, i:any) => {
        if(d.hasOwnProperty('cycle')) {
            return "Cycle "+ d.cycle;
        }
        return d.values.toLocaleString();
    }

    yToolTipForHourlyVolume = (d:any, i:any) => {
        if(d.hasOwnProperty('sum_amount')) {
            return d.sum_amount + "ꜩ in Transaction Volume per Cycle";
        }
        return moment(d.date).format("YYYY MMM DD, HH:mm");
    }

    async fetchHourlyGasData(date: number){
        const { fetchHourlyGas } = this.props;
        await fetchHourlyGas(date);
        if(this.props.hourlyGas[0].hasOwnProperty('cycle')) {
            this.setState({xHourlyGasKey: 'cycle', yHourlyGasKey: 'sum_consumed_gas'})
        }
    }

    onHourlyGasChange = (limit: any, date: number, filter: string) => {
        this.setState({hourlyGasFilter: filter});
        this.fetchHourlyGasData(date);
    }

    xToolTipForHourlyGas = (d:any, i:any) => {
        if(d.hasOwnProperty('cycle')) {
            return "Cycle "+ d.cycle;
        }
        return d.values.toLocaleString();
    }

    yToolTipForHourlyGas = (d:any, i:any) => {
        if(d.hasOwnProperty('sum_amount')) {
            return d.sum_consumed_gas + "ꜩ in Transaction Volume per Cycle";
        }
        return moment(d.date).format("YYYY MMM DD, HH:mm");
    }

    render() {
        const { 
            isTopBakerByStateLoading,
            isHourlyBlockLoading, 
            isPriorityBlockLoading,
            isEndorsementLoading,
            hourlyTransaction, 
            isHourlyTransactionLoading, 
            hourlyVolume, 
            isHourlyVolumeLoading,
            hourlyTransactionQuery, 
            hourlyVolumeQuery,
            hourlyGas,
            hourlyGasQuery,
            isHourlyGasLoading
        } = this.props;
        return (
            <MainContainer>
                <Title>Tezos Network Overview </Title>
                <Label>Tezos Network: Mainnet</Label>
                <Widget>
                    <h3>Operations</h3>
                    <Grid container spacing={4}>
                        <Grid item xs={6}>
                            <div className="linkHolder">
                                <ul>
                                    <li className="rightAlign">
                                        <span className="subHeading">Transactions per Hour</span>
                                        <a href={hourlyTransactionQuery} target="_blank" rel="noopener noreferrer">Arronax Query
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
                                    hourlyTransaction.length > 0 && 
                                    <ChartWrapper data= {hourlyTransaction}
                                        color= '#5CBBD4'
                                        hoverColor='#CEEAF2'
                                        height= {250}
                                        xKey= {this.state.xHourlyTransactionKey}
                                        yKey= {this.state.yHourlyTransactionKey}
                                        spacing= {5}
                                        onLimitChange= {this.onHourlyTransactionChange}
                                        xTooltip= {this.xToolTipForHourlyTransaction}
                                        yTooltip= {this.yToolTipForHourlyTransaction}
                                        _ref= {this.hourlyTransactionRef}
                                        isLimitAvailable={false}
                                        isDateFilter={true}
                                        text={moment().format("YYYY MMMM Do")}
                                        selectedFilter={this.state.hourlyTransactionFilter}
                                        marginLeft={50}
                                        tickSpacing={3}/>
                                }
                                </React.Fragment>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                             <div className="linkHolder">
                                <ul>
                                    <li className="rightAlign">
                                        <span className="subHeading">Transaction Volume per Hour</span>
                                        <a href={hourlyVolumeQuery} target="_blank" rel="noopener noreferrer">Arronax Query
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.55553 0L7.38498 1.82944L3.49609 5.71832L4.28165 6.50388L8.17053 2.615L9.99997 4.44444V0H5.55553Z" fill="#5CBBD4"/>
                                                <path d="M8.88887 8.88887H1.11111V1.11111H4.99999L3.88888 0H1.11111C0.498332 0 0 0.498332 0 1.11111V8.88887C0 9.50165 0.498332 9.99998 1.11111 9.99998H8.88887C9.50165 9.99998 9.99998 9.50165 9.99998 8.88887V6.1111L8.88887 4.99999V8.88887Z" fill="#5CBBD4"/>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="mapHolder custom-anchor">
                                <React.Fragment>
                                {
                                    hourlyVolume.length > 0 && 
                                    <ChartWrapper data= {hourlyVolume}
                                        color= '#5CBBD4'
                                        hoverColor='#CEEAF2'
                                        height= {250}
                                        xKey= {this.state.xHourlyVolumeKey}
                                        yKey= {this.state.yHourlyVolumeKey}
                                        spacing= {5}
                                        onLimitChange= {this.onHourlyVolumeChange}
                                        xTooltip= {this.xToolTipForHourlyVolume}
                                        yTooltip= {this.yToolTipForHourlyVolume}
                                        _ref= {this.hourlyVolumeRef}
                                        isLimitAvailable={false}
                                        isDateFilter={true}
                                        text={moment().format("YYYY MMMM Do")}
                                        selectedFilter={this.state.HourlyVolumeFilter}
                                        marginLeft={70}
                                        tickSpacing={3}/>
                                }
                                </React.Fragment>
                            </div>
                        </Grid>
                        <Grid item xs={8}>
                            
                            <div className="linkHolder">
                                <ul>
                                    <li className="rightAlign">
                                        <span className="subHeading">Gas Consumed per Hour</span>
                                        <a href={hourlyGasQuery} target="_blank" rel="noopener noreferrer">Arronax Query
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
                                    hourlyGas.length > 0 && 
                                    <ChartWrapper data= {hourlyGas}
                                        color= '#5CBBD4'
                                        hoverColor='#CEEAF2'
                                        height= {250}
                                        xKey= {this.state.xHourlyGasKey}
                                        yKey= {this.state.yHourlyGasKey}
                                        spacing= {5}
                                        onLimitChange= {this.onHourlyGasChange}
                                        xTooltip= {this.xToolTipForHourlyGas}
                                        yTooltip= {this.yToolTipForHourlyGas}
                                        _ref= {this.hourlyGasRef}
                                        isLimitAvailable={false}
                                        isDateFilter={true}
                                        text={moment().format("YYYY MMMM Do")}
                                        selectedFilter={this.state.hourlyGasFilter}
                                        marginLeft={70}
                                        tickSpacing={3}/>
                                }
                                
                            </React.Fragment>
                            </div>     
                        </Grid>
                    </Grid>   
                    </Widget>
                    <Widget>
                        <h3>Blocks</h3>
                        <Blocks />       
                    </Widget>
                    <Widget>
                        <h3>Bakers</h3>
                        <TopBakers/>
                    </Widget>
                    <ErrorDialog/>
                    { (isTopBakerByStateLoading || isHourlyBlockLoading || isPriorityBlockLoading || isEndorsementLoading || isHourlyTransactionLoading || isHourlyVolumeLoading || isHourlyGasLoading) && <Loader /> }     
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: any) => ({
    
    hourlyTransaction: getHourlyTransaction(state),
    isHourlyTransactionLoading: getHourlyTransactionLoading(state),
    hourlyVolume: getHourlyVolume(state),
    isHourlyVolumeLoading: getHourlyVolumeLoading(state),
    hourlyTransactionQuery: getHourlyTransactionQuery(state),
    hourlyVolumeQuery: getHourlyVolumeQuery(state),
    hourlyGas: getHourlyGas(state),
    isHourlyGasLoading: getHourlyGasLoading(state),
    hourlyGasQuery: getHourlyGasQuery(state),
    isHourlyBlockLoading: getHourlyBlockLoading(state),
    isPriorityBlockLoading: getPriorityBlockLoading(state),
    isEndorsementLoading: getEndorsementLoading(state),
    isTopBakerByStateLoading :getTopBakersByStakeLoading(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchHourlyTransaction: (date: number) => dispatch(fetchHourlyTransaction(date)),
    fetchHourlyVolume: (date: number) => dispatch(fetchHourlyVolume(date)),
    fetchHourlyGas: (date: number) => dispatch(fetchHourlyGas(date)),
});


export const Home: any = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(HomeComponent);
