import { RouteComponentProps } from 'react-router-dom';
import { EntityDefinition } from 'conseiljs';

import { Config } from '../../types';

export interface OwnProps {
    isError: boolean;
    message: string;
    initMessage: () => void;
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
