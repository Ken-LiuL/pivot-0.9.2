import * as React from 'react';
export interface NoDataSourcesApplicationProps extends React.Props<any> {
}
export interface NoDataSourcesApplicationState {
}
export declare class NoDataSourcesApplication extends React.Component<NoDataSourcesApplicationProps, NoDataSourcesApplicationState> {
    private refreshTimer;
    constructor();
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
