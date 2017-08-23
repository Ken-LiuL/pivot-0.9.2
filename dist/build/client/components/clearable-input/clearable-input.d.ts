import * as React from 'react';
export interface ClearableInputProps extends React.Props<any> {
    className?: string;
    type?: string;
    placeholder?: string;
    focusOnMount?: boolean;
    value: string;
    onChange: (newValue: string) => any;
    onBlur?: React.FocusEventHandler;
}
export interface ClearableInputState {
}
export declare class ClearableInput extends React.Component<ClearableInputProps, ClearableInputState> {
    constructor();
    onChange(e: KeyboardEvent): void;
    onClear(): void;
    render(): JSX.Element;
}
