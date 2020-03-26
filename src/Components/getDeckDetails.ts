import { MutableRefObject } from "react";
import { IDeckRef } from "./Deck";

const getDeckDetails = (deck: MutableRefObject<IDeckRef>): IDeckRef | null => {
  if (deck.current) {
    return {
      ...deck.current
    };
  }
  return null;
};

export default getDeckDetails;
