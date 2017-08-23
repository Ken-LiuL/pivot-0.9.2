import * as React from 'react';
import { AppSettings } from '../../../../common/models/index';
export interface GeneralProps extends React.Props<any> {
    settings?: AppSettings;
    onSave?: (settings: AppSettings) => void;
}
export interface GeneralState {
    newSettings?: AppSettings;
    hasChanged?: boolean;
    errors?: any;
}
export declare class General extends React.Component<GeneralProps, GeneralState> {
    constructor();
    componentWillReceiveProps(nextProps: GeneralProps): void;
    onChange(newSettings: AppSettings, isValid: boolean, path: string): void;
    save(): void;
    render(): JSX.Element;
}
