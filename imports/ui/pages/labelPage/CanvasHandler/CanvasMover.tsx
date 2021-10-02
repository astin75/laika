import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IPoint } from '../../../../canvasTools/IPoint';
import {
  canvasView,
  canvasViewDispatcherState
} from '../../../../recoil/canvas';
import Canvas from '../Canvas';
import { ICanvasHandlerProps } from './ICanvasHandler';
import { annotationDispatcherState, currentAnnotations, selectionIdx } from '../../../../recoil/annotation';
import { isPointInRect } from '../../../../canvasTools/IRect';
import { findNearestRectRegion } from '../../../../canvasTools/IRegionData';

type HandlerState = 'idle' | 'moveCanvas' | 'onRegion';

export default function CanvasMover({ frame, onWheel }: ICanvasHandlerProps) {
  const [state, setState] = useState<HandlerState>('idle');
  const canvasViewDispatcher = useRecoilValue(canvasViewDispatcherState);
  const annotations = useRecoilValue(currentAnnotations);
  const [selection, setSelection] = useRecoilState(selectionIdx);
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);
  const view = useRecoilValue(canvasView);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const mousePoint: IPoint = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY
    };
    switch (state) {
      case 'idle':
        setState('moveCanvas');
        break;
      case 'onRegion': {
        const nearestRect = findNearestRectRegion(mousePoint, annotations, view);
        setSelection(nearestRect);
        break;
      }
      default:
        break;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const movementOffset: IPoint = {
      x: e.movementX,
      y: e.movementY
    };
    const mousePoint: IPoint = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY
    };

    switch (state) {
      case 'idle':
      case 'onRegion': {
        const nearestRect = findNearestRectRegion(mousePoint, annotations, view);
        if (nearestRect !== undefined)
          setState('onRegion');
        else
          setState('idle');
        annotationDispatcher?.highlightRect(nearestRect, undefined);
      }
        break;
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
