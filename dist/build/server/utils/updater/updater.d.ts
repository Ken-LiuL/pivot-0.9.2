export interface UpdatedOptions<T> {
    key?: (thing: T, index?: number) => string;
    equals?: (thingA: T, thingB: T) => boolean;
    onEnter?: (newThing: T) => void;
    onUpdate?: (newThing: T, oldThing: T) => void;
    onExit?: (oldThing: T) => void;
}
export declare function updater<T>(oldThings: T[], newThings: T[], updatedOptions: UpdatedOptions<T>): void;
