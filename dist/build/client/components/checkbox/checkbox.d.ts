import * as React from 'react';
export declare type CheckboxType = 'check' | 'cross' | 'radio';
export interface CheckboxProps extends React.Props<any> {
    selected: boolean;
    onClick?: React.MouseEventHandler;
    type?: CheckboxType;
    color?: string;
}
export interface CheckboxState {
}
export declare class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    static defaultProps: {
        type: string;
    };
    constructor();
    renderIcon(): JSX.Element;
    render(): JSX.Element;
}
