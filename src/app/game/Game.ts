export const MyGame = {
  setup: () => ({
    cells: Array(9).fill(null),
  }),

  

  moves: {
    clickCell(G: any, ctx: any, id: number) {
      if (G.cells[id] === null) {
        G.cells[id] = ctx.currentPlayer;
      }
    },
  },
};