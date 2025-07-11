import { Container, FederatedPointerEvent } from 'pixi.js';

export function makeDraggable(
  target: Container, 
  gridSize: number = 0,
  onSnap?: (gridX: number, gridY: number) => void) {
  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  const onContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  target.eventMode = 'static'; // Enable pointer interaction
  target.cursor = 'grab';

  // Toggle dragging on tap (left click)
  target.on('pointertap', (event: FederatedPointerEvent) => {
     // Only toggle dragging on **left-click** (button 0)
    if (event.button !== 0){
      return;
    } 
    if (!dragging) {
      dragging = true;
      const pos = event.global;
      offsetX = pos.x - target.x;
      offsetY = pos.y - target.y;
      target.cursor = 'grabbing';
    } else {
      dragging = false;
      target.cursor = 'grab';
      
       // Snap to grid if gridSize is set
      if (gridSize > 0) {
        const snapped = snapToGrid(target.x, target.y, gridSize);
        const cordX = snapped.x / gridSize
        const cordY = snapped.y / gridSize
        target.x = snapped.x;
        target.y = snapped.y;

        if (onSnap) {
          onSnap(cordX, cordY);
        }

      }
    }
  });

    // Rotate on right-click (only while dragging)
  target.on('rightclick', () => {
    if (dragging) {
      target.rotation += Math.PI / 2; // 90 degrees clockwise
    }
  });

  // Move the object while dragging
  target.on('globalpointermove', (event: FederatedPointerEvent) => {
    if (!dragging) return;
    const pos = event.global;
    target.x = pos.x - offsetX;
    target.y = pos.y - offsetY;
  });


  function snapToGrid(x: number, y: number, gridSize: number): { x: number; y: number } {
  return {
    x: Math.round(x / gridSize) * gridSize,
    y: Math.round(y / gridSize) * gridSize,
  };
}


}