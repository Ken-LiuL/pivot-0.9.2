import * as React from 'react';
import { Fn } from '../../../common/utils/general/general';
import { Stage } from '../../../common/models/index';
export declare type BubbleLayout = 'normal' | 'mini';
export declare type Align = 'start' | 'center' | 'end';
export interface BubbleMenuProps extends React.Props<any> {
    className: string;
    id?: string;
    direction: string;
    stage: Stage;
    fixedSize?: boolean;
    containerStage?: Stage;
    openOn: Element;
    alignOn?: Element;
    onClose: Fn;
    inside?: Element;
    layout?: BubbleLayout;
    align?: Align;
}
export interface BubbleMenuState {
    id?: string;
    x?: number;
    y?: number;
}
export declare class BubbleMenu extends React.Component<BubbleMenuProps, BubbleMenuState> {
    static defaultProps: {
        align: string;
    };
    constructor();
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    globalMouseDownListener(e: MouseEvent): void;
    globalKeyDownListener(e: KeyboardEvent): void;
    render(): any;
}
