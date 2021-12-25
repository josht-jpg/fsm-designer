import styles from "./EditorPanel.module.scss";
import { useContext, useEffect, useState } from "react";
import UncreatedStateNode from "./UncreatedStateNode";
import IsLightModeContext from "../../contexts/IsLightModeContext";
import AddStateMachine from "./addStateMachine/AddStateMachine";
import {
  DARK_MODE_BACKGROUND,
  DARK_MODE_BOX_SHADOW,
} from "../../constants/styleConstants";

const EditorPanel = () => {
  const addStateNode = () =>
    setNodes((prev) => [
      ...prev,
      <UncreatedStateNode addStateNode={addStateNode} />,
    ]);

  const [nodes, setNodes] = useState([
    <UncreatedStateNode addStateNode={addStateNode} />,
  ]);

  const isLightMode = useContext(IsLightModeContext);

  const [stateMachines, setStateMachines] = useState([]);

  useEffect(() => {
    setStateMachines(JSON.parse(localStorage.getItem("stateMachines")) ?? []);
  }, [setStateMachines]);

  const [showAddStateMachine, setShowAddStateMachine] = useState(false);

  const handleAddStateMachine = (newStateMachine: string) => {
    localStorage.setItem(
      "stateMachines",
      JSON.stringify([...stateMachines, newStateMachine])
    );
    localStorage.setItem("currentStateMachine", newStateMachine);
    setStateMachines((prev) => [...prev, newStateMachine]);
    setShowAddStateMachine(false);
  };

  return (
    <>
      {showAddStateMachine && (
        <AddStateMachine
          handleAddStateMachine={handleAddStateMachine}
          handleClose={() => setShowAddStateMachine(false)}
        />
      )}
      <div
        className={styles.editorPanel}
        style={{
          backgroundColor: !isLightMode && DARK_MODE_BACKGROUND,
          color: !isLightMode && "white",
          boxShadow: !isLightMode && DARK_MODE_BOX_SHADOW,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h3>Add a State</h3>
          {nodes}
        </div>
      </div>
    </>
  );
};

export default EditorPanel;
