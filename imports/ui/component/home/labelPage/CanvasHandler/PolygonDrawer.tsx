import _ from 'lodash';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  IPoint,
  transformCanvasPointToImagePoint,
} from '../../../../../canvasTools/IPoint';
import { appendPointToPolygon } from '../../../../../canvasTools/IPolygon';
import { findNearestPoint } from '../../../../../canvasTools/IRegionData';
import {
  annotationDispatcherState,
  currentAnnotations,
  IAnnotation,
  selectionIdx,
} from '../../../../../recoil/annotation';
import { canvasView } from '../../../../../recoil/canvas';
import Canvas from '../Canvas';
import { ICanvasHandlerProps } from './ICanvasHandler';

type HandlerState = 'idle' | 'onPoint';

export default function PolygonDrawer({ frame, onWheel }: ICanvasHandlerProps) {
  const [state, setState] = useState<HandlerState>('idle');
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
    const [transformed] = transformCanvasPointToImagePoint(view, mousePoint);

    switch (state) {
      case 'idle': {
        const updateAnnotation: IAnnotation = _.cloneDeep(
          annotations[selection]
        );
        updateAnnotation.regions.polygon = appendPointToPolygon(
          updateAnnotation.regions.polygon,
          transformed
        );
        annotationDispatcher?.edit(selection, updateAnnotation, true);
        break;
      }

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

    switch (state) {
      default:
        // findNearestPoint();
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
