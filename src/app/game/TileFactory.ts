import { TrackTile, TrackPath, Direction } from './TrackTile';

export function createTrackTile(
    tileKind: 'brownStraight' | 'brownCurve' | 'greenStraight' | 'greenCurve'| 'blocked',
    tileID: number
) :TrackTile {

    switch(tileKind) {
        case 'brownStraight':
            const brownStraight: TrackTile = {
                id: tileID,
                name: tileKind,
                type: 'replaceable',
                image: 'assets/images/straight-brown.jpg',
                orientation: 0,
                position: { x: 0, y: 0 },
                paths: [
                    ['N','S'],
                    ['S','N']
                ]
            };
            return brownStraight;
        case 'brownCurve':
            const brownCurve: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'replaceable',
            image: 'assets/images/turn-brown.jpg',
            orientation: 0,
            position: { x: 0, y: 0 },
            paths: [
                ['S','E'],
                ['E','S']
            ]
            };
            return brownCurve;
        case 'greenStraight':
            const greenStraight: TrackTile = {
                id: tileID,
                name: tileKind,
                type: 'notReplaceable', // muss wenn ein Zug beendet wird einen anderen Wert bekommen und ab dann kann das Tile nicht mehr bewegt werden
                image: 'assets/images/straight-green.jpg',
                orientation: 0,
                position: { x: 0, y: 0 },
                paths: [
                    ['N','S'],
                    ['S','N']
                ]
            };
            return greenStraight;
        case 'greenCurve':
            const greenCurve: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'notReplaceable',
            image: 'assets/images/turn-green.jpg',
            orientation: 0,
            position: { x: 0, y: 0 },
            paths: [
                ['S','E'],
                ['E','S']
            ]
            };
            return greenCurve;
        case 'blocked':
            const blocked: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/blocked.jpg',
            orientation: 0,
            position: { x: 0, y: 0 },
            paths: [ ]
            };
            return blocked;
        default:
            throw new Error(`Unknown tile kind: ${tileKind}`);
    }
}