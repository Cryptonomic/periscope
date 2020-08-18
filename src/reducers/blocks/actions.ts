import { 
    SET_HOURLY_BLOCK, 
    SET_HOURLY_BLOCK_LOADING, 
    SET_PRIORITY_BLOCK, 
    SET_PRIORITY_BLOCK_LOADING,
    SET_ENDORSEMENT,
    SET_ENDORSEMENT_LOADING,
    SET_ENDORSEMENT_QUERY,
    SET_HOURLY_BLOCK_QUERY,
    SET_PRIORITY_BLOCK_QUERY
} from './types';

export function setHourlyBlock(hourlyBlock: Array<object>) {
    return {
        type: SET_HOURLY_BLOCK,
        hourlyBlock,
    }
}

export function setHourlyBlockQuery(hourlyBlockQuery: string) {
    return {
        type: SET_HOURLY_BLOCK_QUERY,
        hourlyBlockQuery,
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

export function setPriorityBlockQuery(priorityBlockQuery: string) {
    return {
        type: SET_PRIORITY_BLOCK_QUERY,
        priorityBlockQuery,
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

export function setEndorsementQuery(endorsementQuery: string) {
    return {
        type: SET_ENDORSEMENT_QUERY,
        endorsementQuery,
    }
}

export function setEndorsementLoading(isEndorsementLoading: boolean) {
    return {
        type: SET_ENDORSEMENT_LOADING,
        isEndorsementLoading,
    }
}
