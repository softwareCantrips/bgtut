import { Injectable } from '@angular/core';
import { Client } from 'boardgame.io/client';
import { MyGame, MyGameState } from './game/LineBoard'

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _gameClient: ReturnType<typeof Client> | null = null;
  private _numPlayers = 2;


  startGame() {
    this._gameClient = Client({
      game: MyGame,
      numPlayers: this._numPlayers
    });
    this._gameClient.start();
  }

  endGame() {
    this._gameClient?.stop?.();
  }

  setNumPlayers(n: number) {
    this._numPlayers = n;
  }

  getCurrentPlayer():string | undefined {
    return this._gameClient?.getState()?.ctx.currentPlayer
  }

  getState(): { G: MyGameState } | undefined {
    return this._gameClient?.getState() as { G: MyGameState } | undefined;
  }

  makeMove(moveName: string, ...args: any[]) {
    console.log("In makeMove in game-service args = ", args);
    this._gameClient?.moves[moveName](...args);
  }

  endTheTurn() {
    console.log('End the turn');
    this._gameClient?.events?.endTurn?.();
  }

   subscribe(callback: () => void) {
    this._gameClient?.subscribe(callback);
  }

  getSomeText() {
    return "This is some text";
  }
}
