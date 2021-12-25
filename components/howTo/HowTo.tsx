import { useContext, useState } from "react";
import IsLightModeContext from "../../contexts/IsLightModeContext";
import styles from "./HowTo.module.scss";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  DARK_MODE_BACKGROUND,
  DARK_MODE_BOX_SHADOW,
  LIGHT_MODE_BACKGROUND,
} from "../../constants/styleConstants";
import BrowserContext from "../../contexts/BrowserContext";

const DropDown = () => {
  const isLightMode = useContext(IsLightModeContext);
  const browserName = useContext(BrowserContext);

  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`${styles.dropDown} ${isSelected && styles.animateDropDown}`}
      style={{
        boxShadow: !isLightMode && DARK_MODE_BOX_SHADOW,
        color: !isLightMode && "white",
        backgroundColor: isLightMode
          ? LIGHT_MODE_BACKGROUND
          : DARK_MODE_BACKGROUND,
      }}
      onClick={() => setIsSelected((prev) => !prev)}
    >
      <div style={{ cursor: "pointer" }}>
        <h3
          style={{
            marginTop: "7px",
            fontSize: "1.075rem",
            display: "inline-block",
          }}
        >
          How to use this thing
        </h3>
        {isSelected ? (
          <IoIosArrowUp
            className={styles.arrowIcon}
            style={{ marginLeft: browserName?.includes("firefox") && "8px" }}
          />
        ) : (
          <IoIosArrowDown
            className={styles.arrowIcon}
            style={{ marginLeft: browserName?.includes("firefox") && "8px" }}
          />
        )}
      </div>

      <div>
        <h3 className={styles.instructionHeader}>To Add a State:</h3>
        <br />
        <strong>Drag in a state from the panel on the far left.</strong>
        <br />
        <br />
        <br />

        <h3 className={styles.instructionHeader}>To Add an input:</h3>
        <br />
        <strong>
          Hover over a created state, hold down shift, then hold down the left
          click and drag your mouse to another state.
        </strong>
        <br />
        <br />
        <br />
        <h3 className={styles.instructionHeader}>To Move Something:</h3>
        <br />
        <strong>
          Hold down the left click on an input or state and start dragging it
          around.
        </strong>
        <br />
        <br />
        <br />
        <h3 className={styles.instructionHeader}>
          To Edit State Details and Colors:
        </h3>
        <br />
        <strong>Right click on the state.</strong>
        <br />
        <br />
        <br />
        <h3 className={styles.instructionHeader}>
          To Edit Input Details and Colors:
        </h3>
        <br />
        <strong>Left click on the Input.</strong>
      </div>
    </div>
  );
};

export default DropDown;
