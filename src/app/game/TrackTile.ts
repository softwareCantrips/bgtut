export type Direction = 'N' | 'E' | 'S' | 'W';

export type TrackPath = [Direction, Direction];

export interface TrackTile {
  id: string;
  type: string;
  image: string;
  orientation: 0 | 90 | 180 | 270;
  position: { x: number; y: number };
  paths: TrackPath[]; // multiple paths on a tile
}