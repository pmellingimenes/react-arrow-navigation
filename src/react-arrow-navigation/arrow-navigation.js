import React from "react";
import { useState, createContext } from "react";
import { useKey, modulo, findNextXIndex, findNextYIndex } from "./helpers";

export const ArrowNavigationContext = createContext({
  selectedIndex: [undefined, undefined],
  registerChild: undefined
});

function ArrowNavigation({ children, initialIndex, holes }) {
  const [{ selectedIndex }, updateState] = useState({
    selectedIndex: initialIndex || [undefined, undefined],
    xIndicies: [],
    yIndicies: [],
    registeredHoles: []
  });

  function registerChild(xIndex, yIndex = 0, isHole) {
    updateState(({ selectedIndex, xIndicies, yIndicies, registeredHoles }) =>
      !isHole
        ? {
            selectedIndex,
            xIndicies: [...new Set(xIndicies.concat(xIndex))].sort(),
            yIndicies: [...new Set(yIndicies.concat(yIndex))].sort(),
            registeredHoles
          }
        : {
            selectedIndex,
            xIndicies,
            yIndicies,
            registeredHoles: registeredHoles.push([xIndex, yIndex])
          }
    );
  }

  function updateXIndex(delta) {
    updateState(({ selectedIndex, xIndicies, yIndicies, registeredHoles }) => {
      if (selectedIndex[0] === undefined && selectedIndex[1] === undefined) {
        return {
          xIndicies,
          yIndicies,
          registeredHoles,
          selectedIndex: [xIndicies[0], yIndicies[0]]
        };
      }

      console.log({ holes, registeredHoles, h: holes.concat(registeredHoles) });

      return {
        xIndicies,
        yIndicies,
        registeredHoles,
        selectedIndex: findNextXIndex(
          selectedIndex[0],
          selectedIndex[1],
          delta,
          xIndicies.length,
          holes.concat(registeredHoles)
        )
      };
    });
  }

  function updateYIndex(delta) {
    updateState(({ selectedIndex, xIndicies, yIndicies, registeredHoles }) => {
      if (selectedIndex[0] === undefined && selectedIndex[1] === undefined) {
        return {
          xIndicies,
          yIndicies,
          registeredHoles,
          selectedIndex: [xIndicies[0], yIndicies[0]]
        };
      }

      return {
        xIndicies,
        yIndicies,
        registeredHoles,
        selectedIndex: findNextYIndex(
          selectedIndex[0],
          selectedIndex[1],
          delta,
          yIndicies.length,
          holes.concat(registeredHoles)
        )
      };
    });
  }

  useKey("ArrowLeft", () => updateXIndex(-1));
  useKey("ArrowRight", () => updateXIndex(1));
  useKey("ArrowUp", () => updateYIndex(-1));
  useKey("ArrowDown", () => updateYIndex(1));

  const contextValue = { selectedIndex, registerChild };

  return (
    <ArrowNavigationContext.Provider value={contextValue}>
      {children}
    </ArrowNavigationContext.Provider>
  );
}

export default ArrowNavigation;
