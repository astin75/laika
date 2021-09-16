import {
  getNormOfPoint,
  IPoint,
  transformCanvasPointToImagePoint,
} from '../../../../../canvasTools/IPoint';
import { makeRectRegion } from '../../../../../canvasTools/IRect';
import Canvas from '../Canvas';
import {
  annotationDispatcherState,
  currentAnnotations,
} from '../../../../../recoil/annotation';
import { canvasView } from '../../../../../recoil/canvas';
import _ from 'lodash';
import React, { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ICanvasHandlerProps } from './ICanvasHandler';

type HandlerState =
  | 'idle'
  | 'holding' // Mouse Down
  | 'pending' // Pending update for recoil data
  | 'draw'; // Drawing State

// React Region 생성 Handler
export default function RectDrawer({ frame, onWheel }: ICanvasHandlerProps) {
  const [state, setState] = useState<HandlerState>('idle');
  const [startPoint, setStartPoint] = useState<IPoint>({ x: 0, y: 0 });
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);
  const annotations = useRecoilValue(currentAnnotations);
  const lastCount = useRef<number>(annotations.length);
  const view = useRecoilValue(canvasView);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const mousePoint: IPoint = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };

    switch (state) {
      case 'idle':
        setStartPoint(mousePoint);
        setState('holding');
        break;
      default:
        break;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const mousePoint: IPoint = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
    const movementOffset: IPoint = {
      x: e.movementX,
      y: e.movementY,
    };
    const [pointA, pointB] = transformCanvasPointToImagePoint(
      view,
      startPoint,
      mousePoint
    );

    switch (state) {
      case 'holding': {
        if (!(getNormOfPoint(movementOffset) > 0)) break;
        annotationDispatcher?.insert(makeRectRegion(pointA, pointB));
        setState('pending');
        break;
      }
      case 'pending':
        if (lastCount.current !== annotations.length) {
          setState('draw');
          lastCount.current = annotations.length;
        }
        break;
      case 'draw': {
        const idx = annotations.length - 1;
        const updateAnnotation = _.cloneDeep(annotations[idx]);
        updateAnnotation.region = makeRectRegion(pointA, pointB);
        annotationDispatcher?.edit(idx, updateAnnotation, true);
        break;
      }
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
