import * as React from 'react';
export interface Notification {
    title: string;
    priority: string;
    message: string;
    id?: number;
    sticky?: boolean;
}
export declare class Notifier {
    static counter: number;
    static notifications: Notification[];
    static listeners: ((notifications: Notification[]) => void)[];
    private static create(notification);
    static info(title: string, message?: string): void;
    static failure(title: string, message?: string): void;
    static success(title: string, message?: string): void;
    static subscribe(callback: (notifications: Notification[]) => void): void;
    static removeNotification(notification: Notification): void;
    static unsubscribe(callback: (notifications: Notification[]) => void): void;
}
export interface NotificationsProps extends React.Props<any> {
}
export interface NotificationsState {
    notifications: Notification[];
}
export declare class Notifications extends React.Component<NotificationsProps, NotificationsState> {
    constructor();
    componentDidMount(): void;
    componentWillUnmount(): void;
    onChange(notifications: Notification[]): void;
    renderCards(): JSX.Element[];
    render(): JSX.Element;
}
