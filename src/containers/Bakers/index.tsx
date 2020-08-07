import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import {constants} from '../../utils/constants';
import Loader from '../../components/Loader';
import ChartWrapper from '../../components/ChartGenerator';

import {
    MainContainer,
    Title,
    Widget
} from './styles';

import { Props, States, BakerByDelegation } from './types';

import { fetchTopBakersByDelegation, fetchTopBakersByBlocks, fetchTopBakersByStake} from '../../reducers/bakers/thunks';
import {
    getTopBakersByDelegation,
    getTopBakersByDelegationLoading,
    getTopBakersByBlock,
    getTopBakersByBlockLoading,
    getTopBakersByStake,
    getTopBakersByStakeLoading,

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
            limit: 15,
            bakerByBlockLimit: 15,
        }
    }

    componentDidMount() {
        this.fetchTopBakerByDelegationData(15);
        this.fetchTopBakerByBlockData(15);
        this.fetchTopBakersByStakeData(15);
    }

    async fetchTopBakerByDelegationData(limit: number){
        const { fetchTopBakersByDelegation } = this.props;
        // Fetch top ten
        await fetchTopBakersByDelegation(limit);
    }

    async fetchTopBakerByBlockData(limit: number){
        const { fetchTopBakersByBlocks } = this.props;
        // Fetch top ten
        let timestamp = new Date().getTime() - constants.one_day_in_milliseconds;
        await fetchTopBakersByBlocks(limit, timestamp);
    }

    async fetchTopBakersByStakeData(limit: number) {
        const { fetchTopBakersByStake } = this.props;
        // Fetch top ten
        await fetchTopBakersByStake(limit);
    }

    getFormattedToken = (tokenId: string) => {
        let subStr1 = tokenId.substring(0, 6);
        let subStr2 = tokenId.substring(tokenId.length-6, tokenId.length);
        return `${subStr1}...${subStr2}`;
    }

    onTopBakerByDelegationLimitChange = (limit: number) => {
        limit = limit ? limit : 15;
        if(limit <= 1000) {
            this.fetchTopBakerByDelegationData(limit);
        }
    }

    onTopBakerByBlockLimitChange = (limit: number) => {
        limit = limit ? limit : 15;
        if(limit <= 1000) {
            this.fetchTopBakerByBlockData(limit);
        }
    }

    xToolTipForTopBakerByBLock = (d:any, i:any) => {
        return this.getFormattedToken(this.props.topBakersByBlock[i].baker);
    }

    yToolTipForTopBakerByBLock = (d:any, i:any) => {
        return this.props.topBakersByBlock[i].count_hash.toLocaleString();
    }

    xToolTipForTopBakerByDelegation = (d:any, i:any) => {
        return this.props.topBakersByDelegation[i].count_account_id.toLocaleString();
    }

    yToolTipForTopBakerByDelegation = (d:any, i:any) => {
        return this.getFormattedToken(this.props.topBakersByDelegation[i].delegate_value);
    }

    onTopBakerByStakeLimitChange= (limit: number) => {
        limit = limit ? limit : 15;
        if(limit <= 1000) {
            this.fetchTopBakersByStakeData(limit);
        }
    }

    xToolTipForTopBakerByStake = (d:any, i:any) => {
        return this.props.topBakersByStake[i].staking_balance.toLocaleString();
    }

    yToolTipForTopBakerByStake = (d:any, i:any) => {
        return this.getFormattedToken(this.props.topBakersByStake[i].pkh);
    }

    render() {
        const { isTopBakersByDelegationLoading } = this.props;
        return (
            <MainContainer>
                <Title>Bakers</Title>
                <Widget>
                    <h3>Top Bakers by Stake</h3>
                    <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <a href="">View in Harpoon 
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.55553 0L7.38498 1.82944L3.49609 5.71832L4.28165 6.50388L8.17053 2.615L9.99997 4.44444V0H5.55553Z" fill="#5CBBD4"/>
                                        <path d="M8.88887 8.88887H1.11111V1.11111H4.99999L3.88888 0H1.11111C0.498332 0 0 0.498332 0 1.11111V8.88887C0 9.50165 0.498332 9.99998 1.11111 9.99998H8.88887C9.50165 9.99998 9.99998 9.50165 9.99998 8.88887V6.1111L8.88887 4.99999V8.88887Z" fill="#5CBBD4"/>
                                    </svg>
                                </a>
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
                                {
                                    this.props.topBakersByStake.length && 
                                    <ChartWrapper data= {this.props.topBakersByStake}
                                        color= '#3371AA'
                                        height= {250}
                                        xKey= "pkh"
                                        yKey= "staking_balance"
                                        spacing= {10}
                                        onLimitChange= {this.onTopBakerByStakeLimitChange}
                                        xTooltip= {this.xToolTipForTopBakerByStake}
                                        yTooltip= {this.yToolTipForTopBakerByStake}
                                        _ref= {this.topBakersByStakeRef}/>
                                }
                                
                            </React.Fragment>
                            
                        }
                        
                    </div>
                </Widget>
                <Widget>
                    <h3>Top Bakers by Block</h3>
                    <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <a href="">View in Harpoon 
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.55553 0L7.38498 1.82944L3.49609 5.71832L4.28165 6.50388L8.17053 2.615L9.99997 4.44444V0H5.55553Z" fill="#5CBBD4"/>
                                        <path d="M8.88887 8.88887H1.11111V1.11111H4.99999L3.88888 0H1.11111C0.498332 0 0 0.498332 0 1.11111V8.88887C0 9.50165 0.498332 9.99998 1.11111 9.99998H8.88887C9.50165 9.99998 9.99998 9.50165 9.99998 8.88887V6.1111L8.88887 4.99999V8.88887Z" fill="#5CBBD4"/>
                                    </svg>
                                </a>
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
                                {
                                    this.props.topBakersByBlock.length && 
                                    <ChartWrapper data= {this.props.topBakersByBlock}
                                        color= '#3371AA'
                                        height= {250}
                                        xKey= "baker"
                                        yKey= "count_hash"
                                        spacing= {10}
                                        onLimitChange= {this.onTopBakerByBlockLimitChange}
                                        xTooltip= {this.xToolTipForTopBakerByBLock}
                                        yTooltip= {this.yToolTipForTopBakerByBLock}
                                        _ref= {this.topBakersByBlockRef}/>
                                }
                                
                            </React.Fragment>
                            
                        }
                        
                    </div>
                    { isTopBakersByDelegationLoading && <Loader /> }         
                </Widget>
                <Widget>
                    <h3>Top Bakers by Delegations</h3>
                    <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <a href="">View in Harpoon 
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.55553 0L7.38498 1.82944L3.49609 5.71832L4.28165 6.50388L8.17053 2.615L9.99997 4.44444V0H5.55553Z" fill="#5CBBD4"/>
                                        <path d="M8.88887 8.88887H1.11111V1.11111H4.99999L3.88888 0H1.11111C0.498332 0 0 0.498332 0 1.11111V8.88887C0 9.50165 0.498332 9.99998 1.11111 9.99998H8.88887C9.50165 9.99998 9.99998 9.50165 9.99998 8.88887V6.1111L8.88887 4.99999V8.88887Z" fill="#5CBBD4"/>
                                    </svg>
                                </a>
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
                                {
                                    this.props.topBakersByDelegation.length && 
                                    <ChartWrapper data= {this.props.topBakersByDelegation}
                                        color= '#3371AA'
                                        height= {250}
                                        xKey= "delegate_value"
                                        yKey= "count_account_id"
                                        spacing= {10}
                                        onLimitChange= {this.onTopBakerByDelegationLimitChange}
                                        xTooltip= {this.xToolTipForTopBakerByDelegation}
                                        yTooltip= {this.yToolTipForTopBakerByDelegation}
                                        _ref= {this.topBakersByDelegationRef}/>
                                }
                            </React.Fragment>
                        }
                        
                    </div>
                    { isTopBakersByDelegationLoading && <Loader /> }         
                </Widget>
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
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchTopBakersByDelegation: (limit: number) => dispatch(fetchTopBakersByDelegation(limit)),
    fetchTopBakersByBlocks: (limit: number, date: number) => dispatch(fetchTopBakersByBlocks(limit, date)),
    fetchTopBakersByStake:  (limit: number) => dispatch(fetchTopBakersByStake(limit)),
});


export const Bakers: any = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(BakersComponent);
