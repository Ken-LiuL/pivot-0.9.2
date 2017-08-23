import * as React from 'react';
import { User, Customization } from '../../../common/models/index';
import { Fn } from '../../../common/utils/general/general';
import { AppSettings } from '../../../common/models/index';
export interface SettingsViewProps extends React.Props<any> {
    version: string;
    hash?: string;
    user?: User;
    customization?: Customization;
    onNavClick?: Fn;
    onSettingsChange?: (settings: AppSettings) => void;
}
export interface SettingsViewState {
    errorText?: string;
    messageText?: string;
    settings?: AppSettings;
    breadCrumbs?: string[];
}
export declare class SettingsView extends React.Component<SettingsViewProps, SettingsViewState> {
    mounted: boolean;
    constructor();
    componentDidMount(): void;
    componentWillUnmount(): void;
    onSave(settings: AppSettings, okMessage?: string): void;
    selectTab(value: string): void;
    renderLeftButtons(breadCrumbs: string[]): JSX.Element[];
    onURLChange(breadCrumbs: string[]): void;
    render(): JSX.Element;
}
