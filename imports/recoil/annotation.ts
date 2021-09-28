import _ from 'lodash';
import { atom, selector, useRecoilCallback } from 'recoil';
import {
  getBoundingPointsOfRegion,
  IKeypoint,
  IRegionData,
  IVertexInfo,
  RegionDataType
} from '../canvasTools/IRegionData';
import { getRandomHexColor, makeRandomId } from '../common/utils';
import { makeRectRegion } from '../canvasTools/IRect';
import { restorePolygonFromPoints } from '../canvasTools/IPolygon';
import { restoreKeypointFromData } from '../canvasTools/ISkeleton';

export interface IAnnotation {
  className: string;
  regions: {
    rect?: IRegionData;
    keypoint?: IRegionData;
    polygon?: IRegionData;
  };
  color: string;
  key: string; // this value is for unique React Key Value
  selected: boolean;
  meta: {}; // custom meta data
}

export interface ISaveAnnotation {
  className: string;
  box: false | number[];
  keypoints: false | number[][];
  polygon: false | number[][];
  boundingPoints: false | number[][];
  state1: string | false;
  state2: string | false;
  id: number | false;
}

export const undoStack = atom<IAnnotation[][]>({
  key: 'undoStack',
  default: [[]]
});

const redoStack = atom<IAnnotation[][]>({
  key: 'redoStack',
  default: [[]]
});

export const selectionIdx = atom<undefined | number>({
  key: 'selectionIdx',
  default: undefined
});

export const keypointIdx = atom<number>({
  key: 'keypointIdx',
  default: 0
});

export const createAnnotationDispatcher = () => {
  const insert = useRecoilCallback<[boolean, any], void>(({ set }) => (initKeypoint: boolean, projectInfo) => {
    const newAnnotation: IAnnotation = {
      className: 'undefined',
      regions: {},
      color: getRandomHexColor(),
      selected: false,
      key: makeRandomId(),
      meta: {}
    };
    if (initKeypoint) {
      const defaultPoints: IKeypoint[] = projectInfo.keypoint.map((name) => {
        return {
          visible: 0,
          alias: name,
          x: 0,
          y: 0
        };
      });
      newAnnotation.regions.keypoint = {
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
    }
    set(undoStack, (undoList) => {
      const updateList = _.cloneDeep(undoList);
      updateList.push([...undoList[undoList.length - 1], newAnnotation]);
      // insert 시 가장 마지막 추가된 객체 선택으로 변경
      set(selectionIdx, updateList[updateList.length - 1].length - 1);
      return updateList;
    });
    set(redoStack, [[]]);


  });

  const edit = useRecoilCallback<[number, IAnnotation, boolean], void>(
    ({ set }) =>
      (idx, annotation, replace) => {
        set(undoStack, (undoList) => {
          const updateList = _.cloneDeep(undoList);
          if (replace) {
            updateList[updateList.length - 1][idx] = annotation;
          } else {
            const newAnnotations = updateList[updateList.length - 1];
            newAnnotations[idx] = annotation;
            updateList.push(newAnnotations);
          }
          return updateList;
        });
        set(redoStack, [[]]);
      }
  );

  const highlightRect = useRecoilCallback<[number | undefined, IVertexInfo | undefined],
    void>(({ set }) => (idx, vertex) => {
    set(undoStack, (undoList) => {
      const updateList: IAnnotation[][] = _.cloneDeep(undoList);
      const lastList = updateList[updateList.length - 1].map(
        (annot, annotIdx) => {
          const newAnnot = { ...annot };
          if (annotIdx === idx) {
            newAnnot.regions.rect.highlighted = true;
            newAnnot.regions.rect.highlightedVertex = vertex;
          } else {
            if (newAnnot.regions.rect) {
              newAnnot.regions.rect.highlighted = false;
              newAnnot.regions.rect.highlightedVertex = undefined;
            }
          }
          return newAnnot;
        }
      );
      updateList[updateList.length - 1] = lastList;
      return updateList;
    });
  });

  const highlightPolygon = useRecoilCallback<[number | undefined, IVertexInfo | undefined],
    void>(({ set }) => (idx, vertex) => {
    set(undoStack, (undoList) => {
      const updateList: IAnnotation[][] = _.cloneDeep(undoList);
      const lastList = updateList[updateList.length - 1].map(
        (annot, annotIdx) => {
          const newAnnot = { ...annot };
          if (annotIdx === idx) {
            newAnnot.regions.polygon.highlightedVertex = vertex;
          } else {
            if (newAnnot.regions.polygon) {
              newAnnot.regions.polygon.highlightedVertex = undefined;
            }
          }
          return newAnnot;
        }
      );
      updateList[updateList.length - 1] = lastList;
      return updateList;
    });
  });

  const highlightKeypoint = useRecoilCallback<[number | undefined, IVertexInfo | undefined],
    void>(({ set }) => (idx, vertex) => {
    set(undoStack, (undoList) => {
      const updateList: IAnnotation[][] = _.cloneDeep(undoList);
      const lastList = updateList[updateList.length - 1].map(
        (annot, annotIdx) => {
          const newAnnot = { ...annot };
          if (annotIdx === idx) {
            newAnnot.regions.keypoint.highlightedVertex = vertex;
          } else {
            if (newAnnot.regions.keypoint) {
              newAnnot.regions.keypoint.highlightedVertex = undefined;
            }
          }
          return newAnnot;
        }
      );
      updateList[updateList.length - 1] = lastList;
      return updateList;
    });
  });

  const toggleSelectionAnnotation = useRecoilCallback<[number], void>(
    ({ set }) =>
      (idx) => {
        set(undoStack, (undoList) => {
          const updateList: IAnnotation[][] = _.cloneDeep(undoList);
          const lastList = updateList[updateList.length - 1].map(
            (annot, annotIdx) => {
              const newAnnot = { ...annot };
              if (annotIdx === idx) {
                newAnnot.selected = !newAnnot.selected;
              }
              return newAnnot;
            }
          );
          updateList[updateList.length - 1] = lastList;
          return updateList;
        });
      }
  );

  const setSelectionAnnotation = useRecoilCallback<[number, boolean], void>(
    ({ set }) =>
      (idx, val) => {
        set(undoStack, (undoList) => {
          const updateList: IAnnotation[][] = _.cloneDeep(undoList);
          const lastList = updateList[updateList.length - 1].map(
            (annot, annotIdx) => {
              const newAnnot = { ...annot };
              if (annotIdx === idx) {
                newAnnot.selected = val;
              }
              return newAnnot;
            }
          );
          updateList[updateList.length - 1] = lastList;
          return updateList;
        });
      }
  );

  const undo = useRecoilCallback<[], void>(
    (
      { set, snapshot } //
    ) =>
      async () => {
        const undoList = _.cloneDeep(await snapshot.getPromise(undoStack));
        if (undoList.length <= 1) return;
        const lastAnnotations = undoList.pop();
        if (lastAnnotations) {
          const idx = await snapshot.getPromise(selectionIdx);
          if (idx >= undoList[undoList.length - 1].length) {
            set(selectionIdx, undefined);
          }
          set(undoStack, undoList);
          set(redoStack, (redoList) => [...redoList, lastAnnotations]);
        }
      }
  );

  const redo = useRecoilCallback<[], void>(
    (
      { set, snapshot } //
    ) =>
      async () => {
        const redoList = _.cloneDeep(await snapshot.getPromise(redoStack));
        if (redoList.length <= 1) return;
        const lastAnnotations = redoList.pop();
        if (lastAnnotations) {
          set(redoStack, redoList);
          set(undoStack, (undoList) => [...undoList, lastAnnotations]);
        }
      }
  );

  const del = useRecoilCallback<[], void>(({ set, snapshot }) => async () => {
    const undoList = _.cloneDeep(await snapshot.getPromise(undoStack));
    const updatedAnnotations = undoList[undoList.length - 1].filter(
      (annot) => !annot.selected
    );
    undoList.push(updatedAnnotations);
    set(undoStack, undoList);
  });

  const reset = useRecoilCallback<[], void>(({ set }) => () => {
    set(selectionIdx, undefined);
    set(undoStack, [[]]);
    set(redoStack, [[]]);
  });

  const initFromData = useRecoilCallback<[ISaveAnnotation[], any], void>(
    ({ set }) =>
      (annotations: ISaveAnnotation[], projectInfo: any) => {
        const annots: IAnnotation[] = annotations.map((annot) => {
          const className = annot.className;
          const key = makeRandomId();
          const meta = {};
          let color = getRandomHexColor();
          const clsIdx = projectInfo.bbox.findIndex((cls) => cls === className);
          if (clsIdx > -1)
            color = projectInfo.color[clsIdx];
          let rect: IRegionData = undefined;
          if (annot.box)
            rect = makeRectRegion(
              {
                x: annot.box[0],
                y: annot.box[1]
              },
              {
                x: annot.box[0] + annot.box[2],
                y: annot.box[1] + annot.box[3]
              });
          let polygon: IRegionData = undefined;
          if (annot.polygon) {
            polygon = restorePolygonFromPoints(annot.polygon.map((pt) => ({ x: pt[0], y: pt[1] })));
          }
          let keypoint: IRegionData = undefined;
          if (annot.keypoints) {
            keypoint = restoreKeypointFromData(annot.keypoints, projectInfo);
          }
          if (annot.state1) {
            meta[projectInfo.stateList[0].stateName] = annot.state1;
          }
          if (annot.state2) {
            meta[projectInfo.stateList[1].stateName] = annot.state2;
          }
          if (annot.id !== false) {
            meta['trackingId'] = annot.id;
          }
          return {
            className,
            regions: { rect, keypoint, polygon },
            color,
            key,
            selected: false,
            meta
          };
        });
        set(undoStack, [annots]);
        set(redoStack, [[]]);
      }
  );

  const remove = useRecoilCallback<[number], void>(
    ({ set, snapshot }) =>
      async (idx: number) => {
        const undoList = _.cloneDeep(await snapshot.getPromise(undoStack));
        const updatedAnnotations = undoList[undoList.length - 1].filter(
          (annot, annotIdx) => annotIdx !== idx
        );
        undoList.push(updatedAnnotations);
        if (idx >= undoList[undoList.length - 1].length) {
          set(selectionIdx, undefined);
        }
        set(undoStack, undoList);
      }
  );

  return {
    insert,
    edit,
    highlightRect,
    toggleSelectionAnnotation,
    setSelectionAnnotation,
    highlightPolygon,
    highlightKeypoint,
    undo,
    redo,
    del,
    reset,
    remove,
    initFromData
  };
};

export type AnnotationDispatcher = ReturnType<typeof createAnnotationDispatcher>;

export const annotationDispatcherState = atom<AnnotationDispatcher | undefined>(
  {
    key: 'annotationDispatcherState',
    default: undefined
  }
);

export const currentAnnotations = selector<IAnnotation[]>({
  key: 'currentAnnotations',
  get: ({ get }) => {
    const undoList = get(undoStack);
    return undoList[undoList.length - 1];
  }
});

export const currentHighligtedAnnotation = selector<| {
  idx: number;
  annot: IAnnotation;
}
  | undefined>({
  key: 'currentHighligtedAnnotation',
  get: ({ get }) => {
    const annotations = get(currentAnnotations);
    const idx = annotations.findIndex((annot) => annot.region.highlighted);
    if (idx >= 0) {
      return { idx, annot: annotations[idx] };
    }
    return undefined;
  }
});

export const isAnnotationsValid = selector<boolean>({
  key: 'isAnnotationsValid',
  get: ({ get }) => {
    const annotations = get(currentAnnotations);
    if (annotations.length === 0) return false;
    return annotations.reduce<boolean>(
      (ret, annot) => annot.className !== 'undefined' && ret,
      true
    );
  }
});
