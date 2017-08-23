import * as React from 'react';
export interface SimpleRow {
    title: string;
    description?: string;
    icon?: string;
}
export interface SimpleListProps extends React.Props<any> {
    rows: SimpleRow[];
    onEdit?: (index: number) => void;
    onRemove?: (index: number) => void;
}
export interface SimpleListState {
}
export declare class SimpleList extends React.Component<SimpleListProps, SimpleListState> {
    constructor();
    renderRows(rows: SimpleRow[]): JSX.Element[];
    render(): JSX.Element;
}
