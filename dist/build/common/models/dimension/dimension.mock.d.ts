import { Dimension, DimensionJS } from './dimension';
export declare class DimensionMock {
    static COUNTRY_STRING_JS: DimensionJS;
    static COUNTRY_URL_JS: DimensionJS;
    static TIME_JS: DimensionJS;
    static NUMBER_JS: DimensionJS;
    static countryString(): Dimension;
    static countryURL(): Dimension;
    static time(): Dimension;
    static number(): Dimension;
}
