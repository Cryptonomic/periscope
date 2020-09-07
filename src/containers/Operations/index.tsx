import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import {constants} from '../../utils/constants';
import Loader from '../../components/Loader';
import ChartWrapper from '../../components/ChartGenerator';
import moment from 'moment';

import { ErrorDialog } from '../../components/ErrorDialog';

import {
    MainContainer,
    Title,
    Widget
} from './styles';

import { Props, States } from './types';

import { fetchHourlyTransaction, fetchHourlyVolume, fetchHourlyGas, fetchHourlyFee, fetchDailyActivation, fetchDailyOrigination} from '../../reducers/Operations/thunks';
import {
    getHourlyTransaction,
    getHourlyTransactionLoading,
    getHourlyVolume,
    getHourlyVolumeLoading,
    getHourlyGas,
    getHourlyGasLoading,
    getHourlyFee,
    getHourlyFeeLoading,
    getDailyActivation,
    getDailyActivationLoading,
    getDailyOrigination,
    getDailyOriginationLoading,
    getHourlyTransactionQuery,
    getHourlyVolumeQuery,
    getHourlyGasQuery,
    getHourlyFeeQuery,
    getDailyActivationQuery,
    getDailyOriginationQuery
} from '../../reducers/Operations/selectors';

class OperationsComponent extends React.Component<Props, States> {

    hourlyTransactionRef: any = null;
    hourlyVolumeRef: any = null;
    hourlyGasRef: any = null;
    hourlyFeeRef: any = null;
    dailyActivationRef: any = null;
    graphContainer: any = null;

    constructor(props: Props) {
        super(props);
        this.state = {
            xHourlyTransactionKey: 'date',
            yHourlyTransactionKey: 'values',
            xHourlyVolumeKey: 'date',
            yHourlyVolumeKey: 'values',
            xHourlyGasKey: 'date',
            yHourlyGasKey: 'values',
            xHourlyFeeKey: 'date',
            yHourlyFeeKey: 'values',
            selectedHourlyTransactionFilter: '',
            selectedHourlyVolumeFilter: '',
            selectedHourlyGasFilter: '',
            selectedHourlyFeeFilter: '',
        }
        this.hourlyTransactionRef = React.createRef();
        this.hourlyVolumeRef = React.createRef();
        this.hourlyGasRef = React.createRef();
        this.hourlyFeeRef = React.createRef(); 
        this.dailyActivationRef = React.createRef();
        this.graphContainer = React.createRef();
    }

    componentDidMount() {

        const date = new Date();
        date.setMinutes(0);
        date.setSeconds(0);
        const defaultTimestamp = date.getTime() - constants.one_day_in_milliseconds;
        this.fetchHourlyVolumeData(defaultTimestamp);
        this.fetchHourlyTransactionData(defaultTimestamp);
        this.fetchHourlyGasData(defaultTimestamp);
        this.fetchHourlyFeeData(defaultTimestamp);
        const oneMonth = date.getTime() - constants.one_month_in_milliseconds;
        this.fetchDailyActivationData(oneMonth);
        this.fetchDailyOriginationData(oneMonth);
    }

    componentDidUpdate(prevProps: Props) {
        const currParams = new URLSearchParams(this.props.history.location.search);
        const currId: any = currParams.get('q');

        const element: any = document.getElementById(currId);
        if(element) {
            window.scrollTo(0, element.offsetTop); 
        }
    }

    async fetchHourlyTransactionData(date: number){
        const { fetchHourlyTransaction } = this.props;
        await fetchHourlyTransaction(date);
        if(this.props.hourlyTransaction[0].hasOwnProperty('cycle')) {
            this.setState({xHourlyTransactionKey: 'cycle', yHourlyTransactionKey: 'sum_amount'})
        }
    }

