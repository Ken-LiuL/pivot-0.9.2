import * as React from 'react';
export interface TileHeaderIcon {
    name: string;
    svg: string;
    onClick: React.MouseEventHandler;
    ref?: string;
    active?: boolean;
}
export interface TileHeaderProps extends React.Props<any> {
    title: string;
    onDragStart?: React.DragEventHandler;
    icons?: TileHeaderIcon[];
}
export interface TileHeaderState {
}
export declare class TileHeader extends React.Component<TileHeaderProps, TileHeaderState> {
    constructor();
    renderIcons(): JSX.Element;
    render(): JSX.Element;
}
