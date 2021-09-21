import { drawRegionOnCanvas } from '../../../../canvasTools/IRegionData';
import { currentAnnotations } from '../../../../recoil/annotation';
import { canvasView } from '../../../../recoil/canvas';
// import {
//   categoryDispatcher,
//   categoryDispatcherState,
//   createCategoryDispatcher,
// } from '@src/recoil/category';
// @ts-ignore
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getRandomHexColor } from '../../../../common/utils';
import { drawRectOnCanvas } from '../../../../canvasTools/IRect';
import { drawPolygonOnCanvas } from '../../../../canvasTools/IPolygon';

interface ICanvasProps {
  frame: HTMLImageElement | undefined;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
  onMouseOut?: (e: React.MouseEvent) => void;
  onWheel?: (e: React.WheelEvent) => void;
  style?: React.CSSProperties;
}

// Mouse Event 연결 및 Region Draw 함수 호출 컴포넌트
export default function Canvas({
  frame,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseOut,
  onWheel,
  style,
}: ICanvasProps) {
  const view = useRecoilValue(canvasView);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>();
  const annotations = useRecoilValue(currentAnnotations);

  // category dispatcher
  // const setCategoryDispatcher = useSetRecoilState(categoryDispatcherState);
  // const dispatcherRef = useRef<categoryDispatcher>(createCategoryDispatcher());
  // useEffect(() => {
  //   setCategoryDispatcher(dispatcherRef.current);
  // }, []);

  // const categoryDispatcher = useRecoilValue(categoryDispatcherState);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (canvasRef.current) setContext(context);
  }, [canvasRef]);

  const refreshCanvas = () => {
    if (context && frame) {
      // Canvas 초기화
      context.save();
      context.clearRect(0, 0, view.canvasSize.width, view.canvasSize.height);
      context.translate(view.offset.x, view.offset.y);
      context.scale(view.scale, view.scale);
      context.drawImage(frame, 0, 0);
      context.restore();

      // annotation draw
      annotations.forEach(async (annot) => {
        if (annot.regions.rect)
          drawRectOnCanvas(annot.regions.rect, context, view, annot.color);

        if (annot.regions.polygon)
          drawPolygonOnCanvas(
            annot.regions.polygon,
            context,
            view,
            annot.color
          );
      });
    }
  };

  useEffect(() => {
    refreshCanvas();
  });

  return (
    <canvas
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseOut={onMouseOut}
      onWheel={onWheel}
      style={style}
      ref={canvasRef}
      width={view.canvasSize.width}
      height={view.canvasSize.height}
      onFocus={() => undefined}
      onBlur={() => undefined}
    />
  );
}

Canvas.defaultProps = {
  onMouseDown: () => undefined,
  onMouseMove: () => undefined,
  onMouseUp: () => undefined,
  onMouseOut: () => undefined,
  onWheel: () => undefined,
  style: undefined,
};
