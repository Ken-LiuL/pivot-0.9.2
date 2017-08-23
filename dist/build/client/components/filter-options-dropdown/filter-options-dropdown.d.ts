import * as React from 'react';
import { FilterMode } from '../../../common/models/index';
import { CheckboxType } from '../checkbox/checkbox';
export interface FilterOption {
    label: string;
    value: FilterMode;
    svg: string;
    checkType?: CheckboxType;
}
export interface FilterOptionsDropdownProps extends React.Props<any> {
    selectedOption: FilterMode;
    onSelectOption: (o: FilterMode) => void;
}
export interface FilterOptionsDropdownState {
}
export declare class FilterOptionsDropdown extends React.Component<FilterOptionsDropdownProps, FilterOptionsDropdownState> {
    constructor();
    onSelectOption(option: FilterOption): void;
    renderFilterOption(option: FilterOption): JSX.Element;
    render(): JSX.Element;
}
