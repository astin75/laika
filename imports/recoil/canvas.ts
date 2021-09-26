import { IPoint } from '../canvasTools/IPoint';
import { IRect } from '../canvasTools/IRect';
import _ from 'lodash';
import { atom, useRecoilCallback } from 'recoil';
import { clamp } from '../common/utils';

const scaleFactor = 0.1;
const maximumScale = 5;

export interface ICanvasView {
  offset: IPoint;
  scale: number;
  minimumScale: number;
  canvasMargin: number;
  canvasSize: IRect;
  frameSize: IRect;
}

export const canvasView = atom<ICanvasView>({
  key: 'canvasView',
  default: {
    offset: { x: 0, y: 0 },
    scale: 1.0,
    minimumScale: 1.0,
    canvasMargin: 100,
    canvasSize: { width: 1, height: 1 },
    frameSize: { width: 1, height: 1 }
  }
});

export const createCanvasViewDispatcher = () => {
  const resetCanvas = useRecoilCallback<[HTMLImageElement, HTMLElement], void>(
    ({ set }) =>
      (frame: HTMLImageElement, container: HTMLElement) => {
        const height = container.offsetHeight;
        const width = container.offsetWidth;

        set(canvasView, (view) => {
          const updatedView = {
            ...view,
            canvasSize: { width, height },
            frameSize: { width: frame.width, height: frame.height },
            offset: { x: view.offset.x, y: view.offset.y } // Nested object readonly 속성 제거
          };
          updatedView.minimumScale = getMinimumZoomValue(updatedView);
          updatedView.scale = updatedView.minimumScale;
          return fitCanvas(updatedView);
        });
      }
  );

  const zoomCanvas = useRecoilCallback<[number, IPoint | undefined], void>(
    ({ set }) =>
      (direction: number, mousePosition: IPoint | undefined) => {
        set(canvasView, (view) => {
          if (view.scale >= maximumScale && direction > 0) {
            return { ...view, scale: maximumScale };
          }

          const delta = direction * scaleFactor;
          let scale = view.scale + delta;
          scale = clamp(scale, view.minimumScale, maximumScale);
          const updatedView = _.cloneDeep(view);
          updatedView.scale = scale;
          if (mousePosition) {
            const wx = (mousePosition.x - view.offset.x) / view.scale;
            const wy = (mousePosition.y - view.offset.y) / view.scale;
            updatedView.offset.x -= wx * delta;
            updatedView.offset.y -= wy * delta;
          }

          return fitCanvas(updatedView);
        });
      }
  );

  const shiftCanvas = useRecoilCallback<[IPoint], void>(
    ({ set }) =>
      (movement: IPoint) => {
        set(canvasView, (view) => {
          const updatedView = _.cloneDeep(view);
          updatedView.offset.x += movement.x;
          updatedView.offset.y += movement.y;
          return fitCanvas(updatedView);
        });
      }
  );

  const refreshCanvas = useRecoilCallback<[], void>(
    ({ set }) =>
      () => {
        set(canvasView, (view) => view);
      }
  );

  return {
    resetCanvas,
    zoomCanvas,
    shiftCanvas,
    refreshCanvas
  };
};

export type CanvasViewDispatcher = ReturnType<typeof createCanvasViewDispatcher>;

export const canvasViewDispatcherState = atom<CanvasViewDispatcher | undefined>(
  {
    key: 'canvasViewDispatcherState',
    default: undefined
  }
);

const fitCanvas = (view: ICanvasView) => {
  const view1 = adjustCanvasToCenter(view);
  const view2 = limitCanvasOffsetToMargin(view1);
  return view2;
};

const adjustCanvasToCenter = (view: ICanvasView) => {
  const newView = { ...view };
  const imageHeight = view.frameSize.height * view.scale;
  const imageWidth = view.frameSize.width * view.scale;
  const canvasHeight = view.canvasSize.height;
  const canvasWidth = view.canvasSize.width;
  if (canvasWidth > imageWidth) {
    newView.offset.x = (canvasWidth - imageWidth) / 2;
  }
  if (canvasHeight > imageHeight) {
    newView.offset.y = (canvasHeight - imageHeight) / 2;
  }
  return newView;
};

const limitCanvasOffsetToMargin = (view: ICanvasView) => {
  const newView = { ...view };
  const imageHeight = newView.frameSize.height;
  const imageWidth = newView.frameSize.width;
  const canvasHeight = newView.canvasSize.height;
  const canvasWidth = newView.canvasSize.width;

  if (imageWidth * newView.scale > view.canvasSize.width) {
    if (newView.offset.x > newView.canvasMargin) {
      newView.offset.x = newView.canvasMargin;
    }
    const rightMargin =
      canvasWidth - imageWidth * newView.scale - newView.canvasMargin;
    if (newView.offset.x < rightMargin) {
      newView.offset.x = rightMargin;
    }
  }
  if (imageHeight * newView.scale > view.canvasSize.height) {
    if (newView.offset.y > newView.canvasMargin) {
      newView.offset.y = newView.canvasMargin;
    }
    const bottomMargin =
      canvasHeight - imageHeight * newView.scale - newView.canvasMargin;
    if (newView.offset.y < bottomMargin) {
      newView.offset.y = bottomMargin;
    }
  }
  return newView;
};

const getMinimumZoomValue = (view: ICanvasView) => {
  const ratioX =
    view.canvasSize.width / (view.frameSize.width + view.canvasMargin * 2);
  const ratioY =
    view.canvasSize.height / (view.frameSize.height + view.canvasMargin * 2);
  return Math.min(ratioX, ratioY);
};
