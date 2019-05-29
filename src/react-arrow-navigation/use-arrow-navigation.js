import { useContext, useEffect } from "react";
import { ArrowNavigationContext } from "./arrow-navigation";

export default function useArrowNavigation(xIndex, yIndex) {
  const { selectedIndex, registerChild } = useContext(ArrowNavigationContext);

  useEffect(() => {
    registerChild(xIndex, yIndex);
  }, [xIndex, yIndex]);

  const isSelected = xIndex === selectedIndex[0] && yIndex === selectedIndex[1];
  return { isSelected, selectedIndex };
}
