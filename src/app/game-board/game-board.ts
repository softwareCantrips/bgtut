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
  }

  disableContextMenu(event: MouseEvent): void {
    event.preventDefault();
  }

  async ngAfterViewInit(): Promise<void> {

    this.app = new Application();

    await this.app.init({
      width: 800,
      height: 600,
      backgroundColor: 0xADD8E6,
      antialias: true
    });

    const containerElement = document.getElementById('pixi-container');
    this.stage = this.app.stage;
    this.stage.hitArea = this.app.screen;
    this.stage.eventMode = 'static';

    //// Sprite

    try {
      this.straightBrownTexture = await Assets.load(this.IMAGE_PATH_STRAIGHT_BROWN);
      console.log('Straight brown texture loaded successfully.');
    } catch (error) {
      console.error('Error loading straight brown texture:', error);
    }

    const spriteContainer = new Container();
    const sprite = new Sprite(this.straightBrownTexture);
    sprite.width = 50;
    sprite.height = 50;
    sprite.anchor.set(0.5);
    spriteContainer.addChild(sprite)
    spriteContainer.x = 250
    spriteContainer.y = 170

     const handleSnap = (gridX: number, gridY: number) => {
      console.log(`Snapped to grid cell: (${gridX}, ${gridY})`);
      this.gameService.makeMove("clickCell",gridX,gridY,"straight")
    };

    const gridInContainer = createGridBoard(150,150,225,225,50);
    makeDraggable(spriteContainer,50,handleSnap,gridInContainer);

    this.stage.addChild(spriteContainer)

    //// Sprite End

    if (containerElement && this.app && this.app.canvas) {
      containerElement.appendChild(this.app.canvas as HTMLCanvasElement);
    }

        const testButton = createTestButton(() => {
      console.log('Custom button logic!');
      this.gameService.makeMove("clickCell", 5);
    });

    testButton.x = 5
    testButton.y = 5

    const spawnButton = createSpawnButton(() => {
      this.gameService.makeMove("clickCell",5,5)
    });

    spawnButton.x = 5
    spawnButton.y = 75

    const switchToGameBoard = createSwitchToMainMenuButton(() => {
      this.router.navigateByUrl('/mainmenu');
    });

    switchToGameBoard.x = 5
    switchToGameBoard.y = 145

    this.app.stage.addChild(gridInContainer);
    this.stage.addChild(testButton);
    this.stage.addChild(spawnButton);
    this.stage.addChild(switchToGameBoard);
    this.stage.addChild(spriteContainer);

  }

}
