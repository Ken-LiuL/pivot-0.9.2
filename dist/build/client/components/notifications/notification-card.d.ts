import * as React from 'react';
import { Notification } from './notifications';
export interface NotificationCardProps extends React.Props<any> {
    model: Notification;
    top: number;
}
export interface NotificationCardState {
    appearing?: boolean;
    disappearing?: boolean;
}
export declare class NotificationCard extends React.Component<NotificationCardProps, NotificationCardState> {
    private timeoutID;
    constructor();
    componentDidMount(): void;
    appear(): void;
    disappear(): void;
    removeMe(notification: Notification): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
