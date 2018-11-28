
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

