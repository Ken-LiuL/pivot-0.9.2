import * as React from 'react';
import { List } from 'immutable';
import { SimpleRow } from '../simple-list/simple-list';
export interface ImmutableListProps<T> extends React.Props<any> {
    items: List<T>;
    onChange: (newItems: List<T>) => void;
    getNewItem: (name: string) => T;
    getModal: (item: T) => JSX.Element;
    getRows: (items: List<T>) => SimpleRow[];
}
export interface ImmutableListState<T> {
    tempItems?: List<T>;
    editedIndex?: number;
    nameNeeded?: boolean;
    tempName?: string;
    pendingAddItem?: T;
}
export declare class ImmutableList<T> extends React.Component<ImmutableListProps<T>, ImmutableListState<T>> {
    static specialize<U>(): new () => ImmutableList<U>;
    constructor();
    editItem(index: number): void;
    addItem(): void;
    componentWillReceiveProps(nextProps: ImmutableListProps<T>): void;
    componentDidMount(): void;
    deleteItem(index: number): void;
    onChange(): void;
    renderEditModal(dimensionIndex: number): JSX.Element;
    renderAddModal(dimension: T): JSX.Element;
    renderNameModal(): JSX.Element;
    render(): JSX.Element;
}
