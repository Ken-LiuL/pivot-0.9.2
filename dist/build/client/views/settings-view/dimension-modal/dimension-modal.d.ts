import * as React from 'react';
import { Dimension } from '../../../../common/models/index';
export interface DimensionModalProps extends React.Props<any> {
    dimension?: Dimension;
    onSave?: (dimension: Dimension) => void;
    onClose?: () => void;
}
export interface DimensionModalState {
    newDimension?: Dimension;
    canSave?: boolean;
}
export interface DimensionKind {
    label: string;
    value: string;
}
export declare class DimensionModal extends React.Component<DimensionModalProps, DimensionModalState> {
    private kinds;
    constructor();
    initStateFromProps(props: DimensionModalProps): void;
    componentWillReceiveProps(nextProps: DimensionModalProps): void;
    componentDidMount(): void;
    onKindChange(newKind: DimensionKind): void;
    onChange(newDimension: Dimension, isValid: boolean): void;
    save(): void;
    render(): JSX.Element;
}
