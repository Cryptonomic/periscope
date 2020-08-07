import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import {chartGenerator} from '../../utils/chartGenerator';
import {constants} from '../../utils/constants';
import Loader from '../../components/Loader';
import * as d3 from 'd3';
import { debounce } from 'throttle-debounce';

import {
    MainContainer,
    Title,
    Widget
} from './styles';

import { Props, States, BakerByDelegation } from './types';

import { fetchTopBakersByDelegation, fetchTopBakersByBlocks} from '../../reducers/bakers/thunks';
import {
    getTopBakersByDelegation,
    getTopBakersByDelegationLoading,
    getTopBakersByBlock,
    getTopBakersByBlockLoading,

} from '../../reducers/bakers/selectors';

class BakersComponent extends React.Component<Props, States> {

    topBakersByDelegationRef: any = null;
    topBakersByBlockRef: any = null;
    graphContainer: any = null;
    updateLimitDebounce: Function;

    constructor(props: Props) {
        super(props);
        
        this.topBakersByBlockRef = React.createRef();
        this.topBakersByDelegationRef = React.createRef();
        this.graphContainer = React.createRef();
        this.updateLimitDebounce = debounce(1000, false, this.updateLimit);
        this.state = {
            limit: 15,
            bakerByBlockLimit: 15,
        }
    }

    componentDidMount() {
        this.fetchTopBakerByDelegationData();
        this.fetchTopBakerByBlockData();
    }

    async fetchTopBakerByDelegationData(){
        const { fetchTopBakersByDelegation } = this.props;
        // Fetch top ten
        await fetchTopBakersByDelegation(this.state.limit);
        this.generateTopBakerByDelegationGraph(this.props.topBakersByDelegation);
    }

    async fetchTopBakerByBlockData(){
        const { fetchTopBakersByBlocks } = this.props;
        // Fetch top ten
        console.log(constants.one_day_in_milliseconds);
        let timestamp = new Date().getTime() - constants.one_day_in_milliseconds;
        await fetchTopBakersByBlocks(this.state.bakerByBlockLimit, timestamp);
        this.generateTopBakerByBlockGraph(this.props.topBakersByBlock);
    }

    generateTopBakerByDelegationGraph(topBakersByDelegation: Array<BakerByDelegation>) {
        const svg = d3.select(this.topBakersByDelegationRef.current);

        const width = this.graphContainer.current ? this.graphContainer.current.offsetWidth-200 : 0

        chartGenerator.graphGenerator(250, width, svg, topBakersByDelegation,"delegate_value", "count_account_id", '#3371AA' ,10);
        const self = this;
        const xTooltip = function(d: any, i: number) {
            return self.getFormattedToken(topBakersByDelegation[i].delegate_value);
        }
    
        const yTooltip = function(d: any, i: number) {
            return topBakersByDelegation[i].count_account_id.toLocaleString()
        }

        chartGenerator.barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip);
    }

    generateTopBakerByBlockGraph(topBakersByBlock: any) {
        const svg = d3.select(this.topBakersByBlockRef.current);

        const width = this.graphContainer.current ? this.graphContainer.current.offsetWidth-200 : 0

        chartGenerator.graphGenerator(250, width, svg, topBakersByBlock, "baker", "count_hash", '#3371AA' ,10);
        const self = this;
        const xTooltip = function(d: any, i: number) {
            return self.getFormattedToken(topBakersByBlock[i].baker);
        }
    
        const yTooltip = function(d: any, i: number) {
            return topBakersByBlock[i].count_hash.toLocaleString()
        }

        chartGenerator.barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip);
    }

    getFormattedToken = (tokenId: string) => {
        let subStr1 = tokenId.substring(0, 6);
        let subStr2 = tokenId.substring(tokenId.length-6, tokenId.length);
        return `${subStr1}...${subStr2}`;
    }

    updateLimit = (limit: number) => {
        limit = limit ? limit : 15;
        if(limit <= 1000) {
            this.fetchTopBakerByDelegationData();
        } else {
            this.setState({limit: 1000});
        }
        
    }

    render() {
        const { isTopBakersByDelegationLoading } = this.props;
        const { limit } = this.state;
        const width = this.graphContainer.current ? this.graphContainer.current.offsetWidth-200 : 0
        const svgLength = `0,0,${width},300`;
        return (
            <MainContainer>
                <Title>Bakers</Title>
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
                                <div className="pos-abs">
                                    <p>
                                        <span>View Top</span>
                                        <input type="number" value={limit} onChange={(e)=> {this.setState({ limit: parseInt(e.target.value) });this.updateLimitDebounce(e.target.value)}}/>
                                        <span>Accounts</span>
                                    </p>
                                </div>
                                <div className="graph-holder" ref={this.graphContainer}>
                                    {/* <svg ref={this.yAxis}></svg> */}
                                    <svg viewBox={svgLength} className="account-graph" ref={this.topBakersByBlockRef}></svg>
                                    {/* <svg ref={this.xAxis}></svg> */}
                                </div>
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
                                <div className="pos-abs">
                                    <p>
                                        <span>View Top</span>
                                        <input type="number" value={limit} onChange={(e)=> {this.setState({ limit: parseInt(e.target.value) });this.updateLimitDebounce(e.target.value)}}/>
                                        <span>Accounts</span>
                                    </p>
                                </div>
                                <div className="graph-holder" ref={this.graphContainer}>
                                    {/* <svg ref={this.yAxis}></svg> */}
                                    <svg viewBox={svgLength} className="account-graph" ref={this.topBakersByDelegationRef}></svg>
                                    {/* <svg ref={this.xAxis}></svg> */}
                                </div>
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
    isTopBakersByBlockLoading :getTopBakersByBlockLoading(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchTopBakersByDelegation: (limit: number) => dispatch(fetchTopBakersByDelegation(limit)),
    fetchTopBakersByBlocks: (limit: number, date: number) => dispatch(fetchTopBakersByBlocks(limit, date))
});


export const Bakers: any = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(BakersComponent);
