import { AttributeInfo } from 'plywood';
import { DataSource, Dimension, Measure, Cluster } from '../../../common/models/index';
export declare function clusterToYAML(cluster: Cluster, withComments: boolean): string[];
export declare function attributeToYAML(attribute: AttributeInfo): string[];
export declare function dimensionToYAML(dimension: Dimension): string[];
export declare function measureToYAML(measure: Measure): string[];
export declare function dataSourceToYAML(dataSource: DataSource, withComments: boolean): string[];
