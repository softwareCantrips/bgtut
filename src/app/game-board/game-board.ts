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
import { createText } from '../UiControls/TextFactory';
import { copyTrackTile, TrackTile, findTrackTileById, removeTrackTileById } from '../game/TrackTile';
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

  private gameService = inject(GameService);

  private app!: Application;
  private stage!: Container;
  private hand!: TrackTile[];
  private boardInContainer!: any;
  private isInitialized:boolean = false
  private tilesIDsInClientHand: number[] = []
  private tilesIDsOnClientBoard: number[] = []
  private tilesToPlace: TrackTile[] = []  // Should take up to two Tiles which will be placed on the board when pressing end of turn

  constructor(private router: Router) {
    
  }

  private async init(state: any): Promise<void> {

    const initialState = this.gameService.getState();
    const thisIsMe = this.gameService.getPlayerID();

    this.boardInContainer = createGridBoard(560,560,340,60,40);

    if(initialState) {
      this.hand = initialState.G.hands[thisIsMe]

      for(let i = 0; i < this.hand.length; i++) {
          const tt: TrackTile = copyTrackTile(this.hand[i]); 
            
          const handSpriteContainer = await createSpriteContainer(this.hand[i].image, i);
          makeDraggable(handSpriteContainer,40,this.handleTtSnap,this.boardInContainer, tt, this.gameService);

          this.stage.addChild(handSpriteContainer)
          this.tilesIDsInClientHand.push(tt.id)
          
      }

    }
    
    this.app.stage.addChild(this.boardInContainer);

  }

  private async update(state: any):  Promise<void> {
    const thisIsMe = this.gameService.getPlayerID();
    const currentPlayer = this.gameService.getCurrentPlayer();

    if(!this.isInitialized && currentPlayer) {
      this.init(state);
      this.isInitialized = true
    }

    if(state && this.isInitialized) {
          let missingTileIDs: number[] = []
          const tilesOnServerBoard: TrackTile[] = state.G.board
          missingTileIDs = await this.findMissingTileIDs(this.tilesIDsOnClientBoard, tilesOnServerBoard);
          missingTileIDs.forEach(async element => {
            const flattenedBoard = tilesOnServerBoard.flat().filter((tile): tile is TrackTile => tile !== null);
            const tmpMissingTile: TrackTile | undefined = findTrackTileById(flattenedBoard, element);
            if(tmpMissingTile) {
              const tt: TrackTile = copyTrackTile(tmpMissingTile); 

              const handSpriteContainer = await createSpriteContainer(tmpMissingTile.image, 0);

              makeDraggable(handSpriteContainer,40,this.handleTtSnap,this.boardInContainer, tt, this.gameService);

              placeSpriteOnGrid(handSpriteContainer,tmpMissingTile.position.x, tmpMissingTile.position.y, tmpMissingTile.orientation, 340, 60, 40);
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
      backgroundColor: 0xb3fdab,
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
      const stateAtEndOfTurn = this.gameService.getState();

      this.tilesToPlace
      for (const tile of this.tilesToPlace) {
              this.tilesIDsOnClientBoard.push(tile.id)
              const index = this.tilesIDsInClientHand.indexOf(tile.id);
              if (index !== -1) {
                this.tilesIDsInClientHand.splice(index, 1);
              }
              this.gameService.makeMove("placeTrackTile",tile);    
      }

      this.tilesToPlace = []

      let currentIdCounter = stateAtEndOfTurn?.G.idCounter;
      if(currentIdCounter) {
        console.log('CurrentIDCounter = ',currentIdCounter);
        currentIdCounter++;
        this.gameService.makeMove("drawTile");
        console.log('CurrentIDCounter after increase = ',currentIdCounter);
        const tile:TrackTile = createTrackTile("greenCurve", currentIdCounter);
        const clientTileCopy: TrackTile = copyTrackTile(tile); 

        const handSpriteContainer = await createSpriteContainer(clientTileCopy.image, 0);
        makeDraggable(handSpriteContainer,40,this.handleTtSnap,this.boardInContainer, clientTileCopy, this.gameService);

        this.stage.addChild(handSpriteContainer);
        this.gameService.makeMove("addTileToHand",tile);

      }

      this.gameService.endTheTurn();
    });

    endTheTurnButton.x = 5
    endTheTurnButton.y = 120

    this.stage.addChild(switchToGameBoard);
    this.stage.addChild(endTheTurnButton);

    const myText = createText("Hello World", 0xffffff, 0x000000, 24);
    myText.x = 500;
    myText.y = 10;
    this.stage.addChild(myText);
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
              
              removeTrackTileById(this.tilesToPlace, trackTile.id);
              this.tilesToPlace.push(trackTile);
              
  }

}
