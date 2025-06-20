import { Container, Graphics } from 'pixi.js';

/**
 * Creates a grid on a grey background and returns it as a container.
 *
 * @param width Width of the board area in pixels
 * @param height Height of the board area in pixels
 * @param xStart 
 * @param yStart 
 * @param cellSize Size of each cell
 * @param color Color of the grid lines
 */
export function createGridBoard(
  width: number,
  height: number,
  xStart: number,
  yStart: number,
  cellSize: number,
  color: number = 0xff0000
): Container {
  const container = new Container();

  // 1. Background
  const background = new Graphics();

  background.rect(xStart,yStart,width,height)
  background.fill(0xf1ddf6);
  container.addChild(background);

  // 2. Grid lines
  const grid = new Graphics();

  // Vertical lines
  for (let x = xStart; x <= xStart + width; x += cellSize) {
    grid.moveTo(x, yStart);
    grid.lineTo(x, yStart + height);
  }

  // Horizontal lines
  for (let y = yStart; y <= yStart + height; y += cellSize) {
    grid.moveTo(xStart, y);
    grid.lineTo(xStart + width, y);
  }

  grid.stroke({ width: 1, color, alpha: 0.9 });
  container.addChild(grid);

  return container;
}