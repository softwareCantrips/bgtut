import { Injectable } from '@angular/core';
import { Client } from 'boardgame.io/client';
import { MyGame, MyGameState } from './game/LineBoard'
import { SocketIO } from 'boardgame.io/multiplayer'
import { TrackTile } from './game/TrackTile';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _gameClient: ReturnType<typeof Client> | null = null;
  private _numPlayers = 2;
  private _playerID = '0';

  private _subscribers: ((state: any) => void)[] = [];


  startGame() {
    this._gameClient = Client({
      game: MyGame,
      multiplayer: SocketIO({ server: 'localhost:8000' }),
      numPlayers: this._numPlayers,
      playerID: this._playerID,
    });


    this._gameClient.subscribe((state) => {
      this._subscribers.forEach(cb => cb(state));
    });


    this._gameClient.start();
  }

  onUpdate(callback: (state: any) => void) {
    this._subscribers.push(callback);
  }

  endGame() {
    this._gameClient?.stop?.();
  }

  setPlayerID(pID: string) {
    this._playerID = pID;
  }

  getPlayerID(): string {
    return this._playerID;
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
