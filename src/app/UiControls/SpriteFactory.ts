import { Assets, Container, Sprite } from "pixi.js";



export async function createSpriteContainer (image:string, position:number) :Promise<Container> {

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