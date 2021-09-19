// @ts-ignore
import React, {useEffect, useRef} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
  CanvasViewDispatcher,
  canvasViewDispatcherState,
  createCanvasViewDispatcher,
} from '../../../../../recoil/canvas';
import styles from './editor.module.css';
import {IPoint} from '../../../../../canvasTools/IPoint';
import RectDrawer from '../CanvasHandler/RectDrawer';

interface IEditorProps {
  image: HTMLImageElement | undefined;
}

export enum EditorModes{
  Box = 'box',
  Polygon = 'polygon',
  Skeleton = 'skeleton'
}

export default function Editor({image}: IEditorProps) {
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
  let editorMode = 'drawRect';
  switch (editorMode) {
    case 'drawRect':
      canvasHandler = <RectDrawer frame={image} onWheel={handleWheel}/>;
      break;
    default:
      // canvasHandler = <CanvasSelector frame={image} onWheel={handleWheel} />;
      break;
  }

  return (
    <section className={styles.pageWrap} ref={containerRef}>
      {canvasHandler}
    </section>
  );
}
