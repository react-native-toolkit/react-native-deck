import React, {
  Children,
  cloneElement,
  createRef,
  ReactNode,
  Fragment,
  Component
} from "react";

export interface SlideProps {
  children: ReactNode;
  nextStage: () => boolean;
  prevStage: () => boolean;
}

export interface SlideState {
  ChildNode: ReactNode;
  activeStageIndex: number;
}

export interface ISlideElement {
  current: {
    stages: object[];
    setState: (arg1: object) => any;
  };
}

class Slide extends Component<SlideProps, SlideState> {
  state = {
    ChildNode: null,
    activeStageIndex: 0
  };
  $slideElement: ISlideElement = createRef() as ISlideElement;

  setChildNode = (node: ReactNode) => this.setState({ ChildNode: node });

  setActiveStageIndex = (index: number) =>
    this.setState({ activeStageIndex: index });

  componentDidMount() {
    const childrenWithProps = Children.map(this.props.children, child =>
      cloneElement(child, {
        ref: this.$slideElement
      })
    );
    this.setChildNode(childrenWithProps);
  }

  nextStage = () => {
    const { stages = [] } = this.$slideElement.current;
    const newStageIndex = this.state.activeStageIndex + 1;
    if (newStageIndex === stages.length) {
      return false;
    }
    const newState = stages[newStageIndex];
    this.$slideElement.current.setState(newState);
    this.setActiveStageIndex(newStageIndex);
    return true;
  };

  prevStage = () => {
    if (!this.state.activeStageIndex) {
      return false;
    }
    const { stages = [] } = this.$slideElement.current;
    const newStageIndex = this.state.activeStageIndex - 1;
    const newState = stages[newStageIndex];
    this.$slideElement.current.setState(newState);
    this.setActiveStageIndex(newStageIndex);
    return true;
  };

  jumpToLastStage = () => {
    const { stages = [] } = this.$slideElement.current;
    const newStageIndex = stages.length - 1;
    const newState = stages[newStageIndex];
    this.$slideElement.current.setState(newState);
    this.setActiveStageIndex(newStageIndex);
  };

  render() {
    const { ChildNode } = this.state;

    return <Fragment>{ChildNode}</Fragment>;
  }
}

export default Slide;
