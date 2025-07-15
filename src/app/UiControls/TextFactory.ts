import * as PIXI from 'pixi.js';

export function createText(text: string, textColor: number, outlineColor: number, fontSize: number): PIXI.Text {
    const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: fontSize,
        fill: textColor,
        stroke: outlineColor,
        strokeThickness: 4,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
    });

    const richText = new PIXI.Text(text, style);
    return richText;
}
