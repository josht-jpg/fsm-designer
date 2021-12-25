import { useContext, useState } from "react";
import CreateNodeContext from "../../contexts/CreateNodeContext";
import IsDraggingContext from "../../contexts/IsDraggingContext";
import StateNodeContext from "../../contexts/StateNodeContext";
import CreatedStateNode from "../FSMpieces/stateNode/CreatedStateNode";
import StateNode from "../FSMpieces/stateNode/StateNode";

interface UncreatedStateNodeProps {
  addStateNode: () => void;
}

const UncreatedStateNode: React.FC<UncreatedStateNodeProps> = ({
  addStateNode,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const isNodeCreated = useContext(StateNodeContext);
  const setCreatedNodes = useContext(CreateNodeContext);
  const setIsDraggingGlobalState = useContext(IsDraggingContext);

  const handleStartDragging = () => {
    setIsDragging(true);
    setIsDraggingGlobalState(true);
    addStateNode();
  };

  const [closeNode, setCloseNode] = useState(false);

  const handleStopDragging = (top: number, left: number) => {
    if (isNodeCreated) {
      setCreatedNodes((prev) => {
        const nodes = [
          ...prev,
          <CreatedStateNode
            x={left}
            y={top}
            index={prev.length}
            savedAttributes={undefined}
          />,
        ];
        localStorage.setItem(
          "stateNodes",
          JSON.stringify([
            ...(JSON.parse(localStorage.getItem("stateNodes")) ?? []),
            { x: left, y: top },
          ])
        );

        return nodes;
      });
      setCloseNode(true);
    }
    setIsDraggingGlobalState(false);
    setIsDragging(false);
  };

  if (closeNode) {
    return <></>;
  }

  const marginLeft = "-37px";

  return (
    <StateNode
      handleStartDragging={handleStartDragging}
      handleStopDragging={handleStopDragging}
      isCreated={false}
      styleProps={
        isDragging
          ? {
              cursor: "grabbing",
              zIndex: 2,
              marginLeft,
            }
          : {
              transition: "300ms",
              zIndex: 1,
              marginLeft,
            }
      }
    />
  );
};
export default UncreatedStateNode;
