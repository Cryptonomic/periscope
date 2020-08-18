import { RouteComponentProps } from 'react-router-dom';
import { EntityDefinition } from 'conseiljs';

import { Config } from '../../types';

export interface OwnProps {
    hourlyBlock: Blocks[];
    isHourlyBlockLoading: boolean;
    priorityBlock: Blocks[];
    isPriorityBlockLoading: boolean;
    endorsement: Blocks[];
    isEndorsementLoading: boolean;
    hourlyBlockQuery: string,
    endorsementQuery: string,
    priorityBlockQuery: string,
    fetchPriorityBlock: (date: number) => void;
    fetchHourlyBlock: (date: number) => void;
    fetchEndorsement: (date: number) => void;
}

export interface RouteComponentWithParmas extends RouteComponentProps {
    match: {
        params: Record<string, string>;
        path: string;
        url: string;
        isExact: boolean;
    };
}

export type Props = OwnProps & RouteComponentWithParmas;

export interface States {
    hourlyBlocksFilter: string,
    priorityBlockFilter: string,
    endorsementFilter: string,
    hourlyBlockGraphText: string,
    priorityBlockGraphText: string,
    endorsementGraphText: string
}

export interface Blocks {
    timestamp: number;
    value: number;
}
