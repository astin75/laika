import _ from 'lodash';
import { ICanvasView } from '../recoil/canvas';
import { drawCircle, drawLine, drawText } from './drawUtils';
import { IPoint, transformImagePointToCanvasPoint } from './IPoint';
import {
  getBoundingPointsOfRegion,
  IKeypoint,
  IRegionData,
  RegionDataType,
} from './IRegionData';
export const appendPointToPolygon = (
  region: IRegionData | undefined,
  point: IPoint
): IRegionData => {
  const keypoint: IKeypoint = {
    visible: 2,
    alias: '0',
    x: point.x,
    y: point.y,
  };
  if (region === undefined) {
    return {
      x: point.x,
      y: point.y,
      width: 0,
      height: 0,
      boundingPoints: getBoundingPointsOfRegion(point.x, point.y, 0, 0),
      points: [keypoint],
      area: 0,
      type: RegionDataType.Polygon,
      visible: true,
      highlighted: false,
      selected: false,
    };
  }

  const newRegion: IRegionData = _.cloneDeep(region);
  newRegion.points.push(keypoint);
  const xCoords = region.points.map((point) => point.x);
  const yCoords = region.points.map((point) => point.x);
  newRegion.x = Math.min(...xCoords);
  newRegion.y = Math.min(...yCoords);
  newRegion.width = Math.max(...xCoords) - newRegion.x;
  newRegion.height = Math.max(...yCoords) - newRegion.y;
  newRegion.area = getAreaOfPolygon(region);
  return newRegion;
};

export const getAreaOfPolygon = (region: IRegionData) => {
  let area = 0;
  const { points } = region;
  const numPoints = points.length;
  if (numPoints < 3) return area;

  let j = numPoints - 1;
  for (let i = 0; i < numPoints; i += 1) {
    area += (points[j].x - points[i].x) * (points[j].y + points[i].y);
    j = i;
  }
  return area / 2;
};

export const drawPolygonOnCanvas = (
  region: IRegionData,
  context: CanvasRenderingContext2D,
  view: ICanvasView,
  colorCode: string
) => {
  region.points.forEach((point, idx) => {
    const vertex: IPoint = { x: point.x, y: point.y };
    const nextIdx = idx === region.points.length - 1 ? 0 : idx + 1;
    const nextVertex: IPoint = {
      x: region.points[nextIdx].x,
      y: region.points[nextIdx].y,
    };
    const [p1, p2] = transformImagePointToCanvasPoint(view, vertex, nextVertex);
    drawCircle(p1.x, p1.y, 3, context, colorCode);
    drawLine(p1.x, p1.y, p2.x, p2.y, context, colorCode);
    drawText(p1.x, p1.y - 5, String(idx), context, colorCode);
  });
};
