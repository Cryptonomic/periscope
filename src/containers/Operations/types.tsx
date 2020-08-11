import { RouteComponentProps } from 'react-router-dom';
import { EntityDefinition } from 'conseiljs';

import { Config } from '../../types';

export interface OwnProps {
    hourlyVolume: Array<Operations>;
    isHourlyVolumeLoading: boolean;
    hourlyGas: Array<Operations>;
    isHourlyGasLoading: boolean;
    hourlyFee: Array<Operations>;
    isHourlyFeeLoading: boolean;
    dailyActivation: Array<Operations>;
    isDailyActivationLoading: boolean;
    fetchHourlyVolume: (date: number) => void;
    fetchHourlyGas: (date: number) => void;
    fetchHourlyFee: (date: number) => void;
    fetchDailyActivation: (date: number) => void;
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
    xHourlyVolumeKey: string,
    yHourlyVolumeKey: string,
    xHourlyGasKey: string,
    yHourlyGasKey: string,
    xHourlyFeeKey: string,
    yHourlyFeeKey: string,
}

export interface Operations {
    account_id: string;
    balance: number;
}