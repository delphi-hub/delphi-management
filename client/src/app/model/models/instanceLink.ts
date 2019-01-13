import { Instance } from './instance';

export interface InstanceLink {
    idFrom: number;
    idTo: number;
    /**
     * Valid states for an InstanceLink
     */
    linkState: LinkStateEnum;
}

    export type LinkStateEnum = 'Assigned' | 'Outdated' | 'Failed';
    export const LinkStateEnum = {
        Assigned: 'Assigned' as LinkStateEnum,
        Outdated: 'Outdated' as LinkStateEnum,
        Failed: 'Failed' as LinkStateEnum
    };

    export interface InstanceLinkPayload {
        link: InstanceLink;
        instanceFrom: Instance;
        instanceTo: Instance;
    }

    export function objIsLink(obj: any): obj is InstanceLink {
        return obj.idFrom !== undefined && typeof obj.idFrom === 'number' && obj.idTo !== undefined && typeof obj.idTo === 'number' &&
                obj.linkState !== undefined && obj.linkState in LinkStateEnum;
    }
