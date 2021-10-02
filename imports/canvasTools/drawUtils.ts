import { ICanvasView } from '../recoil/canvas';
import { IPoint, transformImagePointToCanvasPoint } from './IPoint';
import { IKeypoint } from './IRegionData';

export const drawRect = (
  x: number,
  y: number,
  width: number,
  height: number,
  context: CanvasRenderingContext2D,
  colorCode: string,
  fillAlpha = 0,
  fill = false
) => {
  context.save();
  context.strokeStyle = colorCode;
  context.fillStyle = colorCode;
  if (fill) {
    context.save();
    context.globalAlpha = fillAlpha;
    context.fillRect(x, y, width, height);
    context.restore();
  }
  context.strokeRect(x, y, width, height);
  context.restore();
};

export const drawCircle = (
  x: number,
  y: number,
  radius: number,
  context: CanvasRenderingContext2D,
  colorCode: string
) => {
  context.save();
  context.beginPath();
  context.fillStyle = colorCode;
  context.strokeStyle = colorCode;
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
  context.closePath();
  context.restore();
};

export const drawLine = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  context: CanvasRenderingContext2D,
  colorCode: string
) => {
  context.save();
  context.strokeStyle = colorCode;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.restore();
};

export const drawText = (
  x: number,
  y: number,
  text: string,
  context: CanvasRenderingContext2D,
  colorCode: string,
  font = '16px Noto Sans KR'
) => {
  context.save();
  context.font = font;
  context.strokeStyle = colorCode;
  context.fillStyle = colorCode;
  context.fillText(text, x, y);
  context.restore();
};

export const drawTextWithBackGround = (
  x: number,
  y: number,
  text: string,
  context: CanvasRenderingContext2D,
  colorCode = '#00070A',
  bgColorCode = '#D4E6F1',
  font = 'bold 16px Noto Sans KR',
  height = 16
) => {
  context.save();
  context.font = font;
  context.fillStyle = bgColorCode;
  context.globalAlpha = 1;
  const textBoxWidth = context.measureText(text).width;
  context.fillRect(x, y, textBoxWidth, height);
  context.fillStyle = colorCode;
  context.fillText(text, x, y + height);
  context.restore();
};

export const drawPath = (
  points: IPoint[],
  context: CanvasRenderingContext2D,
  colorCode: string,
  view: ICanvasView
) => {
  context.save();
  context.strokeStyle = colorCode;
  context.fillStyle = colorCode;
  context.beginPath();
  const [p] = transformImagePointToCanvasPoint(view, {
    x: points[0].x,
    y: points[0].y,
  });
  context.moveTo(p.x, p.y);
  for (let i = 1; i < points.length; i += 1) {
    const [p] = transformImagePointToCanvasPoint(view, {
      x: points[i].x,
      y: points[i].y,
    });
    context.lineTo(p.x, p.y);
  }
  context.globalAlpha = 0.3;
  context.fill();
  context.globalAlpha = 1;
  context.closePath();
  context.restore();
};
