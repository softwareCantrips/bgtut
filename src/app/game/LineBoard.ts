import { createTrackTile } from "./TileFactory";
import { TrackTile, TrackPath, Direction } from "./TrackTile";

export interface MyGameState {
  board: (TrackTile | null)[][];  
  hands: Record<string, TrackTile[]>;
  idCounter: number;
}

export const MyGame = {

  setup: ({ctx}: {ctx:any}): MyGameState => ({
    board: blockedTiles(ctx), // 52 geblockte outer tiles //12 Stations = 64 blocking Tiles on the board
    hands: startingHands(ctx),
    idCounter: 64 + (ctx.numPlayers * 5) // This should create the correct ID after 5 Tiles for each player get an ID during setup
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
    drawTile(
      { G, ctx }: { G: MyGameState; ctx: any }
    ) {
      console.log("increasing the idCounter");
      G.idCounter++;
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
      console.log('TrackTile ID = ',trackTile.id);
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


  function blockedTiles(ctx: any): (TrackTile | null)[][] {
  const board: (TrackTile | null)[][] = Array.from({ length: 14 }, () =>
    Array(14).fill(null)
  );

  let id = 0;

  // Helper to place a blocked tile with unique ID
  function placeBlockedTile(x: number, y: number) {
    const blocked: TrackTile = createTrackTile("blocked", id++);
    blocked.position = { x, y };
    board[y][x] = blocked;
  }

  // Top row
  for (let x = 0; x < 14; x++) {
    placeBlockedTile(x, 0);
  }

  // Bottom row
  for (let x = 0; x < 14; x++) {
    placeBlockedTile(x, 13);
  }

  // Left column (excluding corners)
  for (let y = 1; y < 13; y++) {
    placeBlockedTile(0, y);
  }

  // Right column (excluding corners)
  for (let y = 1; y < 13; y++) {
    placeBlockedTile(13, y);
  }

  // Die Stationen erstmal auch als blocked 
  placeBlockedTile(5, 12);
  placeBlockedTile(9, 11);
  placeBlockedTile(2, 9);
  placeBlockedTile(7, 9);
  placeBlockedTile(12, 8);
  placeBlockedTile(4, 7);
  placeBlockedTile(9, 6);
  placeBlockedTile(1, 5);
  placeBlockedTile(6, 4);
  placeBlockedTile(11, 4);
  placeBlockedTile(4, 2);
  placeBlockedTile(8, 1);

  return board;
}




  function startingHands(ctx:any):  Record<string, TrackTile[]> {
     const hands: Record<string, TrackTile[]> = {};
     let localIdCounter: number = 65; //startet bei 65 weil 64 blocking Tiles auf dem initialem board liegen

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


