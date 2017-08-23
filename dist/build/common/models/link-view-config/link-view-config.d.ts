import { Instance } from 'immutable-class';
import { LinkItem, LinkItemJS, LinkItemContext } from '../link-item/link-item';
export interface LinkViewConfigValue {
    title: string;
    linkItems: LinkItem[];
}
export interface LinkViewConfigJS {
    title: string;
    linkItems: LinkItemJS[];
}
export declare type LinkViewConfigContext = LinkItemContext;
export declare class LinkViewConfig implements Instance<LinkViewConfigValue, LinkViewConfigJS> {
    static isLinkViewConfig(candidate: any): candidate is LinkViewConfig;
    static fromJS(parameters: LinkViewConfigJS, context?: LinkViewConfigContext): LinkViewConfig;
    title: string;
    linkItems: LinkItem[];
    constructor(parameters: LinkViewConfigValue);
    valueOf(): LinkViewConfigValue;
    toJS(): LinkViewConfigJS;
    toJSON(): LinkViewConfigJS;
    toString(): string;
    equals(other: LinkViewConfig): boolean;
    defaultLinkItem(): LinkItem;
    findByName(name: string): LinkItem;
}
