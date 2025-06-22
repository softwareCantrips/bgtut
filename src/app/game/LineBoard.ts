import { createTrackTile } from "./TileFactory";
import { TrackTile, TrackPath, Direction } from "./TrackTile";

export interface MyGameState {
  board: (TrackTile | null)[][];
  hands: Record<string, TrackTile[]>;
}

export const MyGame = {

  setup: ({ctx}: {ctx:any}): MyGameState => ({
    board: Array.from({ length: 12 }, () => Array(12).fill(null)),
    hands: startingHands(ctx)
  }),

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

    for(let i=0; i< ctx.numPlayers; i++) {
       const playerID = i.toString();
       const oneHand: TrackTile[] = [];

      const straight: TrackTile = createTrackTile("brownStraight");
      const curve: TrackTile = createTrackTile("brownCurve")

       oneHand.push(straight);
       oneHand.push(straight);
       oneHand.push(straight);
       oneHand.push(curve);
       oneHand.push(curve);
       hands[playerID] = oneHand
    }
  return hands;
}

