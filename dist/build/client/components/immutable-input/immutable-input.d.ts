import * as React from 'react';
export interface ImmutableInputProps extends React.Props<any> {
    instance: any;
    path: string;
    focusOnStartUp?: boolean;
    onChange?: (newInstance: any, valid: boolean, path?: string) => void;
    onInvalid?: (invalidValue: string) => void;
    validator?: RegExp;
}
export interface ImmutableInputState {
    newInstance?: any;
    invalidValue?: string;
}
export declare class ImmutableInput extends React.Component<ImmutableInputProps, ImmutableInputState> {
    private focusAlreadyGiven;
    constructor();
    initFromProps(props: ImmutableInputProps): void;
    componentWillReceiveProps(nextProps: ImmutableInputProps): void;
    componentDidUpdate(): void;
    componentDidMount(): void;
    maybeFocus(): void;
    changeImmutable(instance: any, path: string, newValue: any): any;
    onChange(event: KeyboardEvent): void;
    getValue(instance: any, path: string): string;
    render(): JSX.Element;
}
