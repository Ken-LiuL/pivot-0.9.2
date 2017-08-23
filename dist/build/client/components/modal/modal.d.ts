import * as React from 'react';
import { Fn } from '../../../common/utils/general/general';
export interface ModalProps extends React.Props<any> {
    className?: string;
    id?: string;
    title?: string;
    mandatory?: boolean;
    onClose: Fn;
    onEnter?: Fn;
    startUpFocusOn?: string;
}
export interface ModalState {
    id?: string;
}
export declare class Modal extends React.Component<ModalProps, ModalState> {
    private focusAlreadyGiven;
    constructor();
    componentWillMount(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    getChildByID(children: NodeList, id: string): HTMLElement;
    maybeFocus(): void;
    globalMouseDownListener(e: MouseEvent): void;
    globalKeyDownListener(e: KeyboardEvent): void;
    render(): JSX.Element;
}
