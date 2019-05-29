import React from "react";
import { useArrowNavigation } from "./react-arrow-navigation";
import "./nav-child.css";

function NavChild({ xIndex, yIndex }) {
  const { isSelected } = useArrowNavigation(xIndex, yIndex);

  return (
    <div className={isSelected ? "child selectedChild" : "child"}>
      {xIndex}, {yIndex}
    </div>
  );
}

export default NavChild;
