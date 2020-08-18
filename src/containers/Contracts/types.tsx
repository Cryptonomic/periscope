import { RouteComponentProps } from 'react-router-dom';
import { EntityDefinition } from 'conseiljs';

import { Config } from '../../types';

export interface OwnProps {
    topContractsByBalance: Array<ContracyByBalance>;
    isTopContractsByBalanceLoading: boolean;
    topContractsByInvocation: Array<ContracyByInvocation>;
    isTopContractsByInvocationLoading: boolean;
    topContractsByInvocationQuery: string,
    topContractsByBalanceQuery: string,
    fetchTopContractsByBalance: (limit: number) => void;
    fetchTopContractsByInvocation: (limit: number, date: number) => void;
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

export interface ContracyByBalance {
    account_id: string;
    balance: number;
}

export interface ContracyByInvocation {
    destination: string;
    count_operation_group_hash: string;
}
