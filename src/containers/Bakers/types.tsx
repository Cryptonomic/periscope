import { RouteComponentProps } from 'react-router-dom';
import { EntityDefinition } from 'conseiljs';

import { Config } from '../../types';

export interface OwnProps {
    topBakersByDelegation: Array<BakerByDelegation>;
    topBakersByStake: Array<BakerByStake>;
    isTopBakersByDelegationLoading: boolean;
    topBakersByBlock: Array<BakerByBlock>;
    isTopBakersByBlockLoading: boolean;
    isTopBakerByStateLoading: boolean;
    topBakersByDelegationQuery: string;
    topBakersByStakeQuery: string;
    topBakersByBlockQuery: string;
    fetchTopBakersByDelegation: (limit: number) => void;
    fetchTopBakersByStake: (limit: number) => void;
    fetchTopBakersByBlocks: (limit: number, date: number) => void;
}

export interface RouteComponentWithParmas extends RouteComponentProps {
    match: {
        params: Record<string, string>;
        path: string;
        url: string;
        isExact: boolean;
    };
}

export type Props = OwnProps & RouteComponentWithParmas;

export interface States {
    stakersNames: any,
    topBakerNamesByBlock: any,
    topBakerNamesByDelegation: any,
    topBakerByBlockFilter: string,
}

export interface BakerByDelegation {
    count_account_id: string;
    delegate_value: string;
}

export interface BakerByBlock {
    baker: string;
    count_hash: string;
}

export interface BakerByStake {
    pkh: string;
    staking_balance: string;
}
