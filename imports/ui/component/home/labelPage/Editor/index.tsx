// @ts-ignore
import React, { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { IPoint } from '../../../../../canvasTools/IPoint';
import {
  CanvasViewDispatcher,
  canvasViewDispatcherState,
  createCanvasViewDispatcher,
} from '../../../../../recoil/canvas';
import CanvasMover from '../CanvasHandler/CanvasMover';
import PolygonDrawer from '../CanvasHandler/PolygonDrawer';
import RectDrawer from '../CanvasHandler/RectDrawer';
import styles from './editor.module.css';

export enum EditorMode {
  Idle = 'idle',
  Rect = 'rect',
  Skeleton = 'skeleton',
  Polyline = 'polyline',
  Polygon = 'polygon',
}

interface IEditorProps {
  image: HTMLImageElement | undefined;
  mode: EditorMode;
}

export default function Editor({ image, mode }: IEditorProps) {
  const containerRef = useRef<HTMLElement>(null);

  // canvas dispatcher
  const setCanvasDispatcher = useSetRecoilState(canvasViewDispatcherState);
  const dispatcherRef = useRef<CanvasViewDispatcher>(
    createCanvasViewDispatcher()
  );
  const canvasViewDispatcher = useRecoilValue(canvasViewDispatcherState);

  useEffect(() => {
    setCanvasDispatcher(dispatcherRef.current);
  }, []);

  // zoom event
  const handleWheel = (e: React.WheelEvent) => {
    const direction = e.deltaY > 0 ? -1 : 1;
    const mousePosition: IPoint = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };
    canvasViewDispatcher?.zoomCanvas(direction, mousePosition);
  };

  // canvas fit
  const fitCanvas = () => {
    if (image && containerRef.current) {
      canvasViewDispatcher?.resetCanvas(image, containerRef.current);
    }
  };
  useEffect(() => {
    fitCanvas();
    window.addEventListener('resize', fitCanvas);
    return () => {
      window.removeEventListener('resize', fitCanvas);
    };
  }, [image, containerRef]);

  let canvasHandler;

  switch (mode) {
    case EditorMode.Rect:
      canvasHandler = <RectDrawer frame={image} onWheel={handleWheel} />;
      break;
    case EditorMode.Polygon:
      canvasHandler = <PolygonDrawer frame={image} onWheel={handleWheel} />;
      break;
    default:
      canvasHandler = <CanvasMover frame={image} onWheel={handleWheel} />;
      break;
  }

  return (
    <section className={styles.pageWrap} ref={containerRef}>
      {canvasHandler}
    </section>
  );
}
