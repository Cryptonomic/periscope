import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import {constants} from '../../utils/constants';
import Loader from '../../components/Loader';
import ChartWrapper from '../../components/ChartGenerator';
import { getBaker } from '../../utils/GetBakers';

import {
    MainContainer,
    Title,
    Widget
} from './styles';

import { Props, States, BakerByDelegation } from './types';

import { ErrorDialog } from '../../components/ErrorDialog';

import { fetchTopBakersByDelegation, fetchTopBakersByBlocks, fetchTopBakersByStake} from '../../reducers/bakers/thunks';
import {
    getTopBakersByDelegation,
    getTopBakersByDelegationLoading,
    getTopBakersByBlock,
    getTopBakersByBlockLoading,
    getTopBakersByStake,
    getTopBakersByStakeLoading,
    getTopBakersByDelegationQuery,
    getTopBakersByStakeQuery,
    getTopBakersByBlockQuery

} from '../../reducers/bakers/selectors';

class BakersComponent extends React.Component<Props, States> {

    topBakersByDelegationRef: any = null;
    topBakersByBlockRef: any = null;
    topBakersByStakeRef: any = null;
    graphContainer: any = null;

    constructor(props: Props) {
        super(props);
        
        this.topBakersByBlockRef = React.createRef();
        this.topBakersByDelegationRef = React.createRef();
        this.topBakersByStakeRef = React.createRef();
        this.graphContainer = React.createRef();
        this.state = {
            stakersNames: {},
            topBakerNamesByBlock: {},
            topBakerNamesByDelegation: {},
            topBakerByBlockFilter: ''
        }
    }

    componentDidMount() {
        this.fetchTopBakerByDelegationData(15);
        const defaultTimestamp = new Date().getTime() - constants.one_day_in_milliseconds;
        this.fetchTopBakerByBlockData(15, defaultTimestamp);
        this.fetchTopBakersByStakeData(15);
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

    async fetchTopBakerByDelegationData(limit: number){
        const { fetchTopBakersByDelegation } = this.props;
        // Fetch top ten
        await fetchTopBakersByDelegation(limit);
        this.setState({topBakerNamesByDelegation: await this.getBakerNames(this.props.topBakersByDelegation, 'delegate_value')});
    }

    async fetchTopBakerByBlockData(limit: number, timestamp: number){
        const { fetchTopBakersByBlocks } = this.props;
        // Fetch top ten
        
        await fetchTopBakersByBlocks(limit, timestamp);
        this.setState({topBakerNamesByBlock: await this.getBakerNames(this.props.topBakersByBlock, 'baker')});
    }

    async fetchTopBakersByStakeData(limit: number) {
        const { fetchTopBakersByStake } = this.props;

        // Fetch top ten
        await fetchTopBakersByStake(limit);
        this.setState({stakersNames: await this.getBakerNames(this.props.topBakersByStake, 'pkh')});
    }

    async getBakerNames(data: any, key: string) {
        let bakerNames: any = {};
        return await Promise.all(data.map(async (d:any) => {
            return{[d[key]]: await getBaker(d[key])} ;
        })).then(data => {
            // do something with the data
            console.log(data);
            data.forEach((item: any)=> {
                const key = Object.keys(item)[0];
                bakerNames[key] = item[key];
            });

            return bakerNames;
        });
    }

    getFormattedToken = (tokenId: string) => {
        let subStr1 = tokenId.substring(0, 6);
        let subStr2 = tokenId.substring(tokenId.length-6, tokenId.length);
        return `${subStr1}...${subStr2}`;
    }

    onTopBakerByDelegationLimitChange = (limit: number) => {
        limit = limit ? limit : 15;
        this.updateQueryParams('topDelegator');
        if(limit <= 1000) {
            this.fetchTopBakerByDelegationData(limit);
        }
    }

    onTopBakerByBlockLimitChange = (limit: number, timestamp: number, filter: string) => {
        limit = limit ? limit : 15;
        this.updateQueryParams('topBlockers');
        this.setState({topBakerByBlockFilter: filter});
        if(limit <= 1000) {
            this.fetchTopBakerByBlockData(limit, timestamp);
        }
    }

    xToolTipForTopBakerByBLock = (d:any, i:any) => {
        return this.state.topBakerNamesByBlock[d.baker]
    }

    yToolTipForTopBakerByBLock = (d:any, i:any) => {
        
        return this.props.topBakersByBlock[i].count_hash.toLocaleString();
    }

    xToolTipForTopBakerByDelegation = (d:any, i:any) => {
        //return this.getFormattedToken(this.props.topBakersByDelegation[i].delegate_value);
        return this.state.topBakerNamesByDelegation[d.delegate_value]
    }

    yToolTipForTopBakerByDelegation = (d:any, i:any) => {
        
        return d.count_account_id.toLocaleString();
    }

    onTopBakerByStakeLimitChange= (limit: number) => {
        limit = limit ? limit : 15;
        this.updateQueryParams('topStakers');
        if(limit <= 1000) {
            this.fetchTopBakersByStakeData(limit);
        }
    }

    xToolTipForTopBakerByStake = (d:any, i:any) => {
        return this.state.stakersNames[d.pkh];
    }

    yToolTipForTopBakerByStake = (d:any, i:any) => {
        return this.props.topBakersByStake[i].staking_balance.toLocaleString();
    }

    render() {
        const { isTopBakersByDelegationLoading, isTopBakersByBlockLoading, isTopBakerByStateLoading } = this.props;
        return (
            <MainContainer>
                <Title>Bakers</Title>
                <Widget id="topStakers">
                    <h3>Top Bakers by Stake</h3>
                    <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <a href={this.props.topBakersByStakeQuery}>Arronax Query
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
                            this.props.topBakersByStake.length && 
                            <ChartWrapper data= {this.props.topBakersByStake}
                                color= '#3371AA'
                                hoverColor='#99B8D5'
                                height= {250}
                                xKey= "pkh"
                                yKey= "staking_balance"
                                spacing= {10}
                                onLimitChange= {this.onTopBakerByStakeLimitChange}
                                xTooltip= {this.xToolTipForTopBakerByStake}
                                yTooltip= {this.yToolTipForTopBakerByStake}
                                _ref= {this.topBakersByStakeRef}
                                isLimitAvailable={true}
                                isDateFilter={false}
                                text=''/>
                        }
                        
                    </React.Fragment>
                </Widget>
                <Widget id="topBlockers">
                    <h3>Top Bakers by Block</h3>
                    <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <a href={this.props.topBakersByBlockQuery}>Arronax Query
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
                            this.props.topBakersByBlock.length && 
                            <ChartWrapper data= {this.props.topBakersByBlock}
                                color= '#3371AA'
                                hoverColor='#99B8D5'
                                height= {250}
                                xKey= "baker"
                                yKey= "count_hash"
                                spacing= {10}
                                onLimitChange= {this.onTopBakerByBlockLimitChange}
                                xTooltip= {this.xToolTipForTopBakerByBLock}
                                yTooltip= {this.yToolTipForTopBakerByBLock}
                                _ref= {this.topBakersByBlockRef}
                                isLimitAvailable={true}
                                isDateFilter={true}
                                text=''
                                selectedFilter={this.state.topBakerByBlockFilter}/>
                        }
                        
                    </React.Fragment>
                    { isTopBakersByDelegationLoading && <Loader /> }         
                </Widget>
                <Widget id="topDelegator">
                    <h3>Top Bakers by Delegations</h3>
                    <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <a href={this.props.topBakersByDelegationQuery}>Arronax Query
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
                            this.props.topBakersByDelegation.length && 
                            <ChartWrapper data= {this.props.topBakersByDelegation}
                                color= '#3371AA'
                                hoverColor='#99B8D5'
                                height= {250}
                                xKey= "delegate_value"
                                yKey= "count_account_id"
                                spacing= {10}
                                onLimitChange= {this.onTopBakerByDelegationLimitChange}
                                xTooltip= {this.xToolTipForTopBakerByDelegation}
                                yTooltip= {this.yToolTipForTopBakerByDelegation}
                                _ref= {this.topBakersByDelegationRef}
                                isLimitAvailable={true}
                                isDateFilter={false}
                                text=''/>
                        }
                    </React.Fragment>
                </Widget>
                <ErrorDialog/>
                { (isTopBakersByDelegationLoading || isTopBakersByBlockLoading || isTopBakerByStateLoading) && <Loader /> }
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: any) => ({
    topBakersByDelegation: getTopBakersByDelegation(state),
    isTopBakersByDelegationLoading: getTopBakersByDelegationLoading(state),
    topBakersByBlock: getTopBakersByBlock(state),
    isTopBakersByBlockLoading: getTopBakersByBlockLoading(state),
    topBakersByStake: getTopBakersByStake(state),
    isTopBakerByStateLoading :getTopBakersByStakeLoading(state),
    topBakersByDelegationQuery: getTopBakersByDelegationQuery(state),
    topBakersByBlockQuery: getTopBakersByBlockQuery(state),
    topBakersByStakeQuery: getTopBakersByStakeQuery(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchTopBakersByDelegation: (limit: number) => dispatch(fetchTopBakersByDelegation(limit)),
    fetchTopBakersByBlocks: (limit: number, date: number) => dispatch(fetchTopBakersByBlocks(limit, date)),
    fetchTopBakersByStake:  (limit: number) => dispatch(fetchTopBakersByStake(limit)),
});


export const Bakers: any = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(BakersComponent);