    onHourlyTransactionChange = (limit: any, date: number, filter: string) => {
        this.updateQueryParams('trancations');
        this.setState({selectedHourlyTransactionFilter: filter});
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
        this.updateQueryParams('trancationsVolume');
        this.setState({selectedHourlyVolumeFilter: filter});
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
        this.updateQueryParams('gasConsumed');
        this.setState({selectedHourlyGasFilter: filter});
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

    async fetchHourlyFeeData(date: number){
        const { fetchHourlyFee } = this.props;
        await fetchHourlyFee(date);
        if(this.props.hourlyFee[0].hasOwnProperty('cycle')) {
            this.setState({xHourlyFeeKey: 'cycle', yHourlyFeeKey: 'sum_fee'})
        } else {
            this.setState({xHourlyFeeKey: 'date', yHourlyFeeKey: 'values'})
        }
    }
    
    onHourlyFeeChange = (limit: any, date: number, filter: string) => {
        this.updateQueryParams('feesPaid');
        this.setState({selectedHourlyFeeFilter: filter});
        this.fetchHourlyFeeData(date);
    }

    xToolTipForHourlyFee = (d:any, i:any) => {
        if(d.hasOwnProperty('cycle')) {
            return "Cycle "+ d.cycle;
        }
        return d.values.toLocaleString();
    }

    yToolTipForHourlyFee = (d:any, i:any) => {
        if(d.hasOwnProperty('sum_amount')) {
            return d.sum_fee + "ꜩ in Transaction Volume per Cycle";
        }
        return moment(d.date).format("YYYY MMM DD, HH:mm");
    }

    async fetchDailyActivationData(date: number){
        const { fetchDailyActivation } = this.props;
        await fetchDailyActivation(date);
    }
    
    onDailyActivationChange = (limit: any, date: number) => {
        this.updateQueryParams('activations');
        this.fetchDailyActivationData(date);
    }

    xToolTipForDailyActivation = (d:any, i:any) => {
        return d.values.toLocaleString() +" Account Activations per Day";
    }

    yToolTipForDailyActivation = (d:any, i:any) => {
        return moment(d.date).format("YYYY MMM DD");
    }

    async fetchDailyOriginationData(date: number){
        const { fetchDailyOrigination } = this.props;
        await fetchDailyOrigination(date);
    }
    
    onDailyOriginationChange = (limit: any, date: number) => {
        this.updateQueryParams('originations');
        this.fetchDailyActivationData(date);
    }

    xToolTipForDailyOrigination = (d:any, i:any) => {
        return d.values.toLocaleString() + " Contract Originations per Day";
    }

    yToolTipForDailyOrigination = (d:any, i:any) => {
        return moment(d.date).format("YYYY MMM DD");
    }

    updateQueryParams(param: string) {
        this.props.history.push({
            pathname: this.props.history.location.pathname,
            search: '?q='+param
        })
    }

    render() {
        const { 
            hourlyTransaction,
            isHourlyTransactionLoading,
            isHourlyVolumeLoading, 
            hourlyVolume, hourlyGas,
            isHourlyGasLoading, 
            hourlyFee, 
            isHourlyFeeLoading,
            dailyActivation,
            isDailyActivationLoading,
            dailyOrigination,
            isDailyOriginationLoading,
            hourlyTransactionQuery,
            hourlyVolumeQuery,
            hourlyGasQuery,
            hourlyFeeQuery,
            dailyActivationQuery,
            dailyOriginationQuery
        } = this.props;
        return (
            <MainContainer>
                <Title>Operations</Title>
                <Widget id="trancations">
                    <h3>Transactions per Hour</h3>
                    <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <a href={hourlyTransactionQuery} target="_blank" rel="noopener noreferrer">Arronax Query
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
                            hourlyTransaction.length > 0 && 
                            <ChartWrapper data= {hourlyTransaction}
                                color= '#5CBBD4'
                                hoverColor='#CEEAF2'
                                height= {250}
                                xKey= {this.state.xHourlyTransactionKey}
                                yKey= {this.state.yHourlyTransactionKey}
                                spacing= {10}
                                onLimitChange= {this.onHourlyTransactionChange}
                                xTooltip= {this.xToolTipForHourlyTransaction}
                                yTooltip= {this.yToolTipForHourlyTransaction}
                                _ref= {this.hourlyTransactionRef}
                                isLimitAvailable={false}
                                isDateFilter={true}
                                text={moment().format("YYYY MMMM Do")}
                                selectedFilter={this.state.selectedHourlyTransactionFilter}/>
                        }
                        
                    </React.Fragment>
                </Widget>
                <Widget id="trancationsVolume">
                    <h3>Transaction Volume per Hour</h3>
                    <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <a href={hourlyVolumeQuery} target="_blank" rel="noopener noreferrer">Arronax Query
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
                            hourlyVolume.length > 0 && 
                            <ChartWrapper data= {hourlyVolume}
                                color= '#5CBBD4'
                                hoverColor='#CEEAF2'
                                height= {250}
                                xKey= {this.state.xHourlyVolumeKey}
                                yKey= {this.state.yHourlyVolumeKey}
                                spacing= {10}
                                onLimitChange= {this.onHourlyVolumeChange}
                                xTooltip= {this.xToolTipForHourlyVolume}
                                yTooltip= {this.yToolTipForHourlyVolume}
                                _ref= {this.hourlyVolumeRef}
                                isLimitAvailable={false}
                                isDateFilter={true}
                                text=''
                                selectedFilter={this.state.selectedHourlyVolumeFilter}/>
                        }
                        
                    </React.Fragment>
                </Widget>
                <Widget id="gasConsumed">
                    <h3>Gas Consumed per Hour</h3>
                    <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <a href={hourlyGasQuery} target="_blank" rel="noopener noreferrer">Arronax Query
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
                            hourlyGas.length > 0 && 
                            <ChartWrapper data= {hourlyGas}
                                color= '#5CBBD4'
                                hoverColor='#CEEAF2'
                                height= {250}
                                xKey= {this.state.xHourlyGasKey}
                                yKey= {this.state.yHourlyGasKey}
                                spacing= {10}
                                onLimitChange= {this.onHourlyGasChange}
                                xTooltip= {this.xToolTipForHourlyGas}
                                yTooltip= {this.yToolTipForHourlyGas}
                                _ref= {this.hourlyGasRef}
                                isLimitAvailable={false}
                                isDateFilter={true}
                                text=''
                                selectedFilter={this.state.selectedHourlyGasFilter}/>
                        }
                        
