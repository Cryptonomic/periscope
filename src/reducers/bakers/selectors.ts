import { createSelector } from 'reselect';
import { RootState } from '../index';

export const getAppState = (state: RootState) => state.bakers;

export const getTopBakersByBlock = createSelector(getAppState, (bakers) => bakers.topBakersByBlock);

export const getTopBakersByBlockLoading = createSelector(getAppState, (bakers) => bakers.isTopBakersByBlockLoading);

export const getTopBakersByStake = createSelector(getAppState, (bakers) => bakers.topBakersByStake);

export const getTopBakersByDelegation = createSelector(getAppState, (bakers) => bakers.topBakersByDelegation);

export const getTopBakersByDelegationLoading = createSelector(getAppState, (bakers) => bakers.isTopBakersByDelegationLoading);

