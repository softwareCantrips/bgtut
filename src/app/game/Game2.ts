interface TicTacToeState {
  cells: (string | null)[];
}

export const TicTacToe = {
  setup: (): TicTacToeState => ({
    cells: Array(9).fill(null),
  }),

  moves: {
    clickCell(
      { G, playerID }: { G: TicTacToeState; playerID: string },
      id: number
    ) {
      if (G.cells[id] === null) {
        G.cells[id] = playerID;
      }
    },
  },
};