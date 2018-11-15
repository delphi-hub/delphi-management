
import { Instance } from './instance';
import { InstanceLink } from './instanceLink';


export interface InstanceNetwork {
    instances: Array<Instance>;
    links: Array<InstanceLink>;
}
