import { RouteComponentProps } from 'react-router-dom';
import { EntityDefinition } from 'conseiljs';

import { Config } from '../../types';

export interface OwnProps {
    hourlyTransaction: Array<Operations>;
    isHourlyTransactionLoading: boolean;
    hourlyVolume: Array<Operations>;
    isHourlyVolumeLoading: boolean;
    hourlyGas: Array<Operations>;
    isHourlyGasLoading: boolean;
    hourlyFee: Array<Operations>;
    isHourlyFeeLoading: boolean;
    dailyActivation: Array<Operations>;
    isDailyActivationLoading: boolean;
    dailyOrigination: Array<Operations>;
    isDailyOriginationLoading: boolean;
    hourlyTransactionQuery: string,                 
    hourlyVolumeQuery: string;
    hourlyGasQuery: string;
    hourlyFeeQuery:string;
    dailyActivationQuery: string;
    dailyOriginationQuery: string;
    fetchHourlyTransaction: (date: number) => void;
    fetchHourlyVolume: (date: number) => void;
    fetchHourlyGas: (date: number) => void;
    fetchHourlyFee: (date: number) => void;
    fetchDailyActivation: (date: number) => void;
    fetchDailyOrigination: (date: number) => void;
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
    xHourlyTransactionKey: string,
    yHourlyTransactionKey: string,
    xHourlyVolumeKey: string,
    yHourlyVolumeKey: string,
    xHourlyGasKey: string,
    yHourlyGasKey: string,
    xHourlyFeeKey: string,
    yHourlyFeeKey: string,
    selectedHourlyTransactionFilter: string,
    selectedHourlyVolumeFilter: string,
    selectedHourlyGasFilter: string,
    selectedHourlyFeeFilter: string,
}

export interface Operations {
    account_id: string;
    balance: number;
}