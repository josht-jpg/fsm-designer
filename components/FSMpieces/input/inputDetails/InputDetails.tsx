import { useContext, useRef } from "react";
import useOutsideAlerter from "../../../../hooks/useOutsideAlerter";
import styles from "./InputDetails.module.scss";
import EditableAttribute from "../../../../interfaces/editableAttribute";
import DeleteButton from "../../../button/DeleteButton";
import IsLightModeContext from "../../../../contexts/IsLightModeContext";
import { DARK_MODE_BOX_SHADOW } from "../../../../constants/styleConstants";

interface InputDetailsProps {
  inputAttributes: EditableAttribute<string>[];
  onClickCoordinates: any;
  handleClose: () => void;
  handleDeleteInput: () => void;
}

const InputDetails: React.FC<InputDetailsProps> = ({
  inputAttributes,
  onClickCoordinates,
  handleClose,
  handleDeleteInput,
}) => {
  const isLightMode = useContext(IsLightModeContext);

  const ref = useRef<HTMLDivElement>(null);
  useOutsideAlerter(ref, handleClose);

  const detailsWidthInPx = 275;

  return (
    <div
      className={styles.stateDetails}
      ref={ref}
      style={{
        width: detailsWidthInPx,
        left: `${onClickCoordinates.x - 130}px`,
        top: `${
          onClickCoordinates.y +
          (onClickCoordinates.y > window.innerHeight / 2 ? -360 : 25)
        }px`,
        boxShadow: !isLightMode && DARK_MODE_BOX_SHADOW,
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "0" }}>Input Details</h3>
      <hr style={{ width: "50%" }} />

      <form>
        <div className={styles.container}>
          {inputAttributes.map((attribute) => (
            <>
              <label className={styles.inputPrompt}>
                {attribute.label}
                <strong>:</strong>
              </label>
              <span style={{ display: "inline-block" }}>
                <input
                  className={styles.input}
                  type="text"
                  name="inputName"
                  value={attribute.value}
                  onChange={(e) => attribute.setAttribute(e.target.value)}
                />
              </span>
            </>
          ))}
        </div>
        <DeleteButton
          type="Delete Input"
          action={(e) => {
            e.preventDefault();
            handleDeleteInput();
          }}
        />
      </form>
    </div>
  );
};

export default InputDetails;
