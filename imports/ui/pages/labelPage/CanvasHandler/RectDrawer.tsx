import { canvasView } from 'imports/recoil/canvas'
import _ from 'lodash'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'

import {
  getNormOfPoint,
  IPoint,
  transformCanvasPointToImagePoint,
} from '../../../../canvasTools/IPoint'
import {
  isPointInRect,
  makeRectRegion,
  moveBoundingPointOfRect,
} from '../../../../canvasTools/IRect'
import { findNearestBoundingPoint, IVertexInfo } from '../../../../canvasTools/IRegionData'
import {
  annotationDispatcherState,
  currentAnnotations,
  IAnnotation,
  selectionIdx,
} from '../../../../recoil/annotation'
import Canvas from '../Canvas'
import { ICanvasHandlerProps } from './ICanvasHandler'

type HandlerState =
  | 'idle'
  | 'onPoint'
  | 'drawHolding' // Mouse Down
  | 'draw' // Drawing State
  | 'moveHolding'
  | 'movePoint'

// React Region 생성 Handler
export default function RectDrawer({ frame, onWheel }: ICanvasHandlerProps) {
  const [state, setState] = useState<HandlerState>('idle')
  const [startPoint, setStartPoint] = useState<IPoint>({ x: 0, y: 0 })
  const annotationDispatcher = useRecoilValue(annotationDispatcherState)
  const annotations = useRecoilValue(currentAnnotations)
  const selection = useRecoilValue(selectionIdx)

  const view = useRecoilValue(canvasView)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    const mousePoint: IPoint = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    }

    switch (state) {
      case 'idle':
        setStartPoint(mousePoint)
        if (annotations[selection].regions.rect === undefined) setState('drawHolding')
        break
      case 'onPoint':
        setState('moveHolding')
        break
      default:
        break
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    const mousePoint: IPoint = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    }
    const movementOffset: IPoint = {
      x: e.movementX,
      y: e.movementY,
    }
    const [pointA, pointB] = transformCanvasPointToImagePoint(view, startPoint, mousePoint)

    switch (state) {
      case 'idle':
      case 'onPoint':
        const region = annotations[selection]?.regions.rect
        if (region === undefined) break
        let nearestPoint = undefined
        let vertex: IVertexInfo = undefined
        if (isPointInRect(mousePoint, region, view, 5)) {
          nearestPoint = findNearestBoundingPoint(mousePoint, region, view, 10)
          if (nearestPoint !== undefined) {
            setState('onPoint')
          } else {
            setState('idle')
          }
        }
        if (nearestPoint !== undefined)
          vertex = {
            idx: nearestPoint,
            type: 'boundingPoint',
          }
        annotationDispatcher.highlightRect(selection, vertex)
        break

      case 'drawHolding': {
        if (!(getNormOfPoint(movementOffset) > 0)) break
        setState('draw')
        break
      }
      case 'moveHolding': {
        if (!(getNormOfPoint(movementOffset) > 0)) break
        setState('movePoint')
        break
      }
      case 'draw': {
        const updateAnnotation = _.cloneDeep(annotations[selection])
        updateAnnotation.regions.rect = makeRectRegion(pointA, pointB)
        annotationDispatcher?.edit(selection, updateAnnotation, true)
        break
      }
      case 'movePoint': {
        const updatedAnnot: IAnnotation = _.cloneDeep(annotations[selection])
        updatedAnnot.regions.rect = moveBoundingPointOfRect(
          updatedAnnot.regions.rect,
          updatedAnnot.regions.rect.highlightedVertex.idx,
          mousePoint,
          view
        )
        annotationDispatcher.edit(selection, updatedAnnot, true)
      }
      default:
        break
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    switch (state) {
      default:
        setState('idle')
        break
    }
  }

  const handleMouseOut = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    switch (state) {
      default:
        setState('idle')
        break
    }
  }

  return (
    <Canvas
      frame={frame}
      onWheel={onWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseOut}
    />
  )
}
