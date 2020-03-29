import React, {
  useRef,
  useState,
  useEffect,
  MutableRefObject,
  forwardRef,
  Ref
} from "react";
import {
  Deck,
  Slide,
  IDeckStatus,
  getDeckDetails,
  IDeckRef,
  ISlideComponent
} from "../src/index";
import { View, Text } from "react-native";
import { render, cleanup, act } from "@testing-library/react-native";
import useSlideControl from "../src/Components/useSlideControl";

afterEach(cleanup);

type deckPropsType = {
  nextSlide?: () => any;
  prevSlide?: () => any;
  deckStatus?: IDeckStatus | null;
};

const SlideWithStages = forwardRef((props, ref: Ref<ISlideComponent>) => {
  const activeState = useSlideControl(ref, [
    {
      stage: 1
    },
    {
      stage: 2
    },
    {
      stage: 3
    }
  ]);
  return (
    <View>
      {activeState.stage === 1 && <Text>Stage1</Text>}
      {activeState.stage === 2 && <Text>Stage2</Text>}
      {activeState.stage === 3 && <Text>Stage3</Text>}
    </View>
  );
});

const DeckComponent = ({ deckProps }: { deckProps: deckPropsType }) => {
  const $deckComponent = useRef<IDeckRef>(null);
  const [deckStatus, setDeckStatus] = useState<IDeckStatus | null>(null);

  const nextSlide = () =>
    $deckComponent.current && $deckComponent.current.nextSlide();

  const prevSlide = () =>
    $deckComponent.current && $deckComponent.current.prevSlide();

  useEffect(() => {
    if ($deckComponent.current) {
      setDeckStatus(
        getDeckDetails($deckComponent as MutableRefObject<IDeckRef>)
      );
    }
  }, []);

  const slideChangeCb = () => {
    if ($deckComponent.current) {
      setDeckStatus(
        getDeckDetails($deckComponent as MutableRefObject<IDeckRef>)
      );
    }
  };

  Object.assign(deckProps, {
    nextSlide,
    prevSlide,
    deckStatus
  });

  return (
    <Deck ref={$deckComponent} onSlideChange={slideChangeCb}>
      {[
        <Slide key={0}>
          <Text>Hello</Text>
        </Slide>,
        <Slide key={1}>
          <Text>World</Text>
        </Slide>,
        <Slide key={2}>
          <SlideWithStages />
        </Slide>,
        <Slide key={3}>
          <Text>Final</Text>
        </Slide>
      ]}
    </Deck>
  );
};
describe("Testing Deck Component", () => {
  it("Renders Deck", async () => {
    const deckProps: deckPropsType = {};
    const tree = render(<DeckComponent deckProps={deckProps} />);

    expect(deckProps?.deckStatus?.slideCount).toBe(4);

    /**
     * First Deck Render
     */
    const { getByText } = tree;
    const element = getByText("Hello");
    expect(element).toBeTruthy();
    expect(deckProps?.deckStatus?.activeSlideIndex).toBe(0);

    /**
     * Moving one slide forward
     */
    await act(async () => {
      deckProps?.nextSlide();
      await new Promise(r => setTimeout(r, 200));
    });
    const element2 = getByText("World");
    expect(element2).toBeTruthy();
    expect(deckProps?.deckStatus?.activeSlideIndex).toBe(1);

    /**
     * Moving one slide backward
     */
    await act(async () => {
      deckProps?.prevSlide();
      await new Promise(r => setTimeout(r, 200));
    });
    const element3 = getByText("Hello");
    expect(element3).toBeTruthy();
    expect(deckProps?.deckStatus?.activeSlideIndex).toBe(0);

    /**
     * Moving to Third slide
     */
    await act(async () => {
      deckProps?.nextSlide();
      await new Promise(r => setTimeout(r, 200));
    });
    await act(async () => {
      deckProps?.nextSlide();
      await new Promise(r => setTimeout(r, 200));
    });
    expect(deckProps?.deckStatus?.activeSlideIndex).toBe(2);
    expect(deckProps?.deckStatus?.slideStageCount).toBe(3);

    /**
     * Third Slide Stage 1
     */
    const element4 = getByText("Stage1");
    expect(element4).toBeTruthy();
    expect(deckProps?.deckStatus?.slideActiveStageIndex).toBe(0);

    /**
     * Third Slide Stage 2
     */
    await act(async () => {
      deckProps?.nextSlide();
      await new Promise(r => setTimeout(r, 200));
    });
    const element5 = getByText("Stage2");
    expect(element5).toBeTruthy();
    expect(deckProps?.deckStatus?.slideActiveStageIndex).toBe(1);

    /**
     * Third Slide Stage 3
     */
    await act(async () => {
      deckProps?.nextSlide();
      await new Promise(r => setTimeout(r, 200));
    });
    const element6 = getByText("Stage3");
    expect(element6).toBeTruthy();
    expect(deckProps?.deckStatus?.slideActiveStageIndex).toBe(2);

    /**
     * Move to final stage
     */
    await act(async () => {
      deckProps?.nextSlide();
      await new Promise(r => setTimeout(r, 200));
    });
    const element7 = getByText("Final");
    expect(element7).toBeTruthy();

    /**
     * Move one step backward
     * - Testing jump to last
     */
    await act(async () => {
      deckProps?.prevSlide();
      await new Promise(r => setTimeout(r, 200));
    });
    const element8 = getByText("Stage3");
    expect(element8).toBeTruthy();
    expect(deckProps?.deckStatus?.slideActiveStageIndex).toBe(2);
  });
});
