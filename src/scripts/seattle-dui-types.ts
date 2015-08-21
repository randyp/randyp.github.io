import type { GeoPermissibleObjects } from 'd3';

export interface SeattleDuiData {
    data: Record<string, Record<string, number>>;
    all: number[];
    shapes: GeoPermissibleObjects[];
}
