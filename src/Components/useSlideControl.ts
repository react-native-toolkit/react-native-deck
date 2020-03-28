import { useState, useImperativeHandle, Ref } from "react";

export interface ISlideComponent {
  readonly stages: any[];
  setState(index: number): void;
}

const useSlideControl: <S>(ref: Ref<ISlideComponent>, slideStages: S[]) => S = (
  ref,
  slideStages
) => {
  const [_stages] = useState(slideStages);
  const [_state, _setState] = useState(_stages[0]);

  useImperativeHandle(ref, () => ({
    get stages() {
      return _stages;
    },
    setState(newState: any) {
      _setState(newState);
    }
  }));

  return _state;
};

export default useSlideControl;
