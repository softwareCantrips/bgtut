import { Injectable } from '@angular/core';
import { Client } from 'boardgame.io/client';
import { MyGame } from './game/LineBoard'

@Injectable({
  providedIn: 'root'
})
export class GameService {

  gameClient = Client({
    game: MyGame,
    numPlayers: 2,
  });

  constructor() {
    this.gameClient.start();
  }

  getState() {
    return this.gameClient.getState();
  }

  makeMove(moveName: string, ...args: any[]) {
    console.log("In makeMove in game-service args = ", args);
    this.gameClient.moves[moveName](...args);
  }

   subscribe(callback: () => void) {
    this.gameClient.subscribe(callback);
  }

  getSomeText() {
    return "This is some text";
  }
}
