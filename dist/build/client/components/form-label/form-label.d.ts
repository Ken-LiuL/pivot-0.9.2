import * as React from 'react';
export interface FormLabelProps extends React.Props<any> {
    label?: string;
    helpText?: string;
    errorText?: string;
}
export interface FormLabelState {
    helpVisible: boolean;
}
export declare class FormLabel extends React.Component<FormLabelProps, FormLabelState> {
    constructor();
    onHelpClick(): void;
    renderIcon(): JSX.Element;
    renderAdditionalText(): JSX.Element;
    render(): JSX.Element;
}
