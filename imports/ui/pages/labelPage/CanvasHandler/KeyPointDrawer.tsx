import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  getNormOfPoint,
  IPoint,
  transformCanvasPointToImagePoint
} from '../../../../canvasTools/IPoint';
import { appendPointToPolygon, movePolygonVertex } from '../../../../canvasTools/IPolygon';
import {
  findNearestKeyPoint,
  findNearestPoint,
  IVertexInfo
} from '../../../../canvasTools/IRegionData';
import {
  annotationDispatcherState,
  currentAnnotations,
  IAnnotation, keypointIdx,
  selectionIdx
} from '../../../../recoil/annotation';
import { canvasView } from '../../../../recoil/canvas';
import Canvas from '../Canvas';
import { ICanvasHandlerProps } from './ICanvasHandler';
import { appendKeypoint, moveKeypointVertex } from '../../../../canvasTools/ISkeleton';

type HandlerState = 'idle' | 'onPoint' | 'holding' | 'movePoint';


export default function KeyPointDrawer({ frame, onWheel, projectInfo }: ICanvasHandlerProps) {
  const [state, setState] = useState<HandlerState>('idle');
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);
  const annotations = useRecoilValue(currentAnnotations);
  const [selection, setSelection] = useRecoilState(selectionIdx);
  const [curKeypoint, setCurKeypoint] = useRecoilState(keypointIdx);

  const view = useRecoilValue(canvasView);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const mousePoint: IPoint = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY
    };
    const [transformed] = transformCanvasPointToImagePoint(view, mousePoint);

    switch (state) {
      case 'idle': {
        if (curKeypoint === projectInfo.keypoint.length)
          break;
        if (annotations[selection].regions.keypoint.points[curKeypoint]?.visible !== 0)
          return;
        const updateAnnotation: IAnnotation = _.cloneDeep(annotations[selection]);
        updateAnnotation.regions.keypoint = appendKeypoint(
          updateAnnotation.regions.keypoint,
          transformed,
          curKeypoint,
          projectInfo
        );
        annotationDispatcher?.edit(selection, updateAnnotation, false);
        if (updateAnnotation.regions.keypoint.points[curKeypoint + 1]?.visible === 0)
          setCurKeypoint((prev) => prev + 1);
        break;
      }
      case 'onPoint': {
        setState('holding');
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
      y: e.nativeEvent.offsetY
    };
    const movementOffset: IPoint = {
      x: e.movementX,
      y: e.movementY
    };

    switch (state) {
      case 'holding':
        if (!(getNormOfPoint(movementOffset) > 0)) break;
        setState('movePoint');
        break;
      case 'movePoint': {
        const updatedAnnot: IAnnotation = _.cloneDeep(annotations[selection]);
        updatedAnnot.regions.keypoint = moveKeypointVertex(
          annotations[selection].regions.keypoint,
          annotations[selection].regions.keypoint.highlightedVertex.idx,
          mousePoint,
          view
        );
        annotationDispatcher.edit(selection, updatedAnnot, true);
        break;
      }
      default: {
        let vertex: IVertexInfo = undefined;
        const region = annotations[selection]?.regions.keypoint;
        if (region === undefined) break;
        const nearestPoint = findNearestPoint(mousePoint, region, view, 10);
        if (nearestPoint !== undefined) {
          setState('onPoint');
          vertex = {
            idx: nearestPoint,
            type: 'boundingPoint'
          };
        } else {
          setState('idle');
        }
        annotationDispatcher?.highlightKeypoint(selection, vertex);
        break;
      }
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

  const keyDownHandler = (e) => {
    // visibility 선택
    if (e.code.includes('Digit')) {
      const num = Number(e.key) - 1;
      if (selection !== undefined && num >= 0 && num <= 2) {
        const newAnnot = _.cloneDeep(annotations[selection]);
        newAnnot.regions.keypoint.points[curKeypoint].visible = num;
        annotationDispatcher?.edit(selection, newAnnot, false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  });

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
