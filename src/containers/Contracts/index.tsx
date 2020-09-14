import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import {constants} from '../../utils/constants';
import Loader from '../../components/Loader';
import ChartWrapper from '../../components/ChartGenerator';
import moment from 'moment';

import {
    MainContainer,
    Title,
    Widget
} from './styles';

import { Props, States } from './types';

import { fetchTopContractsByBalance, fetchTopContractsByInvocation} from '../../reducers/contracts/thunks';
import {
    getTopContractsByBalance,
    getTopContractsByBalanceLoading,
    getTopContractsByInvocation,
    getTopContractsByInvocationLoading,
    getTopContractsByBalanceQuery,
    getTopContractsByInvocationQuery

} from '../../reducers/contracts/selectors';

import { ErrorDialog } from '../../components/ErrorDialog';

class ContractsComponent extends React.Component<Props, States> {

    topContractsByBalanceRef: any = null;
    topContractsByInvocationRef: any = null;
    graphContainer: any = null;

    constructor(props: Props) {
        super(props);
        
        this.topContractsByBalanceRef = React.createRef();
        this.topContractsByInvocationRef = React.createRef();
        this.graphContainer = React.createRef();
        this.state = {
            contractsByInvocationFilter: ''
        }
    }

    componentDidMount() {
        this.fetchTopContractsByBalanceData(15);

        const defayltTimestamp = new Date().getTime() - constants.one_day_in_milliseconds;
        this.fetchTopContractsByInvocationData(15, defayltTimestamp);
    }

    componentDidUpdate(prevProps: Props) {
        const currParams = new URLSearchParams(this.props.history.location.search);
        const currId: any = currParams.get('q');

        const element: any = document.getElementById(currId);
        if(element) {
            window.scrollTo(0, element.offsetTop); 
        }
    }

    updateQueryParams(param: string) {
        this.props.history.push({
            pathname: this.props.history.location.pathname,
            search: '?q='+param
        })
    }

    async fetchTopContractsByBalanceData(limit: number){
        const { fetchTopContractsByBalance } = this.props;
        await fetchTopContractsByBalance(limit);
    }

    async fetchTopContractsByInvocationData(limit: number, date: number){
        const { fetchTopContractsByInvocation } = this.props;
        await fetchTopContractsByInvocation(limit, date);
    }
    
    getFormattedToken = (tokenId: string) => {
        let subStr1 = tokenId.substring(0, 6);
        let subStr2 = tokenId.substring(tokenId.length-6, tokenId.length);
        return `${subStr1}...${subStr2}`;
    }

    onTopContractsByBalanceLimitChange = (limit: number) => {
        this.updateQueryParams('contractsByBalance');
        limit = limit ? limit : 15;
        if(limit <= 1000) {
            this.fetchTopContractsByBalanceData(limit);
        }
    }

    onTopContractsBYInvocationLimitChange = (limit: number, date: number, filter: string) => {
        this.updateQueryParams('contractsByInvocation');
        limit = limit ? limit : 15;
        this.setState({contractsByInvocationFilter: filter});
        if(limit <= 1000) {
            this.fetchTopContractsByInvocationData(limit, date);
        }
    }

    xToolTipForTopContractsByBalance = (d:any, i:any) => {
        return this.getFormattedToken(d.account_id);
    }

    yToolTipForTopContractsByBalance = (d:any, i:any) => {
        return d.balance.toLocaleString()+ ' XTZ';
    }

    xToolTipForTopContractsByInvocation = (d:any, i:any) => {
        return this.getFormattedToken(d.destination);
    }

    yToolTipForTopContractsByInvocation = (d:any, i:any) => {
        return d.count_operation_group_hash.toLocaleString()+ ' Invocations';
    }

    render() {
        const { isTopContractsByBalanceLoading, isTopContractsByInvocationLoading } = this.props;
        return (
            <MainContainer>
                <Title>Contracts</Title>
                <Widget id="contractsByBalance">
                    
                    <div className="linkHolder">
                        <ul>
                            <li className="leftAlign">
                                <h3>Top Contracts by Balance</h3>
                            </li>
                            <li className="rightAlign">
                                <a href={this.props.topContractsByBalanceQuery} target="_blank" rel="noopener noreferrer">Arronax Query
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
                            this.props.topContractsByBalance.length > 0 && 
                            <ChartWrapper data= {this.props.topContractsByBalance}
                                color= '#94D2D0'
                                hoverColor='#CEEAF2'
                                height= {250}
                                xKey= "account_id"
                                yKey= "balance"
                                spacing= {10}
                                onLimitChange= {this.onTopContractsByBalanceLimitChange}
                                xTooltip= {this.xToolTipForTopContractsByBalance}
                                yTooltip= {this.yToolTipForTopContractsByBalance}
                                _ref= {this.topContractsByBalanceRef}
                                isLimitAvailable={true}
                                isDateFilter={false}
                                text=''/>
                        }
                        
                    </React.Fragment>
                </Widget>
                <Widget id="contractsByInvocation">
                    
                    <div className="linkHolder">
                        <ul>
                            <li className="leftAlign">
                                <h3>Top Contracts by Invocation</h3>
                            </li>
                            <li className="rightAlign">
                                <a href={this.props.topContractsByInvocationQuery} target="_blank" rel="noopener noreferrer">Arronax Query
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
                            this.props.topContractsByInvocation.length && 
                            <ChartWrapper data= {this.props.topContractsByInvocation}
                                color= '#94D2D0'
                                hoverColor='#CEEAF2'
                                height= {250}
                                xKey= "destination"
                                yKey= "count_operation_group_hash"
                                spacing= {10}
                                onLimitChange= {this.onTopContractsBYInvocationLimitChange}
                                xTooltip= {this.xToolTipForTopContractsByInvocation}
                                yTooltip= {this.yToolTipForTopContractsByInvocation}
                                _ref= {this.topContractsByInvocationRef}
                                isLimitAvailable={true}
                                isDateFilter={true}
                                text={moment().format("YYYY MMMM Do")}/>
                        }
                        
                    </React.Fragment>
                </Widget>
                <ErrorDialog/>
                { (isTopContractsByBalanceLoading || isTopContractsByInvocationLoading) && <Loader /> }         
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: any) => ({
    topContractsByBalance: getTopContractsByBalance(state),
    isTopContractsByBalanceLoading: getTopContractsByBalanceLoading(state),
    topContractsByInvocation: getTopContractsByInvocation(state),
    isTopContractsByInvocationLoading: getTopContractsByInvocationLoading(state),
    topContractsByBalanceQuery: getTopContractsByBalanceQuery(state),
    topContractsByInvocationQuery: getTopContractsByInvocationQuery(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchTopContractsByBalance: (limit: number) => dispatch(fetchTopContractsByBalance(limit)),
    fetchTopContractsByInvocation: (limit: number, date: number) => dispatch(fetchTopContractsByInvocation(limit, date)),
});

export const Contracts: any = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(ContractsComponent);
