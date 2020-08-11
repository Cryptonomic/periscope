import { 
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
 } from './types';
import { getConfigs } from '../../utils/getconfig';
import { Config } from '../../types';

const configs = getConfigs();

export interface AppState {
    hourlyVolume: Array<object>,
    isHourlyVolumeLoading: boolean,
    hourlyGas: Array<object>,
    isHourlyGasLoading: boolean,
    hourlyFee: Array<object>,
    isHourlyFeeLoading: boolean,
    dailyActivation: Array<object>,
    isDailyActivationLoading: boolean,
    configs: Config[];
    selectedConfig: Config;
}
let initialState: AppState = {
    configs,
    selectedConfig: configs[0],
    hourlyVolume: [],
    isHourlyVolumeLoading: false,
    hourlyGas: [],
    isHourlyGasLoading: false,
    hourlyFee: [],
    isHourlyFeeLoading: false,
    dailyActivation: [],
    isDailyActivationLoading: false
}

export const operations = (state = initialState, action: any) => {
  switch (action.type) {
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
    default:
      return state;
  }
}
