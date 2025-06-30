import { createTrackTile } from "./TileFactory";
import { TrackTile, TrackPath, Direction } from "./TrackTile";

export interface MyGameState {
  board: (TrackTile | null)[][];
  hands: Record<string, TrackTile[]>;
  idCounter: number;
}

export const MyGame = {

  setup: ({ctx}: {ctx:any}): MyGameState => ({
    board: Array.from({ length: 12 }, () => Array(12).fill(null)),
    hands: startingHands(ctx),
    idCounter: ctx.numPlayers * 5 // This should create the correct ID after 5 Tiles for each player get an ID during setup
  }
),

  moves: {
    clickCell(
      { G, playerID }: { G: MyGameState; playerID: string },
      x: number,
      y: number,
      tileName: string
    ) {
      if (G.board[y][x] === null) {
        //G.board[y][x] = tileName;
      }
    },
    addTileToHand(
      { G, ctx }: { G: MyGameState; ctx: any },
      trackTile: TrackTile
    ) {
      const currentPlayer = ctx.currentPlayer;
      G.hands[currentPlayer].push(trackTile);
    },
    placeTrackTile(
      { G, ctx }: { G: MyGameState; ctx: any },
      trackTile: TrackTile
    ) {
      
      console.log('In place track tile x = ',trackTile.position.x);
      console.log('In place track tile y = ',trackTile.position.y);
      console.log('TrackTile ID = ',trackTile.id);
      console.log('The orientation of the placed Tile = ',trackTile.orientation);
      const currentPlayer = ctx.currentPlayer;
      removeTileById(G.hands[currentPlayer], trackTile.id);
      G.board[trackTile.position.y][trackTile.position.x] = trackTile;

    },
    placeTile(
      { G, ctx }: { G: MyGameState; ctx: any },
      x: number,
      y: number,
      tileIndex: number, // position in Hand of the current Player
      orientation: 0 | 90 | 180 | 270
    ) {
      const currentPlayer = ctx.currentPlayer;

      const [tile] = G.hands[currentPlayer].splice(tileIndex, 1)
      if(orientation) {
        tile.orientation = orientation
      } else {
        tile.orientation = 0
      }
      
      tile.position = {x: x, y: y}

      G.board[y][x] = tile;

    }
  },
};


  function startingHands(ctx:any):  Record<string, TrackTile[]> {
     const hands: Record<string, TrackTile[]> = {};
     let localIdCounter: number = 0;

    for(let i=0; i< ctx.numPlayers; i++) {
       const playerID = i.toString();
       const oneHand: TrackTile[] = [];

      const straight1: TrackTile = createTrackTile("brownStraight",localIdCounter);
      localIdCounter++;
      console.log('created Tile with TileID = ',straight1.id)
      const straight2: TrackTile = createTrackTile("brownStraight",localIdCounter);
      localIdCounter++;
      const straight3: TrackTile = createTrackTile("brownStraight",localIdCounter);
      localIdCounter++;
      const curve1: TrackTile = createTrackTile("brownCurve",localIdCounter)
      localIdCounter++;
      const curve2: TrackTile = createTrackTile("brownCurve",localIdCounter)
      localIdCounter++;

       oneHand.push(straight1);
       oneHand.push(straight2);
       oneHand.push(straight3);
       oneHand.push(curve1);
       oneHand.push(curve2);
       hands[playerID] = oneHand
    }
  return hands;
}

function removeTileById(hand: TrackTile[], tileId: number){
  const index = hand.findIndex(tile => tile.id === tileId);
  if (index === -1) {
    console.warn(`Tile with ID ${tileId} not found in hand.`);
  }
  hand.splice(index, 1);
}


