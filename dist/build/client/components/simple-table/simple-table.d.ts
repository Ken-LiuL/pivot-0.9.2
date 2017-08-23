import * as React from 'react';
export interface SimpleTableColumn {
    label: string;
    field: string | ((row: any) => any);
    width: number;
    cellIcon?: string;
}
export interface SimpleTableAction {
    icon: string;
    callback: (item: any) => void;
    inEllipsis?: boolean;
}
export interface SimpleTableProps extends React.Props<any> {
    columns: SimpleTableColumn[];
    rows: any[];
    actions?: SimpleTableAction[];
    onRowClick?: (row: any) => void;
}
export interface SimpleTableState {
    sortColumn?: SimpleTableColumn;
    sortAscending?: boolean;
}
export declare class SimpleTable extends React.Component<SimpleTableProps, SimpleTableState> {
    constructor();
    renderHeaders(columns: SimpleTableColumn[], sortColumn: SimpleTableColumn, sortAscending: boolean): JSX.Element;
    getIcons(row: any, actions: SimpleTableAction[]): JSX.Element[];
    labelizer(column: SimpleTableColumn): (row: any) => any;
    renderRow(row: any, columns: SimpleTableColumn[], index: number): JSX.Element;
    sortRows(rows: any[], sortColumn: SimpleTableColumn, sortAscending: boolean): any[];
    renderRows(rows: any[], columns: SimpleTableColumn[], sortColumn: SimpleTableColumn, sortAscending: boolean): JSX.Element[];
    getLayout(columns: SimpleTableColumn[], rows: any[], actions: SimpleTableAction[]): {
        bodyWidth: number;
        bodyHeight: number;
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    getDirectActions(actions: SimpleTableAction[]): SimpleTableAction[];
    renderActions(rows: any[], actions: SimpleTableAction[]): JSX.Element[];
    onClick(x: number, y: number): void;
    onCellClick(row: any, column: SimpleTableColumn): void;
    onHeaderClick(column: SimpleTableColumn): void;
    onActionClick(action: SimpleTableAction, row: any): void;
    render(): JSX.Element;
}
