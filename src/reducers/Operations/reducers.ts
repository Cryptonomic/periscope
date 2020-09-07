import { 
    SET_HOURLY_TRANSACTION,
    SET_HOURLY_TRANSACTION_LOADING,
    SET_HOURLY_VOLUME,
    SET_HOURLY_VOLUME_LOADING,
    SET_HOURLY_GAS,
    SET_HOURLY_GAS_LOADING,
    SET_HOURLY_FEE,
    SET_HOURLY_FEE_LOADING,
    SET_DAILY_ACTIVATION,
    SET_DAILY_ACTIVATION_LOADING,
    SET_DAILY_ORIGINATION,
    SET_DAILY_ORIGINATION_LOADING,
    SET_HOURLY_TRANSACTION_QUERY,
    SET_HOURLY_VOLUME_QUERY,
    SET_HOURLY_GAS_QUERY,
    SET_HOURLY_FEE_QUERY,
    SET_DAILY_ACTIVATION_QUERY,
    SET_DAILY_ORIGINATION_QUERY
 } from './types';
import { getConfigs } from '../../utils/getconfig';
import { Config } from '../../types';

const configs = getConfigs();

export interface AppState {
    hourlyTransaction: Array<object>,
    isHourlyTransactionLoading: boolean,
    hourlyVolume: Array<object>,
    isHourlyVolumeLoading: boolean,
    hourlyGas: Array<object>,
    isHourlyGasLoading: boolean,
    hourlyFee: Array<object>,
    isHourlyFeeLoading: boolean,
    dailyActivation: Array<object>,
    isDailyActivationLoading: boolean,
    dailyOrigination: Array<object>,
    isDailyOriginationLoading: boolean,
    configs: Config[];
    selectedConfig: Config;
    hourlyTransactionQuery: string;
    hourlyVolumeQuery: string;
    hourlyGasQuery: string;
    hourlyFeeQuery: string;
    dailyActivationQuery: string;
    dailyOriginationQuery: string;
}
let initialState: AppState = {
    configs,
    selectedConfig: configs[0],
    hourlyTransaction: [],
    isHourlyTransactionLoading: false,
    hourlyVolume: [],
    isHourlyVolumeLoading: false,
    hourlyGas: [],
    isHourlyGasLoading: false,
    hourlyFee: [],
    isHourlyFeeLoading: false,
    dailyActivation: [],
    isDailyActivationLoading: false,
    dailyOrigination: [],
    isDailyOriginationLoading: false,
    hourlyTransactionQuery: '',
    hourlyVolumeQuery: '',
    hourlyGasQuery: '',
    hourlyFeeQuery: '',
    dailyActivationQuery: '',
    dailyOriginationQuery: '',
}

export const operations = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_HOURLY_TRANSACTION:
        return { ...state, hourlyTransaction: action.hourlyTransaction };
    case SET_HOURLY_TRANSACTION_LOADING:
        return { ...state, isHourlyTransactionLoading: action.isHourlyTransactionLoading };
    case SET_HOURLY_VOLUME:
        return { ...state, hourlyVolume: action.hourlyVolume };
    case SET_HOURLY_VOLUME_LOADING:
        return { ...state, isHourlyVolumeLoading: action.isHourlyVolumeLoading };
    case SET_HOURLY_GAS:
        return { ...state, hourlyGas: action.hourlyGas };
    case SET_HOURLY_GAS_LOADING:
        return { ...state, isHourlyGasLoading: action.isHourlyGasLoading };
    case SET_HOURLY_FEE:
        return { ...state, hourlyFee: action.hourlyFee };
    case SET_HOURLY_FEE_LOADING:
        return { ...state, isHourlyFeeLoading: action.isHourlyFeeLoading };
    case SET_DAILY_ACTIVATION:
        return { ...state, dailyActivation: action.dailyActivation };
    case SET_DAILY_ACTIVATION_LOADING:
        return { ...state, isDailyActivationLoading: action.isDailyActivationLoading };
    case SET_DAILY_ORIGINATION:
        return { ...state, dailyOrigination: action.dailyOrigination };
    case SET_DAILY_ORIGINATION_LOADING:
        return { ...state, isDailyOriginationLoading: action.isDailyOriginationLoading };

    case SET_HOURLY_TRANSACTION_QUERY:
        return { ...state, hourlyTransactionQuery: action.hourlyTransactionQuery };
    case SET_HOURLY_VOLUME_QUERY:
        return { ...state, hourlyVolumeQuery: action.hourlyVolumeQuery };
    case SET_HOURLY_GAS_QUERY:
        return { ...state, hourlyGasQuery: action.hourlyGasQuery };
    case SET_HOURLY_FEE_QUERY:
        return { ...state, hourlyFeeQuery: action.hourlyFeeQuery };
    case SET_DAILY_ACTIVATION_QUERY:
        return { ...state, dailyActivationQuery: action.dailyActivationQuery };
    case SET_DAILY_ORIGINATION_QUERY:
        return { ...state, dailyOriginationQuery: action.dailyOriginationQuery };
    default:
      return state;
  }
}
