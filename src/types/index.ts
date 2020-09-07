import { ConseilSortDirection, ConseilFunction } from 'conseiljs';

export interface Config {
    url: string;
    apiKey: string;
    platform: string;
    network: string;
    displayName: string;
    nodeUrl?: string;
    entities?: string[];
    hiddenEntities?: string[];
    isLocal?: boolean;
}
