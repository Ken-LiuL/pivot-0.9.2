import * as React from 'react';
import { Clicker, Essence } from '../../../common/models/index';
export interface VisSelectorProps extends React.Props<any> {
    clicker: Clicker;
    essence: Essence;
}
export interface VisSelectorState {
    menuOpenOn?: Element;
}
export declare class VisSelector extends React.Component<VisSelectorProps, VisSelectorState> {
    constructor();
    openMenu(e: MouseEvent): void;
    closeMenu(): void;
    render(): JSX.Element;
}
