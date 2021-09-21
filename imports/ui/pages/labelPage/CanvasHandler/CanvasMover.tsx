import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { IPoint } from '../../../../canvasTools/IPoint';
import {
  canvasView,
  canvasViewDispatcherState,
} from '../../../../recoil/canvas';
import Canvas from '../Canvas';
import { ICanvasHandlerProps } from './ICanvasHandler';

type HandlerState = 'idle' | 'moveCanvas';

export default function CanvasMover({ frame, onWheel }: ICanvasHandlerProps) {
  const [state, setState] = useState<HandlerState>('idle');
  const view = useRecoilValue(canvasView);
  const canvasViewDispatcher = useRecoilValue(canvasViewDispatcherState);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    switch (state) {
      case 'idle':
        setState('moveCanvas');
        break;
      default:
        break;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const movementOffset: IPoint = {
      x: e.movementX,
      y: e.movementY,
    };

    switch (state) {
      case 'moveCanvas':
        canvasViewDispatcher?.shiftCanvas(movementOffset);
        break;
      default:
        break;
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    switch (state) {
      default:
        setState('idle');
        break;
    }
  };

  const handleMouseOut = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    switch (state) {
      default:
        setState('idle');
        break;
    }
  };

  return (
    <Canvas
      frame={frame}
      onWheel={onWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseOut}
    />
  );
}
