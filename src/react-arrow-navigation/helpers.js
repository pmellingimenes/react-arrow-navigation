import { useEffect, useRef } from "react";

export function useKey(key, handler) {
  // Store the handler in a ref so we don't have to memoize it during usage
  const savedHandler = useRef(null);
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    window.addEventListener("keydown", event => {
      if (event.code === key && savedHandler.current) {
        savedHandler.current(event);
      }
    });
  }, [key]);
}

export function modulo(x, y) {
  return ((x % y) + y) % y;
}

function indexesMatch(firstIndex, secondIndex) {
  return firstIndex[0] === secondIndex[0] && firstIndex[1] === secondIndex[1];
}

export function findNextXIndex(xIndex, yIndex, delta, xLength, holes) {
  let newIndex = [modulo(xIndex + delta, xLength), yIndex];
  // Try finding an index that isn't a hole
  for (let i = 0; i < xLength - 1; i++) {
    if (!holes.find(holeIndex => indexesMatch(holeIndex, newIndex))) {
      return newIndex;
    }

    newIndex = [modulo(newIndex[0] + delta, xLength), yIndex];
  }

  // If we didn't find one, just return the original index
  return [xIndex, yIndex];
}

export function findNextYIndex(xIndex, yIndex, delta, yLength, holes) {
  let newIndex = [xIndex, modulo(yIndex + delta, yLength)];
  // Try finding an index that isn't a hole
  for (let i = 0; i < yLength - 1; i++) {
    if (!holes.find(holeIndex => indexesMatch(holeIndex, newIndex))) {
      return newIndex;
    }

    newIndex = [xIndex, modulo(newIndex[1] + delta, yLength)];
  }

  // If we didn't find one, just return the original index
  return [xIndex, yIndex];
}
