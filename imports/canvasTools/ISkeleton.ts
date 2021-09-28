import { ICanvasView } from '../recoil/canvas';
import { drawText, drawCircle, drawLine, drawPath } from './drawUtils';
import { getComplementaryColor } from '../common/utils';
import _ from 'lodash';
import { IPoint, transformCanvasPointToImagePoint, transformImagePointToCanvasPoint } from './IPoint';
import { drawRectOnCanvas } from './IRect';
import {
  getAreaOfRegion, getBoundingPointsOfRegion,
  IKeypoint,
  IRegionData,
  RegionDataType
} from './IRegionData';
import { drawWidth } from '../ui/pages/labelPage/Canvas';

export const keypointColors: string[] = [
  '#e6194b', '#3cb44b', '#ffe119', '#4363d8',
  '#f58231', '#911eb4', '#46f0f0', '#f032e6',
  '#bcf60c', '#fabebe', '#008080', '#e6beff',
  '#9a6324', '#fffac8', '#800000', '#aaffc3',
  '#808000', '#ffd8b1', '#000075', '#808080'
];

export const appendKeypoint = (
  region: IRegionData | undefined,
  point: IPoint,
  pointIdx: number,
  projectInfo: any
): IRegionData => {
  const keypoint: IKeypoint = {
    visible: 2,
    alias: projectInfo.keypoint[pointIdx],
    x: point.x,
    y: point.y
  };
  if (region === undefined) {
    const defaultPoints: IKeypoint[] = projectInfo.keypoint.map((name) => {
      return {
        visible: 0,
        alias: name,
        x: 0,
        y: 0
      };
    });
    defaultPoints[pointIdx] = keypoint;
    return {
      x: point.x,
      y: point.y,
      width: 0,
      height: 0,
      boundingPoints: getBoundingPointsOfRegion(point.x, point.y, 0, 0),
      points: defaultPoints,
      area: 0,
      type: RegionDataType.Skeleton,
      visible: true,
      highlighted: false,
      selected: false
    };
  }

  const newRegion: IRegionData = _.cloneDeep(region);
  newRegion.points[pointIdx] = keypoint;
  const xCoords = region.points.map((point) => point.x);
  const yCoords = region.points.map((point) => point.x);
  newRegion.x = Math.min(...xCoords);
  newRegion.y = Math.min(...yCoords);
  newRegion.width = Math.max(...xCoords) - newRegion.x;
  newRegion.height = Math.max(...yCoords) - newRegion.y;
  newRegion.area = getAreaOfRegion(region);
  return newRegion;
};

export const restoreKeypointFromData = (
    points: number[][],
    projectInfo: any
  ): IRegionData => {
    const defaultPoints: IKeypoint[] = projectInfo.keypoint.map((name) => {
      return {
        visible: 0,
        alias: name,
        x: 0,
        y: 0
      };
    });
    const newRegion: IRegionData = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      boundingPoints: getBoundingPointsOfRegion(0, 0, 0, 0),
      points: defaultPoints,
      area: 0,
      type: RegionDataType.Skeleton,
      visible: true,
      highlighted: false,
      selected: false
    };
    points.map((pt, idx) => {
      newRegion.points[idx] = { ...newRegion.points[idx], x: pt[0], y: pt[1], visible: pt[2] };
    });

    const xCoords = newRegion.points.map((point) => point.x);
    const yCoords = newRegion.points.map((point) => point.y);
    newRegion.x = Math.min(...xCoords);
    newRegion.y = Math.min(...yCoords);
    newRegion.width = Math.max(...xCoords) - newRegion.x;
    newRegion.height = Math.max(...yCoords) - newRegion.y;
    newRegion.area = getAreaOfRegion(newRegion);
    newRegion.boundingPoints = getBoundingPointsOfRegion(newRegion.x, newRegion.y, newRegion.width, newRegion.height);
    return newRegion;
  }
;

