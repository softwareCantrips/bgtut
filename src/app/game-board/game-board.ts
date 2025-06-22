import { Component } from '@angular/core';
import { inject } from "@angular/core";
import { GameService } from '../game-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Application, Assets, Color, Container, Graphics, RoundedRectangle, Sprite, Texture } from 'pixi.js';
import { createSpawnButton, createTestButton, createSwitchToMainMenuButton } from '../UiControls/ButtonDefinitions';
import { makeDraggable } from '../UiControls/DragHelper';
import { createGridBoard } from '../UiControls/DrawGrid'
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import '@pixi/graphics-extras';
import { MyGameState } from '../game/LineBoard';
import { createSpriteContainer } from '../UiControls/SpriteFactory';

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

  constructor(private router: Router) {
    
  }

  ngOnInit(): void {
    // Disable right-click context menu
    document.addEventListener('contextmenu', this.disableContextMenu);
    this.gameService.startGame();
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

    const gridInContainer = createGridBoard(480,480,340,60,40);

    if (containerElement && this.app && this.app.canvas) {
      containerElement.appendChild(this.app.canvas as HTMLCanvasElement);
    }

    const testButton = createTestButton(() => {
      const currentPlayer = this.gameService.getCurrentPlayer();
      console.log('current Player = ', currentPlayer)
    });

    testButton.x = 5
    testButton.y = 5

    const spawnButton = createSpawnButton(() => {
      this.gameService.makeMove("clickCell",5,5)
    });

    spawnButton.x = 5
    spawnButton.y = 75

    const switchToGameBoard = createSwitchToMainMenuButton(() => {
      this.gameService.endGame();
      this.router.navigateByUrl('/mainmenu');
    });

    switchToGameBoard.x = 5
    switchToGameBoard.y = 145


    const state = this.gameService.getState();
    const currentPlayer = this.gameService.getCurrentPlayer();
    console.log('Current Player = ', currentPlayer);
    if(state && currentPlayer) {
      const hands = state.G.hands;
      const currentPlayersHand = hands[currentPlayer]
      console.log(currentPlayersHand)

      for(let i = 0; i < currentPlayersHand.length; i++) {

        const handleSnap = (gridX: number, gridY: number, orientation: 0 | 90 | 180 | 270) => {
          console.log(`Snapped to grid cell: (${gridX}, ${gridY})`);
          this.gameService.makeMove("placeTile",gridX,gridY,i,orientation)
          // TODO: Die Spieler nehmen sich momentan gegenseitig tiles weg, dadurch kann es passieren
          // das, das i das hier als position der Karte in der Spieler Hand übergeben wird,
          // in der Spielerhand nicht mehr existiert
          this.gameService.endTheTurn()
        };

        const handSpriteContainer = await createSpriteContainer(currentPlayersHand[i].image, i);
        makeDraggable(handSpriteContainer,40,handleSnap,gridInContainer);
        this.stage.addChild(handSpriteContainer)

      }

    }
    
    this.app.stage.addChild(gridInContainer);
    this.stage.addChild(testButton);
    this.stage.addChild(spawnButton);
    this.stage.addChild(switchToGameBoard);

  }

}
