import { Component } from '@angular/core';
import { inject } from "@angular/core";
import { GameService } from '../game-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Application, Assets, Color, Container, Graphics, RoundedRectangle, Sprite, Texture } from 'pixi.js';
import { createSpawnButton, createTestButton, createSwitchToGameBoardButton, createPlayers2Button, createPlayers3Button, createPlayers4Button, createPlayers5Button } from '../UiControls/ButtonDefinitions';
import { makeDraggable } from '../UiControls/DragHelper';
import { createGridBoard } from '../UiControls/DrawGrid'
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import '@pixi/graphics-extras';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './main-menu.html',
  styleUrl: './main-menu.scss'
})
export class MainMenu {

  protected title = 'bgtut';

  private app!: Application;
  private stage!: Container;

   constructor(private gameService: GameService, private router: Router) {
    
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
      backgroundColor: 0xf9d4e9,
      antialias: true
    });

    const containerElement = document.getElementById('pixi-menu-container');
    this.stage = this.app.stage;
    this.stage.hitArea = this.app.screen;
    this.stage.eventMode = 'static';

     if (containerElement && this.app && this.app.canvas) {
      containerElement.appendChild(this.app.canvas as HTMLCanvasElement);
    }

    const twoPlayers = createPlayers2Button(() => {
      this.gameService.setNumPlayers(2);
    });
    twoPlayers.x = 5
    twoPlayers.y = 70
    const threePlayers = createPlayers3Button(() => {
      this.gameService.setNumPlayers(3);
    });
    threePlayers.x = 75
    threePlayers.y = 70
    const fourPlayers = createPlayers4Button(() => {
      this.gameService.setNumPlayers(4);
    });
    fourPlayers.x = 145
    fourPlayers.y = 70
    const fivePlayers = createPlayers5Button(() => {
      this.gameService.setNumPlayers(5);
    });
    fivePlayers.x = 215
    fivePlayers.y = 70


     const switchToGameBoard = createSwitchToGameBoardButton(() => {
      this.router.navigateByUrl('/gameboard');
    });

    switchToGameBoard.x = 5
    switchToGameBoard.y = 145

    this.stage.addChild(twoPlayers, threePlayers, fourPlayers, fivePlayers);
    this.stage.addChild(switchToGameBoard);

  }

}
