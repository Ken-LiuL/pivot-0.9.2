import { Instance } from 'immutable-class';
import { DataSource } from '../data-source/data-source';
import { Essence, EssenceJS } from '../essence/essence';
import { Manifest } from '../manifest/manifest';
export interface LinkItemValue {
    name: string;
    title: string;
    description: string;
    group: string;
    dataSource: DataSource;
    essence: Essence;
}
export interface LinkItemJS {
    name: string;
    title?: string;
    description?: string;
    group: string;
    dataSource: string;
    essence: EssenceJS;
}
export interface LinkItemContext {
    dataSources: DataSource[];
    visualizations?: Manifest[];
}
export declare class LinkItem implements Instance<LinkItemValue, LinkItemJS> {
    static isLinkItem(candidate: any): candidate is LinkItem;
    static fromJS(parameters: LinkItemJS, context?: LinkItemContext): LinkItem;
    name: string;
    title: string;
    description: string;
    group: string;
    dataSource: DataSource;
    essence: Essence;
    constructor(parameters: LinkItemValue);
    valueOf(): LinkItemValue;
    toJS(): LinkItemJS;
    toJSON(): LinkItemJS;
    toString(): string;
    equals(other: LinkItem): boolean;
}
