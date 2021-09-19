import { getNormOfPoint, IPoint }
import { moveBoundingPointOfRect } from '@src/canvasTool/shapes/IRect';
import {
  findNearestRegion,
  IVertexInfo,
} from '@src/canvasTool/shapes/IRegionData';
import Canvas from '@src/components/atoms/canvas';
import {
  annotationDispatcherState,
  currentAnnotations,
  currentHighligtedAnnotation,
} from '@src/recoil/annotation';
import { canvasView, canvasViewDispatcherState } from '@src/recoil/canvas';
import _ from 'lodash';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ICanvasHandlerProps } from './ICanvasHandler';

type HandlerState =
  | 'idle'
  | 'onRegion'
  | 'onPoint'
  | 'moveCanvas'
  | 'holding'
  | 'movePoint';

// 캔버스 이동, Region/Vertex 선택 이벤트 Handler
export default function CanvasSelector({
                                         frame,
                                         onWheel,
                                       }: ICanvasHandlerProps) {
  const [state, setState] = useState<HandlerState>('idle');
  const view = useRecoilValue(canvasView);
  const canvasViewDispatcher = useRecoilValue(canvasViewDispatcherState);
  const annotationDispatcher = useRecoilValue(annotationDispatcherState);
  const annotations = useRecoilValue(currentAnnotations);
  const highlightedAnnot = useRecoilValue(currentHighligtedAnnotation);

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
        if (highlightedAnnot) {
          const { idx, annot } = highlightedAnnot;
          const updatedAnnot = _.cloneDeep(annot);
          updatedAnnot.region.selected = !updatedAnnot.region.selected;
          annotationDispatcher?.edit(idx, updatedAnnot, true);
        }
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

    switch (state) {
      case 'idle':
      case 'onRegion':
      case 'onPoint': {
        const regions = annotations.map((annot) => annot.region);
        const { nearestAnnotationIdx, nearestPointIdx } = findNearestRegion(
          mousePoint,
          regions,
          view,
        );
        if (nearestPointIdx !== undefined) {
          setState('onPoint');
        } else if (nearestAnnotationIdx !== undefined) {
          setState('onRegion');
        } else {
          setState('idle');
        }
        if (nearestPointIdx !== undefined) {
          const vertex: IVertexInfo = {
            idx: nearestPointIdx,
            type: 'boundingPoint',
          };
          annotationDispatcher?.highlightRegion(nearestAnnotationIdx, vertex);
        } else {
          annotationDispatcher?.highlightRegion(
            nearestAnnotationIdx,
            undefined,
          );
        }
        break;
      }
      case 'moveCanvas':
        canvasViewDispatcher?.shiftCanvas(movementOffset);
        break;
      case 'holding':
        if (!(getNormOfPoint(movementOffset) > 0)) break;
        if (highlightedAnnot) {
          annotationDispatcher?.edit(
            highlightedAnnot.idx,
            highlightedAnnot.annot,
            false,
          );
        }
        setState('movePoint');
        break;

      case 'movePoint':
        if (highlightedAnnot) {
          const { idx, annot } = highlightedAnnot;
          const updatedAnnot = _.cloneDeep(annot);
          if (updatedAnnot.region.highlightedVertex !== undefined) {
            updatedAnnot.region = moveBoundingPointOfRect(
              updatedAnnot.region,
              updatedAnnot.region.highlightedVertex.idx,
              mousePoint,
              view,
            );
            annotationDispatcher?.edit(idx, updatedAnnot, true);
          }
        }
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