export const drawSkeletonOnCanvas = (
  region: IRegionData,
  context: CanvasRenderingContext2D,
  view: ICanvasView,
  colorCode: string
) => {
  // Bounding Rect Draw
  drawRectOnCanvas(region, context, view, colorCode);

  // Bounding Point
  if (region.highlightedVertex?.type === 'boundingPoint') {
    const drawPoints = transformImagePointToCanvasPoint(
      view,
      ...region.boundingPoints
    );
    drawPoints.forEach((point, idx) => {
      if (idx === region.highlightedVertex?.idx) {
        drawCircle(
          point.x,
          point.y,
          8,
          context,
          getComplementaryColor(colorCode)
        );
      } else {
        drawCircle(point.x, point.y, 6, context, colorCode);
      }
    });
  }

  // connection lines
  const drawKeyPoints = transformImagePointToCanvasPoint(
    view,
    ...region.points!
  );
  region.connections!.forEach((conn) => {
    if (region.points![conn[0]].visible && region.points![conn[1]].visible) {
      const from = drawKeyPoints[conn[0]];
      const to = drawKeyPoints[conn[1]];
      drawLine(from.x, from.y, to.x, to.y, context, colorCode);
    }
  });

  // keypoints
  drawKeyPoints.forEach((kpt, idx) => {
    const visibility = region.points![idx].visible;
    if (visibility === 0) return;

    if (
      idx === region.highlightedVertex?.idx &&
      region.highlightedVertex.type === 'point' &&
      visibility === 2
    ) {
      drawCircle(kpt.x, kpt.y, 8, context, getComplementaryColor(colorCode));
      if (region.showAlias)
        drawText(
          kpt.x + 5,
          kpt.y - 5,
          region.points![idx].alias,
          context,
          getComplementaryColor(colorCode)
        );
    } else if (
      idx === region.highlightedVertex?.idx &&
      region.highlightedVertex.type === 'point' &&
      visibility === 1
    ) {
      drawCircle(kpt.x, kpt.y, 8, context, colorCode);
      if (region.showAlias)
        drawText(
          kpt.x + 5,
          kpt.y - 5,
          region.points![idx].alias,
          context,
          colorCode
        );
    } else if (visibility === 2) {
      drawCircle(kpt.x, kpt.y, 6, context, colorCode);
      if (region.showAlias)
        drawText(
          kpt.x + 5,
          kpt.y - 5,
          region.points![idx].alias,
          context,
          colorCode
        );
    } else {
      drawCircle(kpt.x, kpt.y, 6, context, getComplementaryColor(colorCode));
      if (region.showAlias)
        drawText(
          kpt.x + 5,
          kpt.y - 5,
          region.points![idx].alias,
          context,
          getComplementaryColor(colorCode)
        );
    }
  });
};

// export const makeSkeletonRegion = (
//   pointA: IPoint,
//   pointB: IPoint,
//   points?: IKeypoint[],
// ): IRegionData => {
//   const minX = Math.min(pointA.x, pointB.x);
//   const maxX = Math.max(pointA.x, pointB.x);
//   const minY = Math.min(pointA.y, pointB.y);
//   const maxY = Math.max(pointA.y, pointB.y);
//   const topLeft: IPoint = { x: minX, y: minY };
//   const botRight: IPoint = { x: maxX, y: maxY };
//   const width = botRight.x - topLeft.x;
//   const height = botRight.y - topLeft.y;
//
//   const region = {
//     x: topLeft.x,
//     y: topLeft.y,
//     width,
//     height,
//     boundingPoints: [
//       topLeft,
//       { x: topLeft.x + width / 2, y: topLeft.y },
//       { x: botRight.x, y: topLeft.y },
//       { x: botRight.x, y: topLeft.y + height / 2 },
//       botRight,
//       { x: topLeft.x + width / 2, y: botRight.y },
//       { x: topLeft.x, y: botRight.y },
//       { x: topLeft.x, y: topLeft.y + height / 2 },
//     ],
//     area: 0,
//     type: RegionDataType.Skeleton,
//     visible: true,
//     highlighted: false,
//     selected: false,
//     points:
//       points ??
//       serverApis.skeleonData?.keypoints.map(
//         (kpt): IKeypoint => ({
//           x: kpt.location[0] * width + topLeft.x,
//           y: kpt.location[1] * height + topLeft.y,
//           visible: 2,
//           alias: kpt.alias,
//         }),
//       ),
//     connections: serverApis.skeleonData?.skeleton,
//     showAlias: true,
//   };
//   region.area = getAreaOfRegion(region);
//
//   return region;
// };

export const drawKeypointOnCanvas = (
  region: IRegionData,
  context: CanvasRenderingContext2D,
  view: ICanvasView,
  colorCode: string
) => {
  if (!region.visible)
    return;
  const highlightVertex = region.highlightedVertex;
  let drawColor = colorCode;
  region.points.forEach((point, idx) => {
    if (point.visible === 0)
      return;
      // if (point.visible === 1)
    //   drawColor = getComplementaryColor(colorCode);
    else
      drawColor = keypointColors[idx];
    const vertex: IPoint = { x: point.x, y: point.y };
    const nextIdx = idx === region.points.length - 1 ? 0 : idx + 1;
    const nextVertex: IPoint = {
      x: region.points[nextIdx].x,
      y: region.points[nextIdx].y
    };
    const [p1] = transformImagePointToCanvasPoint(view, vertex);
    drawCircle(p1.x, p1.y, 3 * drawWidth, context, drawColor);
    if (highlightVertex && highlightVertex.idx === idx) {
      drawCircle(p1.x, p1.y, 6 * drawWidth, context, drawColor);
    }
    drawText(p1.x, p1.y - 10, point.alias, context, drawColor);
  });
};

export const moveKeypointVertex = (
  region: IRegionData,
  pointIdx: number,
  point: IPoint,
  view: ICanvasView
): IRegionData => {
  const newRegion: IRegionData = _.cloneDeep(region);
  const [transformed] = transformCanvasPointToImagePoint(view, point);
  newRegion.points[pointIdx] = {
    ...newRegion.points[pointIdx],
    x: transformed.x,
    y: transformed.y
  };
  const xCoords = newRegion.points.map((point) => point.x);
  const yCoords = newRegion.points.map((point) => point.y);
  newRegion.x = Math.min(...xCoords);
  newRegion.y = Math.min(...yCoords);
  newRegion.width = Math.max(...xCoords) - newRegion.x;
  newRegion.height = Math.max(...yCoords) - newRegion.y;
  newRegion.area = getAreaOfRegion(region);
  return newRegion;
};