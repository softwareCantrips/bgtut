export interface MyGameState {
  board: (string | null)[][];
}

export const MyGame = {
  setup: (): MyGameState => ({
    board: Array.from({ length: 12 }, () => Array(12).fill(null)),
  }),

  moves: {
    clickCell(
      { G, playerID }: { G: MyGameState; playerID: string },
      x: number,
      y: number,
      tileName: string
    ) {
      if (G.board[y][x] === null) {
        G.board[y][x] = tileName;
      }
    },
  },
};