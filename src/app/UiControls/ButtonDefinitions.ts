import { PixiButton } from './Button';


export function createTestButton(onClick?: () => void): PixiButton {
  return new PixiButton({
    text: 'Click Me',
    onClick: onClick ?? (() => console.log('Button clicked!')),
    width: 180,
    height: 60,
    defaultColor: 0xbffcdd,
    hoverColor: 0xbffcfb,
    activeColor: 0xbfdffc,
  });
}

export function createSpawnButton(onClick?: () => void): PixiButton {
  return new PixiButton({
    text: 'Spawn Tile',
    onClick: onClick ?? (() => console.log('Spawn clicked!')),
    width: 180,
    height: 60,
    defaultColor: 0xbffcdd,
    hoverColor: 0xbffcfb,
    activeColor: 0xbfdffc,
  });
}

export function createSwitchToGameBoardButton(onClick?: () => void): PixiButton {
  return new PixiButton({
    text: 'Move to GameBoard',
    onClick: onClick ?? (() => console.log('Spawn clicked!')),
    width: 180,
    height: 60,
    defaultColor: 0xbffcdd,
    hoverColor: 0xbffcfb,
    activeColor: 0xbfdffc,
  });
}


export function createPlayers2Button(onClick?: () => void): PixiButton {
  return new PixiButton({
    text: '2',
    onClick: onClick ?? (() => console.log('Two Players')),
    width: 60,
    height: 60,
    defaultColor: 0xbffcdd,
    hoverColor: 0xbffcfb,
    activeColor: 0xbfdffc,
  });
}

export function createPlayers3Button(onClick?: () => void): PixiButton {
  return new PixiButton({
    text: '3',
    onClick: onClick ?? (() => console.log('Three Players')),
    width: 60,
    height: 60,
    defaultColor: 0xbffcdd,
    hoverColor: 0xbffcfb,
    activeColor: 0xbfdffc,
  });
}

export function createPlayers4Button(onClick?: () => void): PixiButton {
  return new PixiButton({
    text: '4',
    onClick: onClick ?? (() => console.log('Four Players')),
    width: 60,
    height: 60,
    defaultColor: 0xbffcdd,
    hoverColor: 0xbffcfb,
    activeColor: 0xbfdffc,
  });
}

export function createPlayers5Button(onClick?: () => void): PixiButton {
  return new PixiButton({
    text: '5',
    onClick: onClick ?? (() => console.log('Five Players')),
    width: 60,
    height: 60,
    defaultColor: 0xbffcdd,
    hoverColor: 0xbffcfb,
    activeColor: 0xbfdffc,
  });
}


export function createSwitchToMainMenuButton(onClick?: () => void): PixiButton {
  return new PixiButton({
    text: 'Move to Main Menu',
    onClick: onClick ?? (() => console.log('Spawn clicked!')),
    width: 180,
    height: 60,
    defaultColor: 0xbffcdd,
    hoverColor: 0xbffcfb,
    activeColor: 0xbfdffc,
  });
}


