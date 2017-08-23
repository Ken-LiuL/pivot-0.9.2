import * as React from 'react';
export interface RouteProps extends React.Props<any> {
    fragment: string;
}
export interface RouteState {
}
export declare class Route extends React.Component<RouteProps, RouteState> {
}
export interface QualifiedPath {
    route: JSX.Element;
    fragment: string;
    crumbs: string[];
    wasDefaultChoice?: boolean;
}
export interface RouterProps extends React.Props<any> {
    hash: string;
    onURLChange?: (breadCrumbs: string[]) => void;
    rootFragment?: string;
}
export interface RouterState {
    hash?: string;
}
export declare class Router extends React.Component<RouterProps, RouterState> {
    mounted: boolean;
    constructor();
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: RouterProps): void;
    parseHash(hash: string): string[];
    sanitizeHash(hash: string): string;
    replaceHash(newHash: string): void;
    hasExtraFragments(route: QualifiedPath): boolean;
    stripUnnecessaryFragments(route: QualifiedPath, crumbs: string[]): void;
    onHashChange(hash: string): void;
    getDefaultDeeperCrumbs(fragment: string, crumbs: string[]): string[];
    canDefaultDeeper(fragment: string, crumbs: string[]): boolean;
    getDefaultFragment(children: JSX.Element[]): string;
    getQualifiedRoute(candidates: JSX.Element[], crumbs: string[]): QualifiedPath;
    isRoute(candidate: JSX.Element): boolean;
    isSimpleRoute(route: JSX.Element): boolean;
    getDefaultRoute(route: JSX.Element): JSX.Element;
    getQualifiedChild(candidates: JSX.Element[], crumbs: string[]): JSX.Element;
    render(): JSX.Element;
}
