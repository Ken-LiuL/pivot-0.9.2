import * as React from 'react';
import { Timezone } from 'chronoshift';
import { Fn } from '../../../common/utils/general/general';
export interface SettingsMenuProps extends React.Props<any> {
    openOn: Element;
    onClose: Fn;
    changeTimezone?: (timezone: Timezone) => void;
    timezone?: Timezone;
    timezones?: Timezone[];
}
export interface SettingsMenuState {
}
export declare class SettingsMenu extends React.Component<SettingsMenuProps, SettingsMenuState> {
    constructor();
    changeTimezone(newTimezone: Timezone): void;
    renderTimezonesDropdown(): React.ReactElement<any>;
    render(): JSX.Element;
}
