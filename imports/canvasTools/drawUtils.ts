export const drawRect = (
  x: number,
  y: number,
  width: number,
  height: number,
  context: CanvasRenderingContext2D,
  colorCode: string,
  fillAlpha = 0,
  fill = false,
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
  colorCode: string,
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
  colorCode: string,
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
  font = '16px Noto Sans KR',
) => {
  context.save();
  context.font = font;
  context.strokeStyle = colorCode;
  context.fillStyle = colorCode;
  context.fillText(text, x, y);
  context.restore();
};
