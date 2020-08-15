import { 
    SET_HOURLY_BLOCK, 
    SET_HOURLY_BLOCK_LOADING, 
    SET_PRIORITY_BLOCK, 
    SET_PRIORITY_BLOCK_LOADING,
    SET_ENDORSEMENT,
    SET_ENDORSEMENT_LOADING
} from './types';

export function setHourlyBlock(hourlyBlock: Array<object>) {
    return {
        type: SET_HOURLY_BLOCK,
        hourlyBlock,
    }
}

export function setHourlyBlockLoading(isHourlyBlockLoading: boolean) {
    return {
        type: SET_HOURLY_BLOCK_LOADING,
        isHourlyBlockLoading,
    }
}


export function setPriorityBlock(priorityBlock: Array<object>) {
    return {
        type: SET_PRIORITY_BLOCK,
        priorityBlock,
    }
}

export function setPriorityBlockLoading(isPriorityBlockLoading: boolean) {
    return {
        type: SET_PRIORITY_BLOCK_LOADING,
        isPriorityBlockLoading,
    }
}

export function setEndorsement(endorsement: Array<object>) {
    return {
        type: SET_ENDORSEMENT,
        endorsement,
    }
}

export function setEndorsementLoading(isEndorsementLoading: boolean) {
    return {
        type: SET_ENDORSEMENT_LOADING,
        isEndorsementLoading,
    }
}
