import { Component } from '@angular/core';
import { inject } from "@angular/core";
import { GameService } from './game-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Application, Assets, Color, Container, Graphics, RoundedRectangle, Sprite, Texture } from 'pixi.js';
import { createSpawnButton, createTestButton, createSwitchToGameBoardButton } from './UiControls/ButtonDefinitions';
import { makeDraggable } from './UiControls/DragHelper';
import { createGridBoard } from './UiControls/DrawGrid'
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import '@pixi/graphics-extras';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [CommonModule,FormsModule,RouterModule, RouterOutlet],
  styleUrl: './app.scss'
})
export class App {



  protected title = 'bgtut';

  private readonly IMAGE_PATH_STRAIGHT_BROWN = 'assets/images/straight-brown.jpg';
  private straightBrownTexture: Texture | undefined

  private gameService = inject(GameService);

  constructor(private router: Router) {
    
  }

  private app!: Application;
  private stage!: Container;

  ngOnInit(): void {
    // Disable right-click context menu
    document.addEventListener('contextmenu', this.disableContextMenu);
  }

  disableContextMenu(event: MouseEvent): void {
    event.preventDefault();
  }


}
