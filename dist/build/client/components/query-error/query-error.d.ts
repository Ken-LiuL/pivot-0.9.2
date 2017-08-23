import * as React from 'react';
export interface QueryErrorProps extends React.Props<any> {
    error: any;
}
export interface QueryErrorState {
}
export declare class QueryError extends React.Component<QueryErrorProps, QueryErrorState> {
    constructor();
    render(): JSX.Element;
}
