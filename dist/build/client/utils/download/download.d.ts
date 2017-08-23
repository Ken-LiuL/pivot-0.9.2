import { Dataset } from 'plywood';
export declare type FileFormat = "csv" | "tsv" | "json" | "txt";
export declare function getMIMEType(fileType: string): string;
export declare function download(dataset: Dataset, fileName?: string, fileFormat?: FileFormat): void;
export declare function datasetToFileString(dataset: Dataset, fileFormat?: FileFormat): string;
export declare function makeFileName(...args: Array<string>): string;
