import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  getNormOfPoint,
  IPoint,
  transformCanvasPointToImagePoint,
} from '../../../../../canvasTools/IPoint';
import { isPointInRect } from '../../../../../canvasTools/IRect';
import { findNearestPoint } from '../../../../../canvasTools/IRegionData';
import {
  annotationDispatcherState,
  currentAnnotations,
  selectionIdx,
} from '../../../../../recoil/annotation';
import {
  canvasView,
  canvasViewDispatcherState,
} from '../../../../../recoil/canvas';
import Canvas from '../Canvas';
import { ICanvasHandlerProps } from './ICanvasHandler';

type HandlerState =
  | 'idle'
  | 'onRegion'
  | 'onPoint'
  | 'moveCanvas'
  | 'holding'
  | 'movePoint';

// Region/Vertex 선택 이벤트 Handler
export default function RectEditor({ frame, onWheel }: ICanvasHandlerProps) {
  const [state, setState] = useState<HandlerState>('idle');
  const view = useRecoilValue(canvasView);
  const canvasViewDispatcher = useRecoilValue(canvasViewDispatcherState);
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);
  const annotations = useRecoilValue(currentAnnotations);
  const selection = useRecoilValue(selectionIdx);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    switch (state) {
      case 'idle':
        setState('moveCanvas');
        break;
      case 'onPoint':
        setState('holding');
        break;
      case 'onRegion':
        break;
      default:
        break;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const mousePoint: IPoint = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
    const movementOffset: IPoint = {
      x: e.movementX,
      y: e.movementY,
    };
    const [transformedPosition] = transformCanvasPointToImagePoint(
      view,
      mousePoint
    );

    switch (state) {
      case 'idle':
      case 'onRegion':
      case 'onPoint': {
        const region = annotations[selection].regions.rect;
        if (region === undefined) break;
        if (isPointInRect(mousePoint, region, view, 5)) {
          const nearestPoint = findNearestPoint(mousePoint, region, view, 5);
          if (nearestPoint !== undefined) setState('onPoint');
          else setState('onRegion');
        }
        break;
      }
      case 'moveCanvas':
        canvasViewDispatcher?.shiftCanvas(movementOffset);
        break;
      case 'holding':
        if (!(getNormOfPoint(movementOffset) > 0)) break;
        setState('movePoint');
        break;
      case 'movePoint':
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
