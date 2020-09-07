import { createSelector } from 'reselect';
import { RootState } from '../index';

export const getAppState = (state: RootState) => state.contracts;

export const getTopContractsByBalance = createSelector(getAppState, (contracts) => contracts.topContractsByBalance);

export const getTopContractsByInvocation = createSelector(getAppState, (contracts) => contracts.topContractsByInvocation);

export const getTopContractsByBalanceLoading = createSelector(getAppState, (contracts) => contracts.isTopContractsByBalance);

export const getTopContractsByInvocationLoading = createSelector(getAppState, (contracts) => contracts.isTopContractsByInvocationLoading);

export const getTopContractsByBalanceQuery = createSelector(getAppState, (contracts) => contracts.topContractsByBalanceQuery);

export const getTopContractsByInvocationQuery = createSelector(getAppState, (contracts) => contracts.topContractsByInvocationQuery);
