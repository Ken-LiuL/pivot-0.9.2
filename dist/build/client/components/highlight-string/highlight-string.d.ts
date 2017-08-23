import * as React from 'react';
export interface HighlightStringProps extends React.Props<any> {
    className?: string;
    text: string;
    highlightText: string;
}
export interface HighlightStringState {
}
export declare class HighlightString extends React.Component<HighlightStringProps, HighlightStringState> {
    constructor();
    highlightInString(): any;
    render(): JSX.Element;
}
