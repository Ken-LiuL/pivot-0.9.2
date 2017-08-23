import * as React from 'react';
import { Timezone } from 'chronoshift';
export interface DateRangeInputProps extends React.Props<any> {
    time: Date;
    timezone: Timezone;
    onChange: (t: Date) => void;
    hide?: boolean;
    type?: string;
}
export interface DateRangeInputState {
    dateString?: string;
}
export declare class DateRangeInput extends React.Component<DateRangeInputProps, DateRangeInputState> {
    constructor();
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: DateRangeInputProps): void;
    updateStateFromTime(time: Date, timezone: Timezone): void;
    dateChange(e: KeyboardEvent): void;
    changeDate(possibleDateString: string): void;
    render(): JSX.Element;
}
