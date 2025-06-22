import { Container, FederatedPointerEvent, Graphics } from 'pixi.js';

export function makeDraggable(
  target: Container,
  gridSize: number = 0,
  onSnap?: (gridX: number, gridY: number, orientation: 0 | 90 | 180 | 270) => void,
  gridBoard?: Container
) {
  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  // Extract grid area bounds from gridBoard's first child (the background)
  let gridBounds: { x: number; y: number; width: number; height: number } | undefined;
  if (gridBoard && gridBoard.children.length > 0 && gridBoard.children[0] instanceof Graphics) {
    const bg = gridBoard.children[0] as Graphics;
    const bounds = bg.getBounds();
    gridBounds = {
      x: bounds.x,
      y: bounds.y,
      width: bounds.width,
      height: bounds.height,
    };
  }

  target.eventMode = 'static';
  target.cursor = 'grab';

  target.on('pointertap', (event: FederatedPointerEvent) => {
    if (event.button !== 0) return;

    if (!dragging) {
      dragging = true;
      const pos = event.global;
      offsetX = pos.x - target.x;
      offsetY = pos.y - target.y;
      target.cursor = 'grabbing';
    } else {
      dragging = false;
      target.cursor = 'grab';

      if (gridSize > 0 && gridBounds) {
        const isInsideGrid =
          target.x >= gridBounds.x &&
          target.y >= gridBounds.y &&
          target.x <= gridBounds.x + gridBounds.width &&
          target.y <= gridBounds.y + gridBounds.height;

        if (isInsideGrid) {
          const snapped = snapToGrid(target.x, target.y, gridSize);
          const gridX = Math.floor((snapped.x - gridBounds.x) / gridSize);
          const gridY = Math.floor((snapped.y - gridBounds.y) / gridSize);

          target.x = snapped.x;
          target.y = snapped.y;

          const orientation: 0 | 90 | 180 | 270 = convertRotationToOrientation(target.rotation);

          if (onSnap) {
            onSnap(gridX, gridY, orientation);
          }
        }
      }
    }
  });

  target.on('rightclick', () => {
    if (dragging) {
      console.log('Rotation = ',target.rotation);
      //target.rotation += Math.PI / 2;
      target.rotation = (target.rotation + Math.PI / 2) % (2 * Math.PI);
      console.log('Rotation after = ',target.rotation);
    }
  });

  target.on('globalpointermove', (event: FederatedPointerEvent) => {
    if (!dragging) return;
    const pos = event.global;
    target.x = pos.x - offsetX;
    target.y = pos.y - offsetY;
  });

  function convertRotationToOrientation(rotation: number): 0 | 90 | 180 | 270 {
    // Convert radians to degrees
    let degrees = (rotation * 180) / Math.PI;
    // Normalize to range [0, 360)
    degrees = ((degrees % 360) + 360) % 360;
    // Round to nearest 90
    const rounded = Math.round(degrees / 90) * 90;
    // Cast to valid orientation
    return rounded as 0 | 90 | 180 | 270;
  }

  function snapToGrid(x: number, y: number, gridSize: number): { x: number; y: number } {
    return {
      x: Math.round(x / gridSize) * gridSize,
      y: Math.round(y / gridSize) * gridSize,
    };
  }
}
