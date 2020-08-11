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
    SET_DAILY_ORIGINATION_LOADING
 } from './types';

export function setHourlyVolume(hourlyVolume: Array<object>) {
    return {
        type: SET_HOURLY_VOLUME,
        hourlyVolume,
    }
}

export function setHourlyVolumeLoading(isHourlyVolumeLoading: boolean) {
    return {
        type: SET_HOURLY_VOLUME_LOADING,
        isHourlyVolumeLoading,
    }
}

export function setHourlyGas(hourlyGas: Array<object>) {
    return {
        type: SET_HOURLY_GAS,
        hourlyGas,
    }
}

export function setHourlyGasLoading(isHourlyGasLoading: boolean) {
    return {
        type: SET_HOURLY_GAS_LOADING,
        isHourlyGasLoading,
    }
}

export function setHourlyFee(hourlyFee: Array<object>) {
    return {
        type: SET_HOURLY_FEE,
        hourlyFee,
    }
}

export function setHourlyFeeLoading(isHourlyFeeLoading: boolean) {
    return {
        type: SET_HOURLY_FEE_LOADING,
        isHourlyFeeLoading,
    }
}

export function setDailyActivation(dailyActivation: Array<object>) {
    return {
        type: SET_DAILY_ACTIVATION,
        dailyActivation,
    }
}

export function setDailyActivationLoading(isDailyActivationLoading: boolean) {
    return {
        type: SET_DAILY_ACTIVATION_LOADING,
        isDailyActivationLoading,
    }
}
