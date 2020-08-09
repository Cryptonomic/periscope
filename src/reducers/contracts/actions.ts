import {
    SET_TOP_BAKERS_BY_BLOCK,
    SET_TOP_BAKERS_BY_DELEGATION,
    SET_TOP_BAKERS_BY_STAKE,
    SET_TOP_BAKERS_BY_STAKE_LOADING,
    SET_TOP_BAKERS_BY_DELEGATION_LOADING,
    SET_TOP_BAKERS_BY_BLOCK_LOADING
} from './types';

export function setTopBakersByBlock(topBakersByBlock: Array<object>) {
    return {
        type: SET_TOP_BAKERS_BY_BLOCK,
        topBakersByBlock,
    }
}

export function setTopBakersByStake(topBakersByStake: Array<object>) {
    return {
        type: SET_TOP_BAKERS_BY_STAKE,
        topBakersByStake,
    }
}

export function setTopBakersByDelegations(topBakersByDelegation: Array<object>) {
    return {
        type: SET_TOP_BAKERS_BY_DELEGATION,
        topBakersByDelegation,
    }
}

export function setTopBakersByStakeLoading(isTopBakersByStakeLoading: boolean) {
    return {
        type: SET_TOP_BAKERS_BY_STAKE_LOADING,
        isTopBakersByStakeLoading,
    }
}

export function setTopBakersByDelegationLoading(isTopBakersByDelegationLoading: boolean) {
    return {
        type: SET_TOP_BAKERS_BY_DELEGATION_LOADING,
        isTopBakersByDelegationLoading,
    }
}

export function setTopBakersByBlockLoading(isTopBakersByBlockLoading: boolean) {
    return {
        type: SET_TOP_BAKERS_BY_BLOCK_LOADING,
        isTopBakersByBlockLoading,
    }
}