export interface Logger {
    log: (line: string) => void;
    warn: (line: string) => void;
    error: (line: string) => void;
}
export declare const CONSOLE_LOGGER: Logger;
export declare const NULL_LOGGER: Logger;
