import { DruidRequestDecorator } from 'plywood-druid-requester';
import { SupportedType } from '../../../common/models/index';
export interface ProperRequesterOptions {
    type: SupportedType;
    host: string;
    retry?: number;
    timeout?: number;
    verbose?: boolean;
    concurrentLimit?: number;
    druidRequestDecorator?: DruidRequestDecorator;
    database?: string;
    user?: string;
    password?: string;
}
export declare function properRequesterFactory(options: ProperRequesterOptions): Requester.PlywoodRequester<any>;
