import { Dispatch, SetStateAction } from "react";
import { FiSun } from "react-icons/fi";
import { HiOutlineMoon } from "react-icons/hi";
import { DARK_MODE_BOX_SHADOW } from "../../constants/styleConstants";
import styles from "./DarkModeToggle.module.scss";

interface DarkModeToggleProps {
  isLightMode: boolean;
  setIsLightMode: Dispatch<SetStateAction<boolean>>;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  isLightMode,
  setIsLightMode,
}) => {
  return (
    <button
      className={styles.darkModeToggle}
      onClick={() => setIsLightMode((prev) => !prev)}
      title={isLightMode ? "Change to Dark Mode" : "Change to Light Mode"}
      style={{ boxShadow: !isLightMode && DARK_MODE_BOX_SHADOW }}
    >
      {isLightMode ? (
        <FiSun className={styles.icon} />
      ) : (
        <HiOutlineMoon className={styles.icon} color={"white"} />
      )}
    </button>
  );
};

export default DarkModeToggle;
