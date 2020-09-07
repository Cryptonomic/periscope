import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import ChartWithoutAxisWrapper from '../../components/ChartgeneratorWithoutAxis';
import { getBaker } from '../../utils/GetBakers';
import Grid from '@material-ui/core/Grid';

import { fetchTopBakersByStake} from '../../reducers/bakers/thunks';
import {
    getTopBakersByStake,
    getTopBakersByStakeQuery

} from '../../reducers/bakers/selectors';

export interface Props {
    topBakersByStake: Array<BakerByStake>;
    topBakersByStakeQuery: string;
    fetchTopBakersByStake: (limit: number) => void;
}

export interface States {
    stakersNames: any,
    topBakerNamesByBlock: any,
    topBakerNamesByDelegation: any
}

export interface BakerByStake {
    pkh: string;
    staking_balance: string;
}

class TopBakersComponent extends React.Component<Props, States> {

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
            topBakerNamesByDelegation: {}
        }
    }

    componentDidMount() {
        this.fetchTopBakersByStakeData(15);
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

    onTopBakerByStakeLimitChange= (limit: number) => {
        limit = limit ? limit : 15;
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
        return (
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <div className="linkHolder">
                        <ul>
                            <li className="rightAlign">
                                <a href={this.props.topBakersByStakeQuery} target="_blank" rel="noopener noreferrer">Top Tezos Bakers
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
                            <ChartWithoutAxisWrapper data= {this.props.topBakersByStake}
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
                                text=''
                                marginLeft={90}/>
                        }
                        
                    </React.Fragment>
                </Grid>       
            </Grid>
        );
    }
}

const mapStateToProps = (state: any) => ({
    topBakersByStake: getTopBakersByStake(state),
    topBakersByStakeQuery: getTopBakersByStakeQuery(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    fetchTopBakersByStake:  (limit: number) => dispatch(fetchTopBakersByStake(limit)),
});


export const TopBakers: any = compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(TopBakersComponent);
