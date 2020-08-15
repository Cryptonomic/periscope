import { createSelector } from 'reselect';
import { RootState } from '../index';

export const getAppState = (state: RootState) => state.blocks;

export const getHourlyBlock = createSelector(getAppState, (blocks) => blocks.hourlyBlock);

export const getHourlyBlockLoading = createSelector(getAppState, (blocks) => blocks.isHourlyBlockLoading);

export const getPriorityBlock = createSelector(getAppState, (blocks) => blocks.priorityBlock);

export const getPriorityBlockLoading = createSelector(getAppState, (blocks) => blocks.isPriorityBlockLoading);

export const getEndorsement = createSelector(getAppState, (blocks) => blocks.endorsement);

export const getEndorsementLoading = createSelector(getAppState, (blocks) => blocks.isEndorsementLoading);

