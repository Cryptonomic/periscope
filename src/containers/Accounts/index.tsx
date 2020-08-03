import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import {chartGenerator} from '../../utils/chartGenerator';
import * as d3 from 'd3';
import { debounce } from 'throttle-debounce';

import {
    MainContainer,
    Title,
    Widget
} from './styles';

import { Props, States, AccountsType } from './types';

import { fetchTopAccounts} from '../../reducers/accounts/thunks';
import {
    getTopAccounts,
    getTopAccountsLoading,
} from '../../reducers/accounts/selectors';

class AccountsComponent extends React.Component<Props, States> {

    topAccountsRef: any = null;
    xAxis: any = null;
    yAxis: any = null;
    graphContainer: any = null;
    updateLimitDebounce: Function;

    constructor(props: Props) {
        super(props);
        
        this.topAccountsRef = React.createRef();
        this.xAxis = React.createRef();
        this.yAxis = React.createRef();
        this.graphContainer = React.createRef();
        this.updateLimitDebounce = debounce(300, this.updateLimit);
        this.state = {
            limit: 15
        }
    }

    componentDidMount() {
        this.fetchTopAccountsData();
    }

    async fetchTopAccountsData(){
        const { fetchTopAccounts } = this.props;
        // Fetch top ten
        await fetchTopAccounts(this.state.limit);
        this.generateTopAccountGraph(this.props.topAccounts);
    }

    generateTopAccountGraph(topAccounts: Array<AccountsType>) {
        const svg = d3.select(this.topAccountsRef.current);
        const yAxisSvg = d3.select(this.yAxis.current);
        const xAxisSvg = d3.select(this.xAxis.current);

        const height = this.graphContainer.current ? this.graphContainer.current.offsetWidth-200 : 0

        chartGenerator.seperateAxisPrioritizedBarChartGenerator(250, height, svg, topAccounts,"account_id", "balance", '#697A21',  '',  '', 15, '#697A21');
        chartGenerator.yAxisGenerator(yAxisSvg, 250, topAccounts, 'balance', '');
        chartGenerator.xAxisGenerator(xAxisSvg, height, 250,topAccounts, 'balance', '' )
        const xTooltip = function(d: any, i: number) {
            return topAccounts[i].account_id
        }
    
        const yTooltip = function(d: any, i: number) {
            return d + " ꜩ"
        }

        chartGenerator.barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip);
    }

    updateLimit = (limit: number) => {
        limit = limit ? limit : 15; 
        this.setState({ limit });
        this.fetchTopAccountsData();
    }

    render() {
        const { isLoading } = this.props;
        const { limit } = this.state;
        return (
            <MainContainer>
                <Title>Accounts</Title>
                <Widget>
                    <h3>Top Tez Holders</h3>
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
                            isLoading 
                            ? <p>Loading...</p> :
                            <React.Fragment>
                                <div className="pos-abs">
                                    <p>
                                        <span>View Top</span>
                                        <input type="number" value={limit} onChange={(e)=> this.updateLimitDebounce(e.target.value)}/>
                                        <span>Accounts</span>
                                    </p>
                                </div>
                                <div className="graph-holder" ref={this.graphContainer}>
                                    <svg ref={this.yAxis}></svg>
                                    <svg className="account-graph" ref={this.topAccountsRef}></svg>
                                    <svg ref={this.xAxis}></svg>
                                </div>
                            </React.Fragment>
                        }
                        
                    </div>
                </Widget>
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: any) => ({
    topAccounts: getTopAccounts(state),
    isLoading: getTopAccountsLoading(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchTopAccounts: (limit: number) => dispatch(fetchTopAccounts(limit)),
});


export const Accounts: any = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(AccountsComponent);
