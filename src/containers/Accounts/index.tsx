import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import Loader from '../../components/Loader';
import ChartWrapper from '../../components/ChartGenerator';

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
    getTopAccountsQuery
} from '../../reducers/accounts/selectors';

class AccountsComponent extends React.Component<Props, States> {

    topAccountsRef: any = null;

    constructor(props: Props) {
        super(props);
        
        this.topAccountsRef = React.createRef();
        this.state = {
            limit: 15
        }
    }

    componentDidMount() {
        this.fetchTopAccountsData(15);
    }

    async fetchTopAccountsData(limit: number){
        const { fetchTopAccounts } = this.props;
        // Fetch top ten
        await fetchTopAccounts(limit);
    }

    xTooltip = (d: any, i: number) => {
        return this.getFormattedToken(d.account_id);
    }

    yTooltip = (d: any, i: number) => {
        return d.balance.toLocaleString() + " ꜩ"
    }

    getFormattedToken = (tokenId: string) => {
        let subStr1 = tokenId.substring(0, 6);
        let subStr2 = tokenId.substring(tokenId.length-6, tokenId.length);
        return `${subStr1}...${subStr2}`;
    }

    onLimitUpdate = (limit: number) => {

        this.fetchTopAccountsData(limit);
        
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
                                <a href={this.props.topAccountsQuery}>Arronax Query
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
                            this.props.topAccounts.length && 
                            <ChartWrapper data= {this.props.topAccounts}
                                color= '#697A21'
                                hoverColor='#B4BD90'
                                height= {250}
                                xKey= "account_id"
                                yKey= "balance"
                                spacing= {10}
                                onLimitChange= {this.onLimitUpdate}
                                xTooltip= {this.xTooltip}
                                yTooltip= {this.yTooltip}
                                _ref= {this.topAccountsRef}
                                isLimitAvailable={true}
                                isDateFilter={false}
                                text=''/>
                        }
                    </React.Fragment>
                        
                    { isLoading && <Loader /> }         
                    </Widget>
            </MainContainer>
        );
    }
}

const mapStateToProps = (state: any) => ({
    topAccounts: getTopAccounts(state),
    isLoading: getTopAccountsLoading(state),
    topAccountsQuery: getTopAccountsQuery(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchTopAccounts: (limit: number) => dispatch(fetchTopAccounts(limit)),
});


export const Accounts: any = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(AccountsComponent);
