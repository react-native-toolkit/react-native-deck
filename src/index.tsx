import DeckComponent from "./Components/Deck";
import SlideComponent from "./Components/Slide";
import getDeckDetailsFunc from "./Components/getDeckDetails";
import useSlideControlHook from "./Components/useSlideControl";

export const Slide = SlideComponent;

export const Deck = DeckComponent;

export const getDeckDetails = getDeckDetailsFunc;
export const useSlideControl = useSlideControlHook;

export * from "./Components/Deck";
export * from "./Components/Slide";
export * from "./Components/getDeckDetails";
export * from "./Components/useSlideControl";
