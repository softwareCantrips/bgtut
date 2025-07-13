import { TrackTile, TrackPath, Direction, TrackTileKind } from './TrackTile';

export function createTrackTile(
    tileKind: TrackTileKind,
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
        case 'station1-270':
            const station1_270: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station1.jpg',
            orientation: 270,
            position: { x: 0, y: 0 },
            paths: [
                ['S','E'],
                ['E','S']
             ]
            };
            return station1_270;
        case 'station1-180':
            const station1_180: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station1.jpg',
            orientation: 180,
            position: { x: 0, y: 0 },
            paths: [ 
                ['S','E'],
                ['E','S']
            ]
            };
            return station1_180;
        case 'station1-90':
            const station1_90: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station1.jpg',
            orientation: 90,
            position: { x: 0, y: 0 },
            paths: [ 
                ['S','E'],
                ['E','S']
            ]
            };
            return station1_90;
        case 'station1-0':
            const station1_0: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station1.jpg',
            orientation: 0,
            position: { x: 0, y: 0 },
            paths: [ 
                ['S','E'],
                ['E','S']
            ]
            };
            return station1_0;
        case 'station2-270':
            const station2_270: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station2.jpg',
            orientation: 270,
            position: { x: 0, y: 0 },
            paths: [
                ['S','E'],
                ['E','S']
             ]
            };
            return station2_270;
        case 'station2-180':
            const station2_180: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station2.jpg',
            orientation: 180,
            position: { x: 0, y: 0 },
            paths: [ 
                ['S','E'],
                ['E','S']
            ]
            };
            return station2_180;
        case 'station2-90':
            const station2_90: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station2.jpg',
            orientation: 90,
            position: { x: 0, y: 0 },
            paths: [ 
                ['S','E'],
                ['E','S']
            ]
            };
            return station2_90;
        case 'station2-0':
            const station2_0: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station2.jpg',
            orientation: 0,
            position: { x: 0, y: 0 },
            paths: [ 
                ['S','E'],
                ['E','S']
            ]
            };
            return station2_0;
         case 'station3-270':
            const station3_270: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station3.jpg',
            orientation: 270,
            position: { x: 0, y: 0 },
            paths: [
                ['S','E'],
                ['E','S']
             ]
            };
            return station3_270;
        case 'station3-180':
            const station3_180: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station3.jpg',
            orientation: 180,
            position: { x: 0, y: 0 },
            paths: [ 
                ['S','E'],
                ['E','S']
            ]
            };
            return station3_180;
        case 'station3-90':
            const station3_90: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station3.jpg',
            orientation: 90,
            position: { x: 0, y: 0 },
            paths: [ 
                ['S','E'],
                ['E','S']
            ]
            };
            return station3_90;
        case 'station3-0':
            const station3_0: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station3.jpg',
            orientation: 0,
            position: { x: 0, y: 0 },
            paths: [ 
                ['S','E'],
                ['E','S']
            ]
            };
            return station3_0;
        case 'station4-270':
            const station4_270: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station4.jpg',
            orientation: 270,
            position: { x: 0, y: 0 },
            paths: [
                ['S','E'],
                ['E','S']
             ]
            };
            return station4_270;
        case 'station4-180':
            const station4_180: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station4.jpg',
            orientation: 180,
            position: { x: 0, y: 0 },
            paths: [ 
                ['S','E'],
                ['E','S']
            ]
            };
            return station4_180;
        case 'station4-90':
            const station4_90: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station4.jpg',
            orientation: 90,
            position: { x: 0, y: 0 },
            paths: [ 
                ['S','E'],
                ['E','S']
            ]
            };
            return station4_90;
        case 'station4-0':
            const station4_0: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station4.jpg',
            orientation: 0,
            position: { x: 0, y: 0 },
            paths: [ 
                ['S','E'],
                ['E','S']
            ]
            };
            return station4_0;
        case 'station5-270':
            const station5_270: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station5.jpg',
            orientation: 270,
            position: { x: 0, y: 0 },
            paths: [
                ['S','E'],
                ['E','S']
             ]
            };
            return station5_270;
        case 'station5-180':
            const station5_180: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station5.jpg',
            orientation: 180,
            position: { x: 0, y: 0 },
            paths: [ 
                ['S','E'],
                ['E','S']
            ]
            };
            return station5_180;
        case 'station5-90':
            const station5_90: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station5.jpg',
            orientation: 90,
            position: { x: 0, y: 0 },
            paths: [ 
                ['S','E'],
                ['E','S']
            ]
            };
            return station5_90;
        case 'station5-0':
            const station5_0: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station5.jpg',
            orientation: 0,
            position: { x: 0, y: 0 },
            paths: [ 
                ['S','E'],
                ['E','S']
            ]
            };
            return station5_0;
        case 'station6-270':
            const station6_270: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station6.jpg',
            orientation: 270,
            position: { x: 0, y: 0 },
            paths: [
                ['S','E'],
                ['E','S']
             ]
            };
            return station6_270;
        case 'station6-180':
            const station6_180: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station6.jpg',
            orientation: 180,
            position: { x: 0, y: 0 },
            paths: [ 
                ['S','E'],
                ['E','S']
            ]
            };
            return station6_180;
        case 'station6-90':
            const station6_90: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station6.jpg',
            orientation: 90,
            position: { x: 0, y: 0 },
            paths: [ 
                ['S','E'],
                ['E','S']
            ]
            };
            return station6_90;
        case 'station6-0':
            const station6_0: TrackTile = {
            id: tileID,
            name: tileKind,
            type: 'static',
            image: 'assets/images/station6.jpg',
            orientation: 0,
            position: { x: 0, y: 0 },
            paths: [ 
                ['S','E'],
                ['E','S']
            ]
            };
            return station6_0;
        default:
            throw new Error(`Unknown tile kind: ${tileKind}`);
    }
}