import _ from 'lodash';
import { atom, selector, useRecoilCallback } from 'recoil';
import { IRegionData, IVertexInfo } from '../canvasTools/IRegionData';
import { getRandomHexColor, makeRandomId } from '../common/utils';

export interface IAnnotation {
  className: string;
  regions: {
    rect?: IRegionData;
    skeleton?: IRegionData;
    polygon?: IRegionData;
  };
  color: string;
  key: string; // this value is for unique React Key Value
  selected: boolean;
  meta?: any; // custom meta data
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

export const createAnnotationDispatcher = () => {
  const insert = useRecoilCallback<[], void>(({ set }) => () => {
    const newAnnotation: IAnnotation = {
      className: 'undefined',
      regions: {},
      color: getRandomHexColor(),
      selected: false,
      key: makeRandomId()
    };
    set(undoStack, (undoList) => {
      const updateList = _.cloneDeep(undoList);
      updateList.push([...undoList[undoList.length - 1], newAnnotation]);
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
            // newAnnot.regions.rect.highlighted = true;
            newAnnot.regions.rect.highlightedVertex = vertex;
          } else {
            if (newAnnot.regions.rect) {
              // newAnnot.regions.rect.highlighted = false;
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
            if (newAnnot.regions.rect) {
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
          if (idx >= undoList[undoList.length - 1].length){
            set(selectionIdx, undefined);
            console.log(idx, undoList[undoList.length - 1].length)
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
    set(undoStack, [[]]);
    set(redoStack, [[]]);
  });

  const initFromData = useRecoilCallback<[IAnnotation[]], void>(
    ({ set }) =>
      (annotations: IAnnotation[]) => {
        set(undoStack, [annotations]);
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
