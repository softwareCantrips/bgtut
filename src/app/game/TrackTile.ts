export type Direction = 'N' | 'E' | 'S' | 'W';

export type TrackPath = [Direction, Direction];

export interface TrackTile {
  id: number;
  name: string;
  type: string;
  image: string;
  orientation: 0 | 90 | 180 | 270;
  position: { x: number; y: number };
  paths: TrackPath[]; // multiple paths on a tile
}

export function copyTrackTile(tile: TrackTile): TrackTile {
  return {
    ...tile,
    position: { ...tile.position }, // Copy nested object
    paths: tile.paths.map(
      ([a, b]) => [a, b] as TrackPath // Copy each path tuple
    ),
  };
}

export function findTrackTileById(tiles: TrackTile[], id: number): TrackTile | undefined {
  return tiles.find(tile => tile.id === id);
}

