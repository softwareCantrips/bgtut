import { Assets, Container, Sprite } from "pixi.js";



export async function createSpriteContainer (image:string,position:number) :Promise<Container> {

            const texture = await Assets.load(image);
            const handSpriteContainer = new Container();
            const handSprite = new Sprite(texture);
            handSprite.width = 40;
            handSprite.height = 40;
            handSprite.anchor.set(0.5);
            handSpriteContainer.addChild(handSprite)
            handSpriteContainer.x = 220
            handSpriteContainer.y = (60 + (60 * position))
            handSpriteContainer.zIndex = 100

            return handSpriteContainer

}

export function placeSpriteOnGrid(
  container: Container,
  gridX: number,
  gridY: number,
  orientation: 0 | 90 | 180 | 270,
  xStart: number,
  yStart: number,
  cellSize: number
) {
  const rotation = convertOrientationToRotation(orientation);
  container.rotation = rotation
  container.x = xStart + gridX * cellSize + cellSize / 2;
  container.y = yStart + gridY * cellSize + cellSize / 2;
}

export function convertOrientationToRotation(
  orientation: 0 | 90 | 180 | 270
): number {
  return (orientation * Math.PI) / 180;
}