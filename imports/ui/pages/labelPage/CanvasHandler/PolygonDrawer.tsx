import _ from 'lodash'
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import {
  getNormOfPoint,
  IPoint,
  transformCanvasPointToImagePoint,
} from '../../../../canvasTools/IPoint'
import { appendPointToPolygon, movePolygonVertex } from '../../../../canvasTools/IPolygon'
import { findNearestPoint, IVertexInfo } from '../../../../canvasTools/IRegionData'
import {
  annotationDispatcherState,
  currentAnnotations,
  IAnnotation,
  selectionIdx,
} from '../../../../recoil/annotation'
import { canvasView } from '../../../../recoil/canvas'
import Canvas from '../Canvas'
import { ICanvasHandlerProps } from './ICanvasHandler'

type HandlerState = 'idle' | 'onPoint' | 'holding' | 'movePoint'

export default function PolygonDrawer({ frame, onWheel }: ICanvasHandlerProps) {
  const [state, setState] = useState<HandlerState>('idle')
  const annotationDispatcher = useRecoilValue(annotationDispatcherState)
  const annotations = useRecoilValue(currentAnnotations)
  const [selection, setSelection] = useRecoilState(selectionIdx)

  const view = useRecoilValue(canvasView)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    const mousePoint: IPoint = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    }
    const [transformed] = transformCanvasPointToImagePoint(view, mousePoint)

    switch (state) {
      case 'idle': {
        const updateAnnotation: IAnnotation = _.cloneDeep(annotations[selection])
        updateAnnotation.regions.polygon = appendPointToPolygon(
          updateAnnotation.regions.polygon,
          transformed
        )
        annotationDispatcher?.edit(selection, updateAnnotation, true)
        break
      }
      case 'onPoint': {
        setState('holding')
        break
      }
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

    switch (state) {
      case 'holding':
        if (!(getNormOfPoint(movementOffset) > 0)) break
        setState('movePoint')
        break
      case 'movePoint': {
        const updatedAnnot: IAnnotation = _.cloneDeep(annotations[selection])
        updatedAnnot.regions.polygon = movePolygonVertex(
          annotations[selection].regions.polygon,
          annotations[selection].regions.polygon.highlightedVertex.idx,
          mousePoint,
          view
        )
        console.log(annotations[selection])
        annotationDispatcher.edit(selection, updatedAnnot, true)
        break
      }
      default: {
        let vertex: IVertexInfo = undefined
        const region = annotations[selection]?.regions.polygon
        if (region === undefined) break
        const nearestPoint = findNearestPoint(mousePoint, region, view, 10)
        if (nearestPoint !== undefined) {
          setState('onPoint')
          vertex = {
            idx: nearestPoint,
            type: 'boundingPoint',
          }
        } else {
          setState('idle')
        }
        annotationDispatcher?.highlightPolygon(selection, vertex)
        break
      }
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
