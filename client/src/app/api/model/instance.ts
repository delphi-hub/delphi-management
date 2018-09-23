/**
 * Delphi Instance Registry
 * This is a sample client side  for Delphi Instance Registry.
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface Instance {
    id?: number;
    host?: string;
    portNumber?: number;
    name?: string;
    /**
     * Component Type
     */
    componentType?: Instance.ComponentTypeEnum;
}
export namespace Instance {
    export type ComponentTypeEnum = 'Crawler' | 'WebApi' | 'WebApp' | 'DelphiManagement';
    export const ComponentTypeEnum = {
        Crawler: 'Crawler' as ComponentTypeEnum,
        WebApi: 'WebApi' as ComponentTypeEnum,
        WebApp: 'WebApp' as ComponentTypeEnum,
        DelphiManagement: 'DelphiManagement' as ComponentTypeEnum
    };
}
