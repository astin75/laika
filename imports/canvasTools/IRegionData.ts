import { clamp } from '../common/utils';
import { ICanvasView } from '../recoil/canvas';
import {
  getDistanceOfTwoPoints,
  IPoint,
  transformCanvasPointToImagePoint
} from './IPoint';
import {
  drawRectOnCanvas,
  getTlBrPointOfRect,
  makeRectRegion,
  updateRectRegion
} from './IRect';
import { drawSkeletonOnCanvas } from './ISkeleton';
import { IAnnotation } from '../recoil/annotation';

export enum RegionDataType {
  Point = 'point',
  Rect = 'rect',
  Polyline = 'polyline',
  Polygon = 'polygon',
  Skeleton = 'skeleton',
}

export interface IVertexInfo {
  type: 'point' | 'boundingPoint';
  idx: number;
}

export interface IKeypoint extends IPoint {
  visible: number;
  alias: string;
}

export interface IRegionData {
  x: number;
  y: number;
  width: number;
  height: number;
  boundingPoints: IPoint[]; // points for bounding box, [tl, top, tr, right, br, bot, bl, left]
  type: RegionDataType;
  visible: boolean;
  highlighted: boolean;
  selected: boolean;
  area: number;
  highlightedVertex?: IVertexInfo;
  points?: IKeypoint[]; // points for keypoint, polygon, polyline, skeleton
  showAlias?: boolean;
  connections?: number[][]; // for skeleton connection info
}

export const drawRegionOnCanvas = (
  region: IRegionData,
  context: CanvasRenderingContext2D,
  view: ICanvasView,
  colorCode: string
) => {
  switch (region.type) {
    case RegionDataType.Rect:
      drawRectOnCanvas(region, context, view, colorCode);
      break;
    case RegionDataType.Skeleton:
      drawSkeletonOnCanvas(region, context, view, colorCode);
      break;
    default:
      break;
  }
};

export const isPointInRegion = (
  point: IPoint,
  region: IRegionData,
  margin = 5
) => {
  const xIn =
    region.x - margin < point.x && point.x < region.x + region.width + margin;
  const yIn =
    region.y - margin < point.y && point.y < region.y + region.height + margin;
  return xIn && yIn;
};

export const findNearestRectRegion = (
  mousePosition: IPoint,
  annotations: IAnnotation[],
  view: ICanvasView,
  margin = 5
) => {
  const [transformedPosition] = transformCanvasPointToImagePoint(
    view,
    mousePosition
  );
  const inRegionMask = annotations.map(
    (annot) => {
      const region = annot.regions.rect;
      return region && region.visible && isPointInRegion(transformedPosition, region, margin);
    }
  );

  let minArea = Infinity;
  let nearestAnnotationIdx: number | undefined;
  inRegionMask.forEach((isIn, idx) => {
    if (!isIn) return;
    const region = annotations[idx].regions.rect;
    if (region.area < minArea) {
      minArea = region.area;
      nearestAnnotationIdx = idx;
    }
  });

  return nearestAnnotationIdx;
};

// export const findNearestPoint = (
//   mousePosition: IPoint,
//   regions: IRegionData[],
//   view: ICanvasView,
//   margin = 5,
// ) => {
//   const [transformedPosition] = transformCanvasPointToImagePoint(
//     view,
//     mousePosition,
//   );
//
//   let minDistance = margin;
//   let nearestAnnotationIdx: number | undefined;
//   let nearestPointIdx: number | undefined;
//   regions.forEach((region, annotIdx) => {
//     region.points?.forEach((point, pointIdx) => {
//       if (!point.visible) return;
//       const distance = getDistanceOfTwoPoints(point, transformedPosition);
//       if (distance < minDistance) {
//         minDistance = distance;
//         nearestAnnotationIdx = annotIdx;
//         nearestPointIdx = pointIdx;
//       }
//     });
//   });
//
//   return { nearestAnnotationIdx, nearestPointIdx };
// };

export const findNearestPoint = (
  mousePosition: IPoint,
  region: IRegionData,
  view: ICanvasView,
  margin = 5
) => {
  const [transformedPosition] = transformCanvasPointToImagePoint(
    view,
    mousePosition
  );

  let minDistance = margin;
  let nearestPointIdx: number | undefined;
  region.points?.forEach((point, pointIdx) => {
    if (!point.visible) return;
    const distance = getDistanceOfTwoPoints(point, transformedPosition);
    if (distance < minDistance) {
      minDistance = distance;
      nearestPointIdx = pointIdx;
    }
  });

  return nearestPointIdx;
};

export const findNearestKeyPoint = (
  mousePosition: IPoint,
  region: IRegionData,
  view: ICanvasView,
  margin = 5
) => {
  const [transformedPosition] = transformCanvasPointToImagePoint(
    view,
    mousePosition
  );

  let minDistance = margin;
  let nearestPointIdx: number | undefined;
  region.points?.forEach((point, pointIdx) => {
    if (!point.visible) return;
    const distance = getDistanceOfTwoPoints(point, transformedPosition);
    if (distance < minDistance) {
      minDistance = distance;
      nearestPointIdx = pointIdx;
    }
  });

  return nearestPointIdx;
};

