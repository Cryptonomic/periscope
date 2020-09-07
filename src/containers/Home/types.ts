import { RouteComponentProps } from 'react-router-dom';
import { EntityDefinition } from 'conseiljs';

import { Config } from '../../types';

export interface OwnProps {
    topAccounts: AccountsType[];
    isLoading: boolean;
    hourlyTransaction: Array<Operations>;
    isHourlyTransactionLoading: boolean;
    hourlyVolume: Array<Operations>;
    isHourlyVolumeLoading: boolean;
    hourlyTransactionQuery: string,                 
    hourlyVolumeQuery: string;
    hourlyGas: Array<Operations>;
    isHourlyGasLoading: boolean;
    hourlyGasQuery: string;
    isHourlyBlockLoading: boolean;
    isPriorityBlockLoading: boolean;
    isEndorsementLoading: boolean;
    isTopBakerByStateLoading: boolean;
    fetchTopAccounts: (limit: number) => void;
    fetchHourlyTransaction: (date: number) => void;
    fetchHourlyVolume: (date: number) => void;
    fetchHourlyGas: (date: number) => void;
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
    limit: number;
    xHourlyTransactionKey: string,
    yHourlyTransactionKey: string,
    xHourlyVolumeKey: string,
    yHourlyVolumeKey: string,
    xHourlyGasKey: string,
    yHourlyGasKey: string,
    hourlyTransactionFilter: string,
    HourlyVolumeFilter: string,
    hourlyGasFilter: string,
}

export interface AccountsType {
    account_id: string;
    balance: number;
}


export interface Operations {
    account_id: string;
    balance: number;
}
