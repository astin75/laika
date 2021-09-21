import { clamp } from '../common/utils';
import { ICanvasView } from '../recoil/canvas';

export interface IPoint {
  x: number;
  y: number;
}

export const getNormOfPoint = (point: IPoint): number => {
  return Math.sqrt(point.x ** 2 + point.y ** 2);
};

export const getDistanceOfTwoPoints = (
  pointA: IPoint,
  pointB: IPoint,
): number => {
  const offset: IPoint = { x: pointA.x - pointB.x, y: pointA.y - pointB.y };
  return getNormOfPoint(offset);
};

export const transformCanvasPointToImagePoint = (
  view: ICanvasView,
  ...points: IPoint[]
) => {
  return points.map((point) => {
    const transformed: IPoint = {
      x: (point.x - view.offset.x) / view.scale,
      y: (point.y - view.offset.y) / view.scale,
    };
    transformed.x = clamp(transformed.x, 0, view.frameSize.width - 1);
    transformed.y = clamp(transformed.y, 0, view.frameSize.height - 1);
    return transformed;
  });
};

export const transformImagePointToCanvasPoint = (
  view: ICanvasView,
  ...points: IPoint[]
) => {
  return points.map((point) => {
    const transformed: IPoint = {
      x: point.x * view.scale + view.offset.x,
      y: point.y * view.scale + view.offset.y,
    };
    return transformed;
  });
};
