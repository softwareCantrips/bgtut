import { Component } from '@angular/core';
import { inject } from "@angular/core";
import { GameService } from '../game-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Application, Assets, Color, Container, Graphics, RoundedRectangle, Sprite, Texture } from 'pixi.js';
import { PixiButton } from '../UiControls/Button';
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

    // For now this does not set the amount of players but the playerID
    const playerButtons: PixiButton[] = [];

    const twoPlayers = createPlayers2Button(() => {
      this.gameService.setNumPlayers(2); // This seems to be a fixed value, consider if it should change
      this.gameService.setPlayerID('0');
      this.updatePlayerButtonStates('0', playerButtons);
    });
    twoPlayers.x = 5;
    twoPlayers.y = 70;
    playerButtons.push(twoPlayers);

    const threePlayers = createPlayers3Button(() => {
      this.gameService.setNumPlayers(2); // This seems to be a fixed value, consider if it should change
      this.gameService.setPlayerID('1');
      this.updatePlayerButtonStates('1', playerButtons);
    });
    threePlayers.x = 75;
    threePlayers.y = 70;
    playerButtons.push(threePlayers);

    const fourPlayers = createPlayers4Button(() => {
      this.gameService.setNumPlayers(2); // This seems to be a fixed value, consider if it should change
      // Assuming playerID '4' and '5' are placeholders and should be '2' and '3'
      this.gameService.setPlayerID('2');
      this.updatePlayerButtonStates('2', playerButtons);
    });
    fourPlayers.x = 145;
    fourPlayers.y = 70;
    playerButtons.push(fourPlayers);

    const fivePlayers = createPlayers5Button(() => {
      this.gameService.setNumPlayers(2); // This seems to be a fixed value, consider if it should change
      this.gameService.setPlayerID('3');
      this.updatePlayerButtonStates('3', playerButtons);
    });
    fivePlayers.x = 215;
    fivePlayers.y = 70;
    playerButtons.push(fivePlayers);

    const switchToGameBoard = createSwitchToGameBoardButton(() => {
      this.router.navigateByUrl('/gameboard');
    });
    switchToGameBoard.x = 5;
    switchToGameBoard.y = 145;

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
      if (buttonText === 'P 0') {
        buttonPlayerId = '0';
      } else if (buttonText === 'P 1') {
        buttonPlayerId = '1';
      } else if (buttonText === '4') { // Corresponds to playerID '2'
        buttonPlayerId = '2';
      } else if (buttonText === '5') { // Corresponds to playerID '3'
        buttonPlayerId = '3';
      }

      if (buttonPlayerId !== null) {
        button.setActive(buttonPlayerId === selectedPlayerID);
      }
    });
  }
}
