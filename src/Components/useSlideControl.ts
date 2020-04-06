import { useState, useImperativeHandle, Ref } from "react";

export interface ISlideComponent {
  readonly stages: any[];
  readonly slideActions: SlideAction[] | undefined;
  setState(state: any): void;
}

export interface SlideAction {
  forward?: () => any;
  backward?: () => any;
}

const useSlideControl: <S>(
  ref: Ref<ISlideComponent>,
  slideStages: S[],
  slideActions?: SlideAction[]
) => S = (ref, slideStages, slideActions) => {
  const [_stages] = useState(slideStages);
  const [_state, _setState] = useState(_stages[0]);

  useImperativeHandle(ref, () => ({
    get stages() {
      return _stages;
    },
    get slideActions() {
      return slideActions;
    },
    setState(newState: any) {
      _setState(newState);
    }
  }));

  return _state;
};

export default useSlideControl;
