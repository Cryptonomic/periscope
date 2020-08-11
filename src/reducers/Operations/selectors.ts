import { createSelector } from 'reselect';
import { RootState } from '../index';

export const getAppState = (state: RootState) => state.operations;

export const getHourlyVolume = createSelector(getAppState, (operations) => operations.hourlyVolume);

export const getHourlyVolumeLoading = createSelector(getAppState, (operations) => operations.isHourlyVolumeLoading);

export const getHourlyGas = createSelector(getAppState, (operations) => operations.hourlyGas);

export const getHourlyGasLoading = createSelector(getAppState, (operations) => operations.isHourlyGasLoading);

export const getHourlyFee = createSelector(getAppState, (operations) => operations.hourlyFee);

export const getHourlyFeeLoading = createSelector(getAppState, (operations) => operations.isHourlyFeeLoading);

export const getDailyActivation = createSelector(getAppState, (operations) => operations.dailyActivation);

export const getDailyActivationLoading = createSelector(getAppState, (operations) => operations.isDailyActivationLoading);
