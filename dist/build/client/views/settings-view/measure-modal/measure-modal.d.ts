import * as React from 'react';
import { Measure } from '../../../../common/models/index';
export interface MeasureModalProps extends React.Props<any> {
    measure?: Measure;
    onSave?: (measure: Measure) => void;
    onClose?: () => void;
}
export interface MeasureModalState {
    newMeasure?: Measure;
    canSave?: boolean;
}
export declare class MeasureModal extends React.Component<MeasureModalProps, MeasureModalState> {
    private hasInitialized;
    constructor();
    initStateFromProps(props: MeasureModalProps): void;
    componentWillReceiveProps(nextProps: MeasureModalProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    globalKeyDownListener(e: KeyboardEvent): void;
    onChange(newMeasure: Measure, isValid: boolean): void;
    save(): void;
    render(): JSX.Element;
}
