import * as React from 'react';
import { Clicker, Essence, Resolution } from '../../../common/models/index';
export interface ManualFallbackProps extends React.Props<any> {
    clicker: Clicker;
    essence: Essence;
}
export interface ManualFallbackState {
}
export declare class ManualFallback extends React.Component<ManualFallbackProps, ManualFallbackState> {
    constructor();
    onResolutionClick(resolution: Resolution): void;
    render(): JSX.Element;
}
