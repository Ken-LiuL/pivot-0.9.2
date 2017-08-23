import { Instance } from 'immutable-class';
import { Timezone } from 'chronoshift';
import { ExternalView, ExternalViewValue } from '../external-view/external-view';
export interface CustomizationValue {
    title?: string;
    headerBackground?: string;
    customLogoSvg?: string;
    externalViews?: ExternalView[];
    timezones?: Timezone[];
}
export interface CustomizationJS {
    title?: string;
    headerBackground?: string;
    customLogoSvg?: string;
    externalViews?: ExternalViewValue[];
    timezones?: string[];
}
export declare class Customization implements Instance<CustomizationValue, CustomizationJS> {
    static DEFAULT_TITLE: string;
    static DEFAULT_TIMEZONES: Timezone[];
    static isCustomization(candidate: any): candidate is Customization;
    static fromJS(parameters: CustomizationJS): Customization;
    headerBackground: string;
    customLogoSvg: string;
    externalViews: ExternalView[];
    timezones: Timezone[];
    title: string;
    constructor(parameters: CustomizationValue);
    valueOf(): CustomizationValue;
    toJS(): CustomizationJS;
    toJSON(): CustomizationJS;
    toString(): string;
    equals(other: Customization): boolean;
    getTitle(version: string): string;
    changeTitle(title: string): Customization;
    getTimezones(): Timezone[];
}