                    </React.Fragment>
                </Widget>
                <Widget id="feesPaid">
                    <h3>Fees Paid per Hour</h3>
                    <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <a href={hourlyFeeQuery} target="_blank" rel="noopener noreferrer">Arronax Query
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
                            hourlyFee.length > 0 && 
                            <ChartWrapper data= {hourlyFee}
                                color= '#5CBBD4'
                                hoverColor='#CEEAF2'
                                height= {250}
                                xKey= {this.state.xHourlyFeeKey}
                                yKey= {this.state.yHourlyFeeKey}
                                spacing= {10}
                                onLimitChange= {this.onHourlyFeeChange}
                                xTooltip= {this.xToolTipForHourlyFee}
                                yTooltip= {this.yToolTipForHourlyFee}
                                _ref= {this.hourlyFeeRef}
                                isLimitAvailable={false}
                                isDateFilter={true}
                                text={moment().format("YYYY MMMM Do")}
                                selectedFilter={this.state.selectedHourlyFeeFilter}/>
                        }
                        
                    </React.Fragment>
                </Widget>
                <Widget id="activations">
                    <h3>Activations per Day</h3>
                    <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <a href={dailyActivationQuery} target="_blank" rel="noopener noreferrer">Arronax Query
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
                            dailyActivation.length > 0 && 
                            <ChartWrapper data= {dailyActivation}
                                color= '#5CBBD4'
                                hoverColor='#CEEAF2'
                                height= {250}
                                xKey= {this.state.xHourlyFeeKey}
                                yKey= {this.state.yHourlyFeeKey}
                                spacing= {10}
                                onLimitChange= {this.onDailyActivationChange}
                                xTooltip= {this.xToolTipForDailyActivation}
                                yTooltip= {this.yToolTipForDailyActivation}
                                _ref= {this.dailyActivationRef}
                                isLimitAvailable={false}
                                isDateFilter={false}
                                selectedFilter={constants.one_month_filter}
                                text={`${moment(new Date().getTime() - constants.one_month_in_milliseconds).format("YYYY MMMM Do")}-${moment().format("YYYY MMMM Do")}`}/>
                        }
                        
                    </React.Fragment>
                </Widget>
                <Widget id="originations">
                    <h3>Originations per Day</h3>
                    <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <a href={dailyOriginationQuery} target="_blank" rel="noopener noreferrer">Arronax Query
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
                            dailyOrigination.length > 0 && 
                            <ChartWrapper data= {dailyOrigination}
                                color= '#5CBBD4'
                                hoverColor='#CEEAF2'
                                height= {250}
                                xKey= {this.state.xHourlyFeeKey}
                                yKey= {this.state.yHourlyFeeKey}
                                spacing= {10}
                                onLimitChange= {this.onDailyOriginationChange}
                                xTooltip= {this.xToolTipForDailyOrigination}
                                yTooltip= {this.yToolTipForDailyOrigination}
                                _ref= {this.dailyActivationRef}
                                isLimitAvailable={false}
                                isDateFilter={false}
                                selectedFilter={constants.one_month_filter}
                                text={`${moment(new Date().getTime() - constants.one_month_in_milliseconds).format("YYYY MMMM Do")}-${moment().format("YYYY MMMM Do")}`}/>
                        }
                        
                    </React.Fragment>
                </Widget>
                <ErrorDialog/>
                { (isHourlyTransactionLoading || isHourlyVolumeLoading || isHourlyGasLoading || isHourlyFeeLoading || isDailyActivationLoading || isDailyOriginationLoading) && <Loader /> }         
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: any) => ({

    hourlyTransaction: getHourlyTransaction(state),
    isHourlyTransactionLoading: getHourlyTransactionLoading(state),
    hourlyVolume: getHourlyVolume(state),
    isHourlyVolumeLoading: getHourlyVolumeLoading(state),
    hourlyGas: getHourlyGas(state),
    isHourlyGasLoading: getHourlyGasLoading(state),
    hourlyFee: getHourlyFee(state),
    isHourlyFeeLoading: getHourlyFeeLoading(state),
    dailyActivation: getDailyActivation(state),
    isDailyActivationLoading: getDailyActivationLoading(state),
    dailyOrigination: getDailyOrigination(state),
    isDailyOriginationLoading: getDailyOriginationLoading(state),
    hourlyTransactionQuery: getHourlyTransactionQuery(state),
    hourlyVolumeQuery: getHourlyVolumeQuery(state),
    hourlyGasQuery: getHourlyGasQuery(state),
    hourlyFeeQuery: getHourlyFeeQuery(state),
    dailyActivationQuery: getDailyActivationQuery(state),
    dailyOriginationQuery: getDailyOriginationQuery(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchHourlyTransaction: (date: number) => dispatch(fetchHourlyTransaction(date)),
    fetchHourlyVolume: (date: number) => dispatch(fetchHourlyVolume(date)),
    fetchHourlyGas: (date: number) => dispatch(fetchHourlyGas(date)),
    fetchHourlyFee: (date: number) => dispatch(fetchHourlyFee(date)),
    fetchDailyActivation: (date: number) => dispatch(fetchDailyActivation(date)),
    fetchDailyOrigination: (date: number) => dispatch(fetchDailyOrigination(date)),
});

export const Operations: any = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(OperationsComponent);