export const findNearestBoundingPoint = (
  mousePosition: IPoint,
  region: IRegionData,
  view: ICanvasView,
  margin = 5
) => {
  const [transformedPosition] = transformCanvasPointToImagePoint(
    view,
    mousePosition
  );

  let minDistance = margin;
  let nearestPointIdx: number | undefined;
  region.boundingPoints.forEach((point, pointIdx) => {
    const distance = getDistanceOfTwoPoints(point, transformedPosition);
    if (distance < minDistance) {
      minDistance = distance;
      nearestPointIdx = pointIdx;
    }
  });

  return nearestPointIdx;
};

export const getAreaOfRegion = (region: IRegionData) => {
  let area = 0;
  const { boundingPoints: points } = region;
  const numPoints = points.length;
  if (numPoints < 3) return area;

  let j = numPoints - 1;
  for (let i = 0; i < numPoints; i += 1) {
    area += points[i].x * points[j].y - points[j].x * points[i].y;
    j = i;
  }
  return Math.abs(area) / 2;
};

export const getBoundingPointsOfRegion = (
  x: number,
  y: number,
  width: number,
  height: number
): IPoint[] => {
  return [
    { x, y },
    { x: x + width / 2, y },
    { x: x + width, y },
    { x: x + width, y: y + height / 2 },
    { x: x + width, y: y + height },
    { x: x + width / 2, y: y + height },
    { x, y: y + height },
    { x, y: y + height / 2 }
  ];
};

export const moveRegion = (
  region: IRegionData,
  mouseOffset: IPoint,
  view: ICanvasView
) => {
  const transformed: IPoint = {
    x: mouseOffset.x / view.scale,
    y: mouseOffset.y / view.scale
  };
  const updatedRegion = { ...region };
  updatedRegion.x += transformed.x;
  updatedRegion.y += transformed.y;
  updatedRegion.x = Math.max(updatedRegion.x, 0);
  updatedRegion.y = Math.max(updatedRegion.y, 0);
  if (updatedRegion.x + updatedRegion.width >= view.frameSize.width - 1)
    updatedRegion.x = view.frameSize.width - updatedRegion.width - 1;
  if (updatedRegion.y + updatedRegion.height >= view.frameSize.height - 1)
    updatedRegion.y = view.frameSize.height - updatedRegion.height - 1;
  const offset: IPoint = {
    x: updatedRegion.x - region.x,
    y: updatedRegion.y - region.y
  };
  updatedRegion.boundingPoints = region.boundingPoints.map((point) => ({
    x: point.x + offset.x,
    y: point.y + offset.y
  }));
  updatedRegion.points = region.points?.map((point) => ({
    x: point.x + offset.x,
    y: point.y + offset.y,
    visible: point.visible,
    alias: point.alias
  }));

  return updatedRegion;
};

// export const makeRegionFromData = (data: IAnnotationJSON): IRegionData => {
//   const pointA: IPoint = { x: data.bbox[0], y: data.bbox[1] };
//   const pointB: IPoint = {
//     x: data.bbox[0] + data.bbox[2],
//     y: data.bbox[1] + data.bbox[3],
//   };
//   if (data.keypoints.length > 0) {
//     const keypoints: IKeypoint[] = data.keypoints.map((pt) => ({
//       x: pt.location[0],
//       y: pt.location[1],
//       visible: pt.visible,
//       alias: pt.alias,
//     }));
//     return makeSkeletonRegion(pointA, pointB, keypoints);
//   }
//   if (data.segmentation.length > 0) {
//     // TODO: Polygon data
//     return makeRectRegion({ x: 0, y: 0 }, { x: 0, y: 0 });
//   }
//   // Bounding box
//
//   return makeRectRegion(pointA, pointB);
// };

export const movePointOfRegion = (
  region: IRegionData,
  pointIdx: number,
  mousePosition: IPoint,
  view: ICanvasView
) => {
  if (region.points === undefined) return region;
  const [transformed] = transformCanvasPointToImagePoint(view, mousePosition);
  transformed.x = clamp(transformed.x, 0, view.frameSize.width - 1);
  transformed.y = clamp(transformed.y, 0, view.frameSize.height - 1);

  const updatedRegion = { ...region };
  updatedRegion.points![pointIdx] = {
    x: transformed.x,
    y: transformed.y,
    visible: 2,
    alias: updatedRegion.points![pointIdx].alias
  };
  const [topLeft, bottomRight] = getTlBrPointOfRect(region);
  if (transformed.x < topLeft.x) topLeft.x = transformed.x;
  if (transformed.y < topLeft.y) topLeft.y = transformed.y;
  if (bottomRight.x < transformed.x) bottomRight.x = transformed.x;
  if (bottomRight.y < transformed.y) bottomRight.y = transformed.y;
  return updateRectRegion(updatedRegion, topLeft, bottomRight);
};
