import { ICanvasView } from '../recoil/canvas';
import { drawText, drawCircle, drawLine } from './drawUtils';
import { getComplementaryColor } from '../common/utils';

import { IPoint, transformImagePointToCanvasPoint } from './IPoint';
import { drawRectOnCanvas } from './IRect';
import {
  getAreaOfRegion,
  IKeypoint,
  IRegionData,
  RegionDataType,
} from './IRegionData';

export const drawSkeletonOnCanvas = (
  region: IRegionData,
  context: CanvasRenderingContext2D,
  view: ICanvasView,
  colorCode: string,
) => {
  // Bounding Rect Draw
  drawRectOnCanvas(region, context, view, colorCode);

  // Bounding Point
  if (region.highlightedVertex?.type === 'boundingPoint') {
    const drawPoints = transformImagePointToCanvasPoint(
      view,
      ...region.boundingPoints,
    );
    drawPoints.forEach((point, idx) => {
      if (idx === region.highlightedVertex?.idx) {
        drawCircle(
          point.x,
          point.y,
          8,
          context,
          getComplementaryColor(colorCode),
        );
      } else {
        drawCircle(point.x, point.y, 6, context, colorCode);
      }
    });
  }

  // connection lines
  const drawKeyPoints = transformImagePointToCanvasPoint(
    view,
    ...region.points!,
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
          getComplementaryColor(colorCode),
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
          colorCode,
        );
    } else if (visibility === 2) {
      drawCircle(kpt.x, kpt.y, 6, context, colorCode);
      if (region.showAlias)
        drawText(
          kpt.x + 5,
          kpt.y - 5,
          region.points![idx].alias,
          context,
          colorCode,
        );
    } else {
      drawCircle(kpt.x, kpt.y, 6, context, getComplementaryColor(colorCode));
      if (region.showAlias)
        drawText(
          kpt.x + 5,
          kpt.y - 5,
          region.points![idx].alias,
          context,
          getComplementaryColor(colorCode),
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
