import {
    SET_TOP_BAKERS_BY_BLOCK,
    SET_TOP_BAKERS_BY_DELEGATION,
    SET_TOP_BAKERS_BY_STAKE,
    SET_TOP_BAKERS_BY_STAKE_LOADING,
    SET_TOP_BAKERS_BY_DELEGATION_LOADING,
    SET_TOP_BAKERS_BY_BLOCK_LOADING,
    SET_TOP_BAKERS_BY_BLOCK_QUERY,
    SET_TOP_BAKERS_BY_DELEGATION_QUERY,
    SET_TOP_BAKERS_BY_STAKE_QUERY,
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

export function setTopBakersByBlockQuery(topBakersByBlockQuery: string) {
    return {
        type: SET_TOP_BAKERS_BY_BLOCK_QUERY,
        topBakersByBlockQuery,
    }
}

export function setTopBakersByStakeQuery(topBakersByStakeQuery: string) {
    return {
        type: SET_TOP_BAKERS_BY_STAKE_QUERY,
        topBakersByStakeQuery,
    }
}

export function setTopBakersByDelegationsQuery(topBakersByDelegationQuery: string) {
    return {
        type: SET_TOP_BAKERS_BY_DELEGATION_QUERY,
        topBakersByDelegationQuery,
    }
}