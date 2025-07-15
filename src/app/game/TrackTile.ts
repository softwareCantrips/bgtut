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

export function removeTrackTileById(array: TrackTile[], id: number): void {
  const index = array.findIndex(tile => tile.id === id);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

export const TRACK_TILE_KINDS = [
  'brownStraight',
  'brownCurve',
  'greenStraight',
  'greenCurve',
  'blocked',
  'station1-0',
  'station1-90',
  'station1-180',
  'station1-270',
  'station2-0',
  'station2-90',
  'station2-180',
  'station2-270',
  'station3-0',
  'station3-90',
  'station3-180',
  'station3-270',
  'station4-0',
  'station4-90',
  'station4-180',
  'station4-270',
  'station5-0',
  'station5-90',
  'station5-180',
  'station5-270',
  'station6-0',
  'station6-90',
  'station6-180',
  'station6-270',
] as const;

export type TrackTileKind = typeof TRACK_TILE_KINDS[number];
