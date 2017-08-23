import * as React from 'react';
import { Fn } from '../../../common/utils/general/general';
export declare type ButtonType = "primary" | "secondary";
export interface ButtonProps extends React.Props<any> {
    type: ButtonType;
    className?: string;
    title?: string;
    svg?: string;
    active?: boolean;
    disabled?: boolean;
    onClick?: Fn;
}
export interface ButtonState {
}
export declare class Button extends React.Component<ButtonProps, ButtonState> {
    constructor();
    render(): JSX.Element;
}
