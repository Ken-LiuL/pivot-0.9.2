import * as React from 'react';
import { PlywoodRange } from 'plywood';
export interface HighlighterProps extends React.Props<any> {
    highlightRange: PlywoodRange;
    scaleX: any;
}
export interface HighlighterState {
}
export declare class Highlighter extends React.Component<HighlighterProps, HighlighterState> {
    constructor();
    render(): JSX.Element;
}
