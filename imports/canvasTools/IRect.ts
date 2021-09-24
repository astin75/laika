<<<<<<< HEAD
import { clamp, getRandomHexColor } from '../common/utils';
import { ICanvasView } from '../recoil/canvas';
import { drawRect, drawCircle } from './drawUtils';
=======
import { clamp } from '../common/utils'
import { ICanvasView } from '../recoil/canvas'
import { drawCircle, drawRect } from './drawUtils'
>>>>>>> f538cdebeaf550ed4d060ef8e0bed913c0030f7d
import {
  IPoint,
  transformCanvasPointToImagePoint,
  transformImagePointToCanvasPoint,
<<<<<<< HEAD
} from './IPoint';
=======
} from './IPoint'
>>>>>>> f538cdebeaf550ed4d060ef8e0bed913c0030f7d
import {
  getAreaOfRegion,
  getBoundingPointsOfRegion,
  IRegionData,
  RegionDataType,
<<<<<<< HEAD
} from './IRegionData';

// TODO: IRect is not used anymore
export interface IRect {
  width: number;
  height: number;
=======
} from './IRegionData'

// TODO: IRect is not used anymore
export interface IRect {
  width: number
  height: number
>>>>>>> f538cdebeaf550ed4d060ef8e0bed913c0030f7d
}

export const drawRectOnCanvas = (
  region: IRegionData,
  context: CanvasRenderingContext2D,
  view: ICanvasView,
  colorCode: string
) => {
<<<<<<< HEAD
  const [topLeft] = transformImagePointToCanvasPoint(
    view,
    region.boundingPoints[0]
  );
  const width = region.width * view.scale;
  const height = region.height * view.scale;

  let fillAlpha = 1;
  if (region.highlighted) fillAlpha = 0.1;
  if (region.selected) fillAlpha = 0.3;
=======
  const [topLeft] = transformImagePointToCanvasPoint(view, region.boundingPoints[0])
  const width = region.width * view.scale
  const height = region.height * view.scale

  let fillAlpha = 1
  if (region.highlighted) fillAlpha = 0.1
  if (region.selected) fillAlpha = 0.3
>>>>>>> f538cdebeaf550ed4d060ef8e0bed913c0030f7d

  drawRect(
    topLeft.x,
    topLeft.y,
    width,
    height,
    context,
    colorCode,
    fillAlpha,
    region.highlighted || region.selected
<<<<<<< HEAD
  );

  if (region.highlightedVertex !== undefined) {
    const vertex = region.boundingPoints[region.highlightedVertex.idx];
    const [transformedVetex] = transformImagePointToCanvasPoint(view, vertex);
    drawCircle(transformedVetex.x, transformedVetex.y, 5, context, colorCode);
  }
};

export const makeRectRegion = (pointA: IPoint, pointB: IPoint): IRegionData => {
  const minX = Math.min(pointA.x, pointB.x);
  const maxX = Math.max(pointA.x, pointB.x);
  const minY = Math.min(pointA.y, pointB.y);
  const maxY = Math.max(pointA.y, pointB.y);
  const topLeft: IPoint = { x: minX, y: minY };
  const botRight: IPoint = { x: maxX, y: maxY };
  const width = botRight.x - topLeft.x;
  const height = botRight.y - topLeft.y;
=======
  )

  if (region.highlightedVertex !== undefined) {
    const vertex = region.boundingPoints[region.highlightedVertex.idx]
    const [transformedVetex] = transformImagePointToCanvasPoint(view, vertex)
    drawCircle(transformedVetex.x, transformedVetex.y, 5, context, colorCode)
  }
}

export const makeRectRegion = (pointA: IPoint, pointB: IPoint): IRegionData => {
  const minX = Math.min(pointA.x, pointB.x)
  const maxX = Math.max(pointA.x, pointB.x)
  const minY = Math.min(pointA.y, pointB.y)
  const maxY = Math.max(pointA.y, pointB.y)
  const topLeft: IPoint = { x: minX, y: minY }
  const botRight: IPoint = { x: maxX, y: maxY }
  const width = botRight.x - topLeft.x
  const height = botRight.y - topLeft.y
>>>>>>> f538cdebeaf550ed4d060ef8e0bed913c0030f7d

  const region: IRegionData = {
    x: topLeft.x,
    y: topLeft.y,
    width,
    height,
<<<<<<< HEAD
    boundingPoints: getBoundingPointsOfRegion(
      topLeft.x,
      topLeft.y,
      width,
      height
    ),
=======
    boundingPoints: getBoundingPointsOfRegion(topLeft.x, topLeft.y, width, height),
>>>>>>> f538cdebeaf550ed4d060ef8e0bed913c0030f7d
    area: 0,
    type: RegionDataType.Rect,
    visible: true,
    highlighted: false,
    selected: false,
<<<<<<< HEAD
  };
  region.area = getAreaOfRegion(region);

  return region;
};
=======
  }
  region.area = getAreaOfRegion(region)

  return region
}
>>>>>>> f538cdebeaf550ed4d060ef8e0bed913c0030f7d

