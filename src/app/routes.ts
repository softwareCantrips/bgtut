import { Routes } from '@angular/router';
import { App } from './app';
import { GameBoard } from './game-board/game-board'
import { MainMenu } from './main-menu/main-menu';


export const routes: Routes = [
  { path: '', redirectTo: 'mainmenu', pathMatch: 'full' },
  { path: 'mainmenu', component: MainMenu},
  { path: 'gameboard', component: GameBoard}
];