import { Component } from '@angular/core';
import { inject } from "@angular/core";
import { GameService } from '../game-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Application, Assets, Color, Container, Graphics, RoundedRectangle, Sprite, Texture } from 'pixi.js';
import { PixiButton } from '../UiControls/Button';
import { createSpawnButton, createTestButton, createSwitchToGameBoardButton, createPlayers4Button, createPlayers5Button, takePlayer0Seat, takePlayer1Seat } from '../UiControls/ButtonDefinitions';
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

    // For now this does not set the amount of players but the playerID
    const playerButtons: PixiButton[] = [];

    const seat0 = takePlayer0Seat(() => {
      this.gameService.setNumPlayers(2); // This seems to be a fixed value, consider if it should change
      this.gameService.setPlayerID('0');
      this.updatePlayerButtonStates('0', playerButtons);
    });
    seat0.x = 5;
    seat0.y = 140;
    playerButtons.push(seat0);

    const seat1 = takePlayer1Seat(() => {
      this.gameService.setNumPlayers(2); // This seems to be a fixed value, consider if it should change
      this.gameService.setPlayerID('1');
      this.updatePlayerButtonStates('1', playerButtons);
    });
    seat1.x = 135;
    seat1.y = 140;
    playerButtons.push(seat1);

    const switchToGameBoard = createSwitchToGameBoardButton(() => {
      this.router.navigateByUrl('/gameboard');
    });
    switchToGameBoard.x = 5;
    switchToGameBoard.y = 215;

    this.stage.addChild(...playerButtons);
    this.stage.addChild(switchToGameBoard);

    // Set initial button state
    // Assuming player ID '0' is the default if nothing is set in gameService
    const initialPlayerId = this.gameService.getPlayerID() || '0';
    if (!this.gameService.getPlayerID()) { // If no player ID was set, set it to default
        this.gameService.setPlayerID(initialPlayerId);
    }
    this.updatePlayerButtonStates(initialPlayerId, playerButtons);
  }

  private updatePlayerButtonStates(selectedPlayerID: string, buttons: PixiButton[]): void {
    buttons.forEach(button => {
      let buttonPlayerId: string | null = null;
      const buttonText = button.getText();
      if (buttonText === 'Player 0') {
        buttonPlayerId = '0';
      } else if (buttonText === 'Player 1') {
        buttonPlayerId = '1';
      } 
      if (buttonPlayerId !== null) {
        button.setActive(buttonPlayerId === selectedPlayerID);
      }
    });
  }
}
