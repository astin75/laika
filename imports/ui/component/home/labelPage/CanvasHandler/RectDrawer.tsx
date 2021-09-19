import {
  getNormOfPoint,
  IPoint,
  transformCanvasPointToImagePoint,
} from '../../../../../canvasTools/IPoint';
import {makeRectRegion} from '../../../../../canvasTools/IRect';
import Canvas from '../Canvas';
import {
  annotationDispatcherState,
  currentAnnotations, selectionIdx,
} from '../../../../../recoil/annotation';
import {canvasView} from '../../../../../recoil/canvas';
import _ from 'lodash';
import React, {useRef, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {ICanvasHandlerProps} from './ICanvasHandler';

type HandlerState =
  | 'idle'
  | 'holding' // Mouse Down
  | 'pending' // Pending update for recoil data
  | 'draw'; // Drawing State

// React Region 생성 Handler
export default function RectDrawer({frame, onWheel}: ICanvasHandlerProps) {
  const [state, setState] = useState<HandlerState>('idle');
  const [startPoint, setStartPoint] = useState<IPoint>({x: 0, y: 0});
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);
  const annotations = useRecoilValue(currentAnnotations);
  const [selection, setSelection] = useRecoilState(selectionIdx);

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
        console.log(movementOffset)
        if (!(getNormOfPoint(movementOffset) > 0)) break;
        setState('draw');
        break;
      }
      case 'draw': {
        const updateAnnotation = _.cloneDeep(annotations[selection]);
        updateAnnotation.regions.rect = makeRectRegion(pointA, pointB);
        annotationDispatcher?.edit(selection, updateAnnotation, true);
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
