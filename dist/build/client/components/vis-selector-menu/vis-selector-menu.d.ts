import * as React from 'react';
import { Fn } from '../../../common/utils/general/general';
import { Clicker, Essence, Manifest } from '../../../common/models/index';
export interface VisSelectorMenuProps extends React.Props<any> {
    clicker: Clicker;
    essence: Essence;
    openOn: Element;
    onClose: Fn;
}
export interface VisSelectorMenuState {
}
export declare class VisSelectorMenu extends React.Component<VisSelectorMenuProps, VisSelectorMenuState> {
    mounted: boolean;
    constructor();
    componentDidMount(): void;
    componentWillUnmount(): void;
    globalMouseDownListener(e: MouseEvent): void;
    globalKeyDownListener(e: KeyboardEvent): void;
    onVisSelect(v: Manifest): void;
    renderVisItem(v: Manifest): JSX.Element;
    render(): JSX.Element;
}
