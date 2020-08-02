import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import {chartGenerator} from '../../utils/chartGenerator';
import * as d3 from 'd3';

import {
    MainContainer,
    Title,
    Widget
} from './styles';

import { Props, AccountsType } from './types';

import { fetchTopAccounts} from '../../reducers/accounts/thunks';
import {
    getTopAccounts,
    getTopAccountsLoading,
} from '../../reducers/accounts/selectors';

class AccountsComponent extends React.Component<Props> {

    topAccountsRef: any = null;
    xAxis: any = null;
    yAxis: any = null;

    constructor(props: Props) {
        super(props);
        
        this.topAccountsRef = React.createRef();
        this.xAxis = React.createRef();
        this.yAxis = React.createRef();
    }

    async componentDidMount() {
        const { fetchTopAccounts } = this.props;
        // Fetch top ten
        await fetchTopAccounts(15);
        this.generateTopAccountGraph(this.props.topAccounts);
    }

    generateTopAccountGraph(topAccounts: Array<AccountsType>) {
        const svg = d3.select(this.topAccountsRef.current);
        const yAxisSvg = d3.select(this.yAxis.current);
        const xAxisSvg = d3.select(this.xAxis.current);

        chartGenerator.seperateAxisPrioritizedBarChartGenerator(250, 1100, svg, topAccounts,"account_id", "balance", '#697A21',  '',  '', 15, '#697A21');
        chartGenerator.yAxisGenerator(yAxisSvg, 250, topAccounts, 'balance', '');
        chartGenerator.xAxisGenerator(xAxisSvg, 1150, 250,topAccounts, 'balance', '' )
        const xTooltip = function(d: any, i: number) {
            return topAccounts[i].account_id
        }
    
        const yTooltip = function(d: any, i: number) {
            return d + " ꜩ"
        }

        chartGenerator.barGraphFloatingTooltipGenerator(svg, xTooltip, yTooltip);
    }



    render() {
        const { isLoading } = this.props;
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
                                <svg ref={this.yAxis}></svg>
                                <svg className="account-graph" ref={this.topAccountsRef}></svg>
                                <svg ref={this.xAxis}></svg>
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
