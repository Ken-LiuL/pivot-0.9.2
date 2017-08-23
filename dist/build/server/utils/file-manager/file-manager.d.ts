import * as Q from 'q';
import { Dataset, Expression } from 'plywood';
import { Logger } from '../logger/logger';
export declare function getFileData(filePath: string): Q.Promise<any[]>;
export interface FileManagerOptions {
    logger: Logger;
    verbose?: boolean;
    anchorPath: string;
    uri: string;
    subsetFilter?: Expression;
    onDatasetChange?: (dataset: Dataset) => void;
}
export declare class FileManager {
    logger: Logger;
    verbose: boolean;
    anchorPath: string;
    uri: string;
    dataset: Dataset;
    subsetFilter: Expression;
    onDatasetChange: (dataset: Dataset) => void;
    constructor(options: FileManagerOptions);
    init(): Q.Promise<any>;
    destroy(): void;
}
