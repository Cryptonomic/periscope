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
 
export function setHourlyTransaction(hourlyTransaction: Array<object>) {
    return {
        type: SET_HOURLY_TRANSACTION,
        hourlyTransaction,
    }
}

export function setHourlyTransactionLoading(isHourlyTransactionLoading: boolean) {
    return {
        type: SET_HOURLY_TRANSACTION_LOADING,
        isHourlyTransactionLoading,
    }
}

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

export function setDailyOrigination(dailyOrigination: Array<object>) {
    return {
        type: SET_DAILY_ORIGINATION,
        dailyOrigination,
    }
}

export function setDailyOriginationLoading(isDailyOriginationLoading: boolean) {
    return {
        type: SET_DAILY_ORIGINATION_LOADING,
        isDailyOriginationLoading,
    }
}

export function setHourlyTransactionQuery(hourlyTransactionQuery: string) {
    return {
        type: SET_HOURLY_TRANSACTION_QUERY,
        hourlyTransactionQuery,
    }
}

export function setHourlyVolumeQuery(hourlyVolumeQuery: string) {
    return {
        type: SET_HOURLY_VOLUME_QUERY,
        hourlyVolumeQuery,
    }
}

export function setHourlyGasQuery(hourlyGasQuery: string) {
    return {
        type: SET_HOURLY_GAS_QUERY,
        hourlyGasQuery,
    }
}

export function setHourlyFeeQuery(hourlyFeeQuery: string) {
    return {
        type: SET_HOURLY_FEE_QUERY,
        hourlyFeeQuery,
    }
}

export function setDailyActivationQuery(dailyActivationQuery: string) {
    return {
        type: SET_DAILY_ACTIVATION_QUERY,
        dailyActivationQuery,
    }
}

export function setDailyOriginationQuery(dailyOriginationQuery: string) {
    return {
        type: SET_DAILY_ORIGINATION_QUERY,
        dailyOriginationQuery,
    }
}