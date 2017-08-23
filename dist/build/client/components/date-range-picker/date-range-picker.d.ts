import * as React from 'react';
import { Timezone } from 'chronoshift';
import { TimeRange } from 'plywood';
export interface DateRangePickerProps extends React.Props<any> {
    startTime?: Date;
    endTime?: Date;
    maxTime?: Date;
    timezone: Timezone;
    onStartChange: (t: Date) => void;
    onEndChange: (t: Date) => void;
}
export interface DateRangePickerState {
    activeMonthStartDate?: Date;
    hoverTimeRange?: TimeRange;
    selectionSet?: boolean;
}
export declare class DateRangePicker extends React.Component<DateRangePickerProps, DateRangePickerState> {
    constructor();
    componentWillMount(): void;
    navigateToMonth(offset: number): void;
    goToPreviousMonth(): void;
    goToNextMonth(): void;
    calculateHoverTimeRange(mouseEnteredDay: Date): void;
    onCalendarMouseLeave(): void;
    selectNewRange(startDate: Date, endDate?: Date): void;
    selectDay(selection: Date): void;
    getIsSelectable(date: Date): boolean;
    getIsSelectedEdgeEnd(isSingleDate: boolean, candidate: Date): boolean;
    renderDays(weeks: Date[][], monthStart: Date, isSingleDate: boolean): JSX.Element[];
    renderCalendar(startDate: Date, isSingleDate: boolean): JSX.Element[];
    renderCalendarNav(startDate: Date): JSX.Element;
    render(): JSX.Element;
}