export const updateRectRegion = (
  region: IRegionData,
  pointA: IPoint,
  pointB: IPoint
): IRegionData => {
<<<<<<< HEAD
  const minX = Math.min(pointA.x, pointB.x);
  const maxX = Math.max(pointA.x, pointB.x);
  const minY = Math.min(pointA.y, pointB.y);
  const maxY = Math.max(pointA.y, pointB.y);
  const topLeft: IPoint = { x: minX, y: minY };
  const botRight: IPoint = { x: maxX, y: maxY };
  const width = botRight.x - topLeft.x;
  const height = botRight.y - topLeft.y;

  const updatedRegion = { ...region };
  updatedRegion.boundingPoints = getBoundingPointsOfRegion(
    topLeft.x,
    topLeft.y,
    width,
    height
  );
  updatedRegion.x = topLeft.x;
  updatedRegion.y = topLeft.y;
  updatedRegion.width = width;
  updatedRegion.height = height;
  updatedRegion.area = getAreaOfRegion(updatedRegion);

  return updatedRegion;
};
=======
  const minX = Math.min(pointA.x, pointB.x)
  const maxX = Math.max(pointA.x, pointB.x)
  const minY = Math.min(pointA.y, pointB.y)
  const maxY = Math.max(pointA.y, pointB.y)
  const topLeft: IPoint = { x: minX, y: minY }
  const botRight: IPoint = { x: maxX, y: maxY }
  const width = botRight.x - topLeft.x
  const height = botRight.y - topLeft.y

  const updatedRegion = { ...region }
  updatedRegion.boundingPoints = getBoundingPointsOfRegion(topLeft.x, topLeft.y, width, height)
  updatedRegion.x = topLeft.x
  updatedRegion.y = topLeft.y
  updatedRegion.width = width
  updatedRegion.height = height
  updatedRegion.area = getAreaOfRegion(updatedRegion)

  return updatedRegion
}
>>>>>>> f538cdebeaf550ed4d060ef8e0bed913c0030f7d

