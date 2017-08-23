import { AppSettings } from '../common/models/index';
export interface ViewOptions {
    version: string;
    title: string;
    user?: any;
    appSettings?: AppSettings;
    readOnly?: boolean;
}
export declare function layout(options: ViewOptions, content: string): string;
export declare function pivotLayout(options: ViewOptions): string;
export declare function errorLayout(options: ViewOptions, message: string, error?: any): string;
