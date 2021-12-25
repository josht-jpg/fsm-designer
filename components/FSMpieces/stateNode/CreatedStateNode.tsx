import { useContext } from "react";
import { useState } from "react";
import IsShiftKeyPressedContext from "../../../contexts/IsShiftKeyPressed";
import StateNode from "./StateNode";
import { useEffect } from "react";
import changeNodeInLocalStorage from "../../../utils/changeNodeInLocalStorage";
import {
  getPositionFromStorage,
  moveGroupConnectedToState,
  moveInputsConnectedToStateNode,
} from "../../../utils/stateNodeUtils";
import { saveStartPointPositionAfterMovingState } from "../../../utils/startPointUtils";

interface CreatedStateNodeProps {
  x: number;
  y: number;
  index: number;
  savedAttributes: any;
}

const CreatedStateNode: React.FC<CreatedStateNodeProps> = ({
  x,
  y,
  index,
  savedAttributes,
}) => {
  const { initialX: initialXFromStorage, initialY: initialYFromStorage } =
    getPositionFromStorage(index);
  const [initialX, setInitialX] = useState<number | undefined>(
    initialXFromStorage
  );
  const [initialY, setInitialY] = useState<number | undefined>(
    initialYFromStorage
  );

  let prevX: number;
  let prevY: number;

  const moveInputs = (x: number, y: number) => {
    if (!prevX && !prevY) {
      prevX = x;
      prevY = y;
    }

    const changeInX = x - prevX;
    const changeInY = y - prevY;

    moveInputsConnectedToStateNode(index, changeInX, changeInY);
    moveGroupConnectedToState(
      index,
      { x: initialX, y: initialY, setX: setInitialX, setY: setInitialY },
      changeInX,
      changeInY
    );

    prevX = x;
    prevY = y;
  };

  const handleStartDragging = () => {
    setIsDragging(true);
  };

  const handleDrag = (mouseEvent: MouseEvent) => {
    isDragging && moveInputs(mouseEvent.clientX, mouseEvent.clientY);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleDrag);
    return () => document.removeEventListener("mousemove", handleDrag);
  }, [handleDrag]);

  const [isDragging, setIsDragging] = useState(false);
  const positionStyle = { left: x, top: y };

  const isShiftPressed = useContext(IsShiftKeyPressedContext);

  const handleStopDragging = (top: number, left: number) => {
    setIsDragging(false);
    changeNodeInLocalStorage("x", left, index);
    changeNodeInLocalStorage("y", top, index);

    const isStartPointConnectedToState =
      index === JSON.parse(localStorage.getItem("startPoint"))?.startNodeIndex;
    if (isStartPointConnectedToState) {
      saveStartPointPositionAfterMovingState(index);
    }
  };

  return (
    <StateNode
      handleStartDragging={handleStartDragging}
      handleStopDragging={handleStopDragging}
      savedAttributes={savedAttributes}
      isCreated={true}
      styleProps={
        isDragging
          ? {
              cursor: "grabbing",
              zIndex: 2,
              ...positionStyle,
            }
          : {
              transition: "box-shadow 300ms",
              zIndex: 1,
              cursor: isShiftPressed && "crosshair",
              ...positionStyle,
            }
      }
      index={index}
    />
  );
};
export default CreatedStateNode;
