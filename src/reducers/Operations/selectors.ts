import { createSelector } from 'reselect';
import { RootState } from '../index';

export const getAppState = (state: RootState) => state.operations;

export const getHourlyTransaction = createSelector(getAppState, (operations) => operations.hourlyTransaction);

export const getHourlyTransactionLoading = createSelector(getAppState, (operations) => operations.isHourlyTransactionLoading);

export const getHourlyVolume = createSelector(getAppState, (operations) => operations.hourlyVolume);

export const getHourlyVolumeLoading = createSelector(getAppState, (operations) => operations.isHourlyVolumeLoading);

export const getHourlyGas = createSelector(getAppState, (operations) => operations.hourlyGas);

export const getHourlyGasLoading = createSelector(getAppState, (operations) => operations.isHourlyGasLoading);

export const getHourlyFee = createSelector(getAppState, (operations) => operations.hourlyFee);

export const getHourlyFeeLoading = createSelector(getAppState, (operations) => operations.isHourlyFeeLoading);

export const getDailyActivation = createSelector(getAppState, (operations) => operations.dailyActivation);

export const getDailyActivationLoading = createSelector(getAppState, (operations) => operations.isDailyActivationLoading);

export const getDailyOrigination = createSelector(getAppState, (operations) => operations.dailyOrigination);

export const getDailyOriginationLoading = createSelector(getAppState, (operations) => operations.isDailyOriginationLoading);

export const getHourlyTransactionQuery = createSelector(getAppState, (operations) => operations.hourlyTransactionQuery);

export const getHourlyVolumeQuery = createSelector(getAppState, (operations) => operations.hourlyVolumeQuery);

export const getHourlyGasQuery = createSelector(getAppState, (operations) => operations.hourlyGasQuery);

export const getHourlyFeeQuery = createSelector(getAppState, (operations) => operations.hourlyFeeQuery);

export const getDailyActivationQuery = createSelector(getAppState, (operations) => operations.dailyActivationQuery);

export const getDailyOriginationQuery = createSelector(getAppState, (operations) => operations.dailyOriginationQuery);
