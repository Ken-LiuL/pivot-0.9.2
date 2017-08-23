import * as React from 'react';
import { Dataset } from 'plywood';
import { Fn } from '../../../common/utils/general/general';
import { Essence, ExternalView } from '../../../common/models/index';
export interface HilukMenuProps extends React.Props<any> {
    essence: Essence;
    openOn: Element;
    onClose: Fn;
    getUrlPrefix: () => string;
    openRawDataModal: Fn;
    externalViews?: ExternalView[];
    getDownloadableDataset?: () => Dataset;
}
export interface HilukMenuState {
    url?: string;
    specificUrl?: string;
}
export declare class HilukMenu extends React.Component<HilukMenuProps, HilukMenuState> {
    constructor();
    componentDidMount(): void;
    openRawDataModal(): void;
    onExport(): void;
    render(): JSX.Element;
}
