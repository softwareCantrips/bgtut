// src/server.js
import { Server, Origins } from 'boardgame.io/server';
import { MyGame } from '../app/game/LineBoard'

const server = Server({
  games: [MyGame],
  origins: [Origins.LOCALHOST],
});

server.run(8000);