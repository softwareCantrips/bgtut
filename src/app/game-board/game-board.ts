import { Component } from '@angular/core';
import { inject } from "@angular/core";
import { GameService } from '../game-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Application, Assets, Color, Container, Graphics, RoundedRectangle, Sprite, Texture } from 'pixi.js';
import { createSpawnButton, createTestButton, createSwitchToMainMenuButton, createEndTurnButton } from '../UiControls/ButtonDefinitions';
import { makeDraggable } from '../UiControls/DragHelper';
import { createGridBoard } from '../UiControls/DrawGrid'
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import '@pixi/graphics-extras';
import { MyGameState } from '../game/LineBoard';
import { createSpriteContainer, placeSpriteOnGrid } from '../UiControls/SpriteFactory';
import { copyTrackTile, TrackTile, findTrackTileById } from '../game/TrackTile';
import { createTrackTile } from '../game/TileFactory';

@Component({
  selector: 'app-game-board',
  standalone: true,
  templateUrl: './game-board.html',
  imports: [CommonModule,FormsModule,RouterModule],
  styleUrl: './game-board.scss'
})
export class GameBoard {

  protected title = 'bgtut';

  private readonly IMAGE_PATH_STRAIGHT_BROWN = 'assets/images/straight-brown.jpg';
  private straightBrownTexture: Texture | undefined

  private gameService = inject(GameService);

  private app!: Application;
  private stage!: Container;
  private hand!: TrackTile[];
  private boardInContainer!: any;
  private isInitialized:boolean = false
  private tilesIDsInClientHand: number[] = []
  private tilesIDsOnClientBoard: number[] = []

  constructor(private router: Router) {
    
  }

  private async init(state: any): Promise<void> {

    const initialState = this.gameService.getState();
    const thisIsMe = this.gameService.getPlayerID();
    console.log('Client ID in init = ', thisIsMe);

    this.boardInContainer = createGridBoard(480,480,340,60,40);

    if(initialState) {
      console.log('Initial State vorhanden');
      this.hand = initialState.G.hands[thisIsMe]

      for(let i = 0; i < this.hand.length; i++) {

          //console.log('Tile = ', this.hand[i].id)
          const tt: TrackTile = copyTrackTile(this.hand[i]); 
            
          const handSpriteContainer = await createSpriteContainer(this.hand[i].image, i);
          makeDraggable(handSpriteContainer,40,this.handleTtSnap,this.boardInContainer, tt);

          this.stage.addChild(handSpriteContainer)
          this.tilesIDsInClientHand.push(tt.id)
          
      }

    }
    
    this.app.stage.addChild(this.boardInContainer);

  }

  private async update(state: any):  Promise<void> {
    //console.log('Game state updated:', state);
    
    const thisIsMe = this.gameService.getPlayerID();
    console.log('Client ID = ', thisIsMe);
    const currentPlayer = this.gameService.getCurrentPlayer();
    console.log('Current Player = ', currentPlayer);

    if(!this.isInitialized && currentPlayer) {
      this.init(state);
      this.isInitialized = true
    }

    if(state && this.isInitialized) {
          let missingTileIDs: number[] = []
          const tilesOnServerBoard: TrackTile[] = state.G.board
          missingTileIDs = await this.findMissingTileIDs(this.tilesIDsOnClientBoard, tilesOnServerBoard);
          //console.log('stop here');
          missingTileIDs.forEach(async element => {
            //console.log('This Element is missing: ', element)
            const flattenedBoard = tilesOnServerBoard.flat().filter((tile): tile is TrackTile => tile !== null);
            const tmpMissingTile: TrackTile | undefined = findTrackTileById(flattenedBoard, element);
            //console.log('The found Tile = ',tmpMissingTile)
            if(tmpMissingTile) {
              const tt: TrackTile = copyTrackTile(tmpMissingTile); 

              const handSpriteContainer = await createSpriteContainer(tmpMissingTile.image, 0);

              makeDraggable(handSpriteContainer,40,this.handleTtSnap,this.boardInContainer, tt);

              placeSpriteOnGrid(handSpriteContainer,tmpMissingTile.position.x, tmpMissingTile.position.y, tmpMissingTile.orientation, 340, 60, 40);
              //console.log('Adding extra Tile to Grid: ', tmpMissingTile.id);
              this.tilesIDsOnClientBoard.push(tmpMissingTile.id)
              this.stage.addChild(handSpriteContainer);
            }
          });
    }
  }

  ngOnInit(): void {
    // Disable right-click context menu
    document.addEventListener('contextmenu', this.disableContextMenu);
    this.gameService.startGame();
    this.gameService.onUpdate(state => this.update(state));
  }

  disableContextMenu(event: MouseEvent): void {
    event.preventDefault();
  }

  async ngAfterViewInit(): Promise<void> {

    this.app = new Application();

    await this.app.init({
      width: 1000,
      height: 700,
      backgroundColor: 0xADD8E6,
      antialias: true
    });

    const containerElement = document.getElementById('pixi-container');
    this.stage = this.app.stage;
    this.stage.hitArea = this.app.screen;
    this.stage.eventMode = 'static';

    if (containerElement && this.app && this.app.canvas) {
      containerElement.appendChild(this.app.canvas as HTMLCanvasElement);
    }

    const switchToGameBoard = createSwitchToMainMenuButton(() => {
      this.gameService.endGame();
      this.router.navigateByUrl('/mainmenu');
    });

    switchToGameBoard.x = 5
    switchToGameBoard.y = 50

    const endTheTurnButton = createEndTurnButton(async () => {
      console.log("Tiles in Hand at the end of the turn = ",this.tilesIDsInClientHand.length)
      //TODO: at the end of turn add tiles to Hand until 5 Tiles in Hand
      const stateAtEndOfTurn = this.gameService.getState();

      let currentIdCounter = stateAtEndOfTurn?.G.idCounter;
      if(currentIdCounter) {
        console.log('CurrentIDCounter = ',currentIdCounter);
        currentIdCounter++;
        console.log('CurrentIDCounter after increase = ',currentIdCounter);
        const tile:TrackTile = createTrackTile("greenCurve", currentIdCounter);
        const clientTileCopy: TrackTile = copyTrackTile(tile); 

        const handSpriteContainer = await createSpriteContainer(clientTileCopy.image, 0);
        makeDraggable(handSpriteContainer,40,this.handleTtSnap,this.boardInContainer, clientTileCopy);

        this.stage.addChild(handSpriteContainer);
        this.gameService.makeMove("addTileToHand",tile);

      }

      this.gameService.endTheTurn();
    });

    endTheTurnButton.x = 5
    endTheTurnButton.y = 120

    this.stage.addChild(switchToGameBoard);
    this.stage.addChild(endTheTurnButton);

  }

async findMissingTileIDs(
  placedTileIDs: number[],
  board: TrackTile []
): Promise<number[]> {
  
  const boardTileIDs = board
    .flat() 
    .filter((tile): tile is TrackTile => tile !== null)
    .map(tile => tile.id);

  const missingTileIDs = boardTileIDs.filter(
    id => !placedTileIDs.includes(id)
  );

  return missingTileIDs;
}


handleTtSnap =(trackTile: TrackTile) => {
            this.tilesIDsOnClientBoard.push(trackTile.id)
            const index = this.tilesIDsInClientHand.indexOf(trackTile.id);
            if (index !== -1) {
              this.tilesIDsInClientHand.splice(index, 1);
            }
            this.gameService.makeMove("placeTrackTile",trackTile); 
}

}
