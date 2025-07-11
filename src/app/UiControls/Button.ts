import * as PIXI from 'pixi.js';
import '@pixi/graphics-extras';

export interface PixiButtonOptions {
  width?: number;
  height?: number;
  text?: string;
  textStyle?: Partial<PIXI.TextStyle>;
  defaultColor?: number;
  hoverColor?: number;
  activeColor?: number;
  onClick?: () => void;
}

export class PixiButton extends PIXI.Container {
  private background: PIXI.Graphics;
  private textLabel!: PIXI.Text;
  private options: Required<PixiButtonOptions>;
  private isManuallyActive: boolean = false;

  constructor(options: PixiButtonOptions = {}) {
    super();

    // Default options
    this.options = {
      width: options.width ?? 150,
      height: options.height ?? 50,
      text: options.text ?? 'Button',
      textStyle: {
        fontFamily: 'Arial',
        fontSize: 18,
        fill: 0x000000,
        align: 'center',
        ...options.textStyle,
      },
      defaultColor: options.defaultColor ?? 0xFF0000,
      hoverColor: options.hoverColor ?? 0x0000FF,
      activeColor: options.activeColor ?? 0x999999,
      onClick: options.onClick ?? (() => {}),
    };

    // Create background graphic
    this.background = new PIXI.Graphics();
    

    // Enable interaction
    this.interactive = true;
    this.cursor = 'pointer';

    this.on('pointerover', this.onHover, this)
        .on('pointerdown', this.onDown, this)
        .on('pointerup', this.onUp, this)
        .on('pointerout', this.onOut, this);

    this.draw(this.options.defaultColor);

    this.addChild(this.background);

    this.textLabel = new PIXI.Text({
      text: this.options.text,
      style: new PIXI.TextStyle(this.options.textStyle),
    });

    this.textLabel.anchor.set(0.5);
    this.textLabel.position.set(this.options.width / 2, this.options.height / 2);
    this.addChild(this.textLabel);

  }

  private draw(color: number) {

    this.background.clear
    this.background.rect(0,0,this.options.width,this.options.height)
    this.background.fill(color);
    this.background.stroke({ width: 2, color: 0x000000 });
    this.background.interactive = true;
    this.background.cursor = 'pointer';
    
  }

  private onHover() {
    this.draw(this.options.hoverColor);
  }

  private onDown() {
    this.draw(this.options.activeColor);
  }

  private onUp() {
    this.draw(this.options.hoverColor);
    this.options.onClick();
  }

  private onOut() {
    if (this.isManuallyActive) {
      this.draw(this.options.activeColor);
    } else {
      this.draw(this.options.defaultColor);
    }
  }

  public setActive(isActive: boolean): void {
    this.isManuallyActive = isActive;
    if (isActive) {
      this.draw(this.options.activeColor);
    } else {
      this.draw(this.options.defaultColor);
    }
  }
}