import React from 'react';

export interface ICanvasHandlerProps {
  frame: HTMLImageElement | undefined;
  onWheel?: (e: React.WheelEvent) => void;
  projectInfo: any;
}