export const moveBoundingPointOfRect = (
  region: IRegionData,
  pointIdx: number,
  mousePosition: IPoint,
  view: ICanvasView
) => {
<<<<<<< HEAD
  const [transformed] = transformCanvasPointToImagePoint(view, mousePosition);

  let [topLeft, bottomRight] = getTlBrPointOfRect(region);
  switch (pointIdx) {
    case 0:
      topLeft = transformed;
      topLeft.x = clamp(topLeft.x, 0, bottomRight.x - 1);
      topLeft.y = clamp(topLeft.y, 0, bottomRight.y - 1);
      break;
    case 1:
      topLeft.y = transformed.y;
      topLeft.y = clamp(topLeft.y, 0, bottomRight.y - 1);
      break;
    case 2:
      bottomRight.x = transformed.x;
      topLeft.y = transformed.y;
      bottomRight.x = clamp(
        bottomRight.x,
        topLeft.x + 1,
        view.frameSize.width - 1
      );
      topLeft.y = clamp(topLeft.y, 0, bottomRight.y - 1);
      break;
    case 3:
      bottomRight.x = transformed.x;
      bottomRight.x = clamp(
        bottomRight.x,
        topLeft.x + 1,
        view.frameSize.width - 1
      );
      break;
    case 4:
      bottomRight = transformed;
      bottomRight.x = clamp(
        bottomRight.x,
        topLeft.x + 1,
        view.frameSize.width - 1
      );
      bottomRight.y = clamp(
        bottomRight.y,
        topLeft.y + 1,
        view.frameSize.height - 1
      );
      break;
    case 5:
      bottomRight.y = transformed.y;
      bottomRight.y = clamp(
        bottomRight.y,
        topLeft.y + 1,
        view.frameSize.height - 1
      );
      break;
    case 6:
      topLeft.x = transformed.x;
      bottomRight.y = transformed.y;
      topLeft.x = clamp(topLeft.x, 0, bottomRight.x - 1);
      bottomRight.y = clamp(
        bottomRight.y,
        topLeft.y + 1,
        view.frameSize.height - 1
      );
      break;
    case 7:
      topLeft.x = transformed.x;
      topLeft.x = clamp(topLeft.x, 0, bottomRight.x - 1);
      break;
    default:
      break;
  }

  const updatedRegion = updateRectRegion(region, topLeft, bottomRight);

  // points fit
  if (region.points) {
    const prevWidth = region.width;
    const prevHeight = region.height;
    const newWidth = updatedRegion.width;
    const newHeight = updatedRegion.height;
=======
  const [transformed] = transformCanvasPointToImagePoint(view, mousePosition)

  let [topLeft, bottomRight] = getTlBrPointOfRect(region)
  switch (pointIdx) {
    case 0:
      topLeft = transformed
      topLeft.x = clamp(topLeft.x, 0, bottomRight.x - 1)
      topLeft.y = clamp(topLeft.y, 0, bottomRight.y - 1)
      break
    case 1:
      topLeft.y = transformed.y
      topLeft.y = clamp(topLeft.y, 0, bottomRight.y - 1)
      break
    case 2:
      bottomRight.x = transformed.x
      topLeft.y = transformed.y
      bottomRight.x = clamp(bottomRight.x, topLeft.x + 1, view.frameSize.width - 1)
      topLeft.y = clamp(topLeft.y, 0, bottomRight.y - 1)
      break
    case 3:
      bottomRight.x = transformed.x
      bottomRight.x = clamp(bottomRight.x, topLeft.x + 1, view.frameSize.width - 1)
      break
    case 4:
      bottomRight = transformed
      bottomRight.x = clamp(bottomRight.x, topLeft.x + 1, view.frameSize.width - 1)
      bottomRight.y = clamp(bottomRight.y, topLeft.y + 1, view.frameSize.height - 1)
      break
    case 5:
      bottomRight.y = transformed.y
      bottomRight.y = clamp(bottomRight.y, topLeft.y + 1, view.frameSize.height - 1)
      break
    case 6:
      topLeft.x = transformed.x
      bottomRight.y = transformed.y
      topLeft.x = clamp(topLeft.x, 0, bottomRight.x - 1)
      bottomRight.y = clamp(bottomRight.y, topLeft.y + 1, view.frameSize.height - 1)
      break
    case 7:
      topLeft.x = transformed.x
      topLeft.x = clamp(topLeft.x, 0, bottomRight.x - 1)
      break
    default:
      break
  }

  const updatedRegion = updateRectRegion(region, topLeft, bottomRight)

  // points fit
  if (region.points) {
    const prevWidth = region.width
    const prevHeight = region.height
    const newWidth = updatedRegion.width
    const newHeight = updatedRegion.height
>>>>>>> f538cdebeaf550ed4d060ef8e0bed913c0030f7d
    updatedRegion.points = region.points.map((pt) => {
      return {
        x: ((pt.x - region.x) / prevWidth) * newWidth + updatedRegion.x,
        y: ((pt.y - region.y) / prevHeight) * newHeight + updatedRegion.y,
        alias: pt.alias,
        visible: pt.visible,
<<<<<<< HEAD
      };
    });
  }

  return updatedRegion;
};
=======
      }
    })
  }

  return updatedRegion
}
>>>>>>> f538cdebeaf550ed4d060ef8e0bed913c0030f7d

export const getTlBrPointOfRect = (region: IRegionData) => {
  return [
    { x: region.x, y: region.y },
    { x: region.x + region.width, y: region.y + region.height },
<<<<<<< HEAD
  ];
};
=======
  ]
}
>>>>>>> f538cdebeaf550ed4d060ef8e0bed913c0030f7d

export const isPointInRect = (
  point: IPoint,
  region: IRegionData,
  view: ICanvasView,
  margin = 5
) => {
<<<<<<< HEAD
  const [transformedPosition] = transformCanvasPointToImagePoint(view, point);
  const xIn =
    region.x - margin < transformedPosition.x &&
    transformedPosition.x < region.x + region.width + margin;
  const yIn =
    region.y - margin < transformedPosition.y &&
    transformedPosition.y < region.y + region.height + margin;
  return xIn && yIn;
};
=======
  const [transformedPosition] = transformCanvasPointToImagePoint(view, point)
  const xIn =
    region.x - margin < transformedPosition.x &&
    transformedPosition.x < region.x + region.width + margin
  const yIn =
    region.y - margin < transformedPosition.y &&
    transformedPosition.y < region.y + region.height + margin
  return xIn && yIn
}
>>>>>>> f538cdebeaf550ed4d060ef8e0bed913c0030f7d
