import { createSelector } from 'reselect';
import { RootState } from '../index';

export const getAppState = (state: RootState) => state.bakers;

export const getTopBakersByBlock = createSelector(getAppState, (bakers) => bakers.topBakersByBlock);

export const getTopBakersByBlockLoading = createSelector(getAppState, (bakers) => bakers.isTopBakersByBlockLoading);

export const getTopBakersByStake = createSelector(getAppState, (bakers) => bakers.topBakersByStake);

export const getTopBakersByStakeLoading = createSelector(getAppState, (bakers) => bakers.isTopBakersByStakeLoading);

export const getTopBakersByDelegation = createSelector(getAppState, (bakers) => bakers.topBakersByDelegation);

export const getTopBakersByDelegationLoading = createSelector(getAppState, (bakers) => bakers.isTopBakersByDelegationLoading);

export const getTopBakersByBlockQuery = createSelector(getAppState, (bakers) => bakers.topBakersByBlockQuery);

export const getTopBakersByStakeQuery = createSelector(getAppState, (bakers) => bakers.topBakersByStakeQuery);

export const getTopBakersByDelegationQuery = createSelector(getAppState, (bakers) => bakers.topBakersByDelegationQuery);
