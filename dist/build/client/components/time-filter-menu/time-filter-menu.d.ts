import * as React from 'react';
import { Expression } from 'plywood';
import { Fn } from '../../../common/utils/general/general';
import { Clicker, Essence, Filter, Dimension } from '../../../common/models/index';
export interface Preset {
    name: string;
    selection: Expression;
}
export interface TimeFilterMenuProps extends React.Props<any> {
    clicker: Clicker;
    essence: Essence;
    dimension: Dimension;
    onClose: Fn;
}
export interface TimeFilterMenuState {
    tab?: string;
    timeSelection?: Expression;
    startTime?: Date;
    endTime?: Date;
    hoverPreset?: Preset;
}
export declare class TimeFilterMenu extends React.Component<TimeFilterMenuProps, TimeFilterMenuState> {
    mounted: boolean;
    constructor();
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    globalKeyDownListener(e: KeyboardEvent): void;
    constructFilter(): Filter;
    onPresetClick(preset: Preset): void;
    onPresetMouseEnter(preset: Preset): void;
    onPresetMouseLeave(preset: Preset): void;
    onStartChange(start: Date): void;
    onEndChange(end: Date): void;
    selectTab(tab: string): void;
    onOkClick(): void;
    onCancelClick(): void;
    renderPresets(): JSX.Element;
    actionEnabled(): boolean;
    renderCustom(): JSX.Element;
    render(): JSX.Element;
}
