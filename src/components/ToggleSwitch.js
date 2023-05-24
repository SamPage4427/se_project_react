import { useContext, useEffect, useState } from "react";

import CurrentTempUnitContext from "../contexts/CurrentTempUnitContext.js";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTempUnitContext
  );
  const [checked, setChecked] = useState(currentTemperatureUnit === "F");

  return (
    <div className="switch">
      <input
        className="switch__checkbox"
        type="checkbox"
        onClick={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slide-fahrenheit"
            : "switch__slide-celsius"
        }
      />
      <p
        className={`switch__fahrenheit ${
          currentTemperatureUnit === "F" ? "switch__active" : ""
        }`}
      >
        F
      </p>
      <p
        className={`switch__celsius ${
          currentTemperatureUnit === "C" ? "switch__active" : ""
        }`}
      >
        C
      </p>
    </div>
  );
}

export default ToggleSwitch;
