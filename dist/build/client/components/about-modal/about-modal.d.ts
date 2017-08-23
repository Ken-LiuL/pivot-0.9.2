import * as React from 'react';
import { Fn } from '../../../common/utils/general/general';
export interface AboutModalProps extends React.Props<any> {
    version: string;
    onClose: Fn;
}
export interface AboutModalState {
}
export declare class AboutModal extends React.Component<AboutModalProps, AboutModalState> {
    constructor();
    render(): JSX.Element;
}
