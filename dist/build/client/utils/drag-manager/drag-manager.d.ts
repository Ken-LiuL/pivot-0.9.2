import { Dimension, SplitCombine } from '../../../common/models/index';
export declare class DragManager {
    static dragOrigin: string;
    static dragDimension: Dimension;
    static dragSplit: SplitCombine;
    static init(): void;
    static getDragOrigin(): string;
    static setDragDimension(dimension: Dimension, origin: string): void;
    static getDragDimension(): Dimension;
    static setDragSplit(split: SplitCombine, origin: string): void;
    static getDragSplit(): SplitCombine;
}
