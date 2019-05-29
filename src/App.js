import React from "react";
import "./App.css";

import ArrowNavigation from "./react-arrow-navigation";
import NavChild from "./nav-child";

function App() {
  return (
    <div className="app">
      <ArrowNavigation holes={[[1, 1]]}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <NavChild xIndex={0} yIndex={0} />
            <NavChild xIndex={1} yIndex={0} />
            <NavChild xIndex={2} yIndex={0} />
          </div>
          <div style={{ display: "flex" }}>
            <NavChild xIndex={0} yIndex={1} />
            <div className="child">hole</div>
            <NavChild xIndex={2} yIndex={1} />
          </div>
          <div style={{ display: "flex" }}>
            <NavChild xIndex={0} yIndex={2} />
            <NavChild xIndex={1} yIndex={2} />
            <NavChild xIndex={2} yIndex={2} />
          </div>
        </div>
      </ArrowNavigation>
    </div>
  );
}

export default App;
