import React, { useState } from "react";
import Head from "next/head";
import EditorPanel from "./editorPanel/EditorPanel";
import StateNodeContext from "../contexts/StateNodeContext";
import CreateNodeContext from "../contexts/CreateNodeContext";
import IsDraggingContext from "../contexts/IsDraggingContext";
import IsShiftKeyPressedContext from "../contexts/IsShiftKeyPressed";
import { useEffect } from "react";
import Input from "./FSMpieces/input/Input";
import CreateInputContext from "../contexts/CreateInputContext";
import IsLightModeContext from "../contexts/IsLightModeContext";
import MouseOverNodeContext from "../contexts/MouseOverNodeContenxt";
import indexOfStateMouseIsOverContext from "../contexts/indexOfStateMouseIsOver";
import { useRef } from "react";
import * as d3 from "d3";
import MainSvgOffSetContext from "../contexts/MainSvgOffSet";
import StartStateContext from "../contexts/StartStateContext";
import startInputId from "../utils/startInputId";
import HowTo from "./howTo/HowTo";
import useCreateStatesFromLocalStorage from "../hooks/useCreateStatesFromLocalStorage";
import createInputsFromLocalStorage from "../utils/createInputsFromLocalStorage";
import DarkModeToggle from "./darkModeToggle/DarkModeToggle";
import EditArea from "./edtiArea/EditArea";
import FsmExplanationPanel from "./fsmExplanationPanel/FsmExplanationPanel";
import getAllElementsByType from "../utils/getAllElementsByType";

type createInput = {
  x: number;
  y: number;
  startNodeIndex: number;
};

interface LayoutProps {
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ title = "FSM Builder" }) => {
  const [isMouseInEditArea, setIsMouseInEditArea] = useState(false);

  const [stateNodes, setStateNodes] = useState([]);

  const [isStateNodeDragging, setIsStateNodeDragging] = useState(false);

  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) =>
      e.code?.includes("Shift") && setIsShiftPressed(true);
    document.addEventListener("keydown", handleKeyDown);

    const handleKeyup = (e: KeyboardEvent) => {
      if (e.code?.includes("Shift")) {
        setIsShiftPressed(false);
        setCreateInput(undefined);
      }
    };
    document.addEventListener("keyup", handleKeyup);

    document.body.style.transition = "background-color 300ms";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyup);
    };
  }, []);

  const [createInput, setCreateInput] = useState<createInput | undefined>(
    undefined
  );

  const [mainSvgOffSet, setMainSvgOffSet] = useState<any>(undefined);
  const mainSvgRef = useRef<any>();

  useEffect(() => {
    setMainSvgOffSet({
      x: mainSvgRef?.current?.getBoundingClientRect().left,
      y: mainSvgRef?.current?.getBoundingClientRect().top,
    });
  }, [mainSvgRef, setMainSvgOffSet]);

  const [mouseOverNodePosition, setMouseOverNodePosition] = useState(undefined);

  const [constructionInput, setConstructionInput] = useState<any>();

  const createdInputIdsState = useState<string[]>([]);
  const [createdInputIds, setCreatedInputIds] = createdInputIdsState;

  const startIndexState = useState<number | undefined>();
  const [startIndex, setStartIndex] = startIndexState;

  useEffect(() => {
    setStateNodes(useCreateStatesFromLocalStorage());
  }, [setStateNodes]);

  useEffect(() => {
    const startPoint = JSON.parse(localStorage.getItem("startPoint"));
    if (!!startPoint) {
      setStartIndex(startPoint.startNodeIndex);
    }
  }, [setStartIndex]);

  useEffect(() => {
    createInputsFromLocalStorage(isLightMode);
    setCreatedInputIds(
      (JSON.parse(localStorage.getItem("inputs")) ?? []).map(
        (input) => "#" + input.id
      )
    );
  }, [mainSvgRef, setCreatedInputIds]);

  useEffect(() => {
    if (startIndex !== undefined) {
      setCreatedInputIds((prev) =>
        !prev.includes(startInputId(startIndex))
          ? [...prev, startInputId(startIndex)]
          : prev
      );
    } else {
      setCreatedInputIds((prev) =>
        prev.filter((id) => id !== startInputId(startIndex))
      );
    }
  }, [startIndex, setCreatedInputIds]);

  useEffect(() => {
    if (isShiftPressed && createInput) {
      setConstructionInput(
        <Input
          startPosition={{ x: createInput.x, y: createInput.y }}
          startNodeIndex={createInput.startNodeIndex}
          setConstructionInput={setConstructionInput}
          createdInputIdsState={createdInputIdsState}
        />
      );
      setCreateInput(undefined);
    }
  }, [
    isShiftPressed,
    createInput,
    mouseOverNodePosition,
    createInput?.x,
    createInput?.y,
  ]);

  const [isLightMode, setIsLightMode] = useState(true);

  useEffect(() => {
    document.body.style.backgroundColor = isLightMode
      ? "white"
      : "hsl(210deg, 30%, 8%)";

    const changeTextColor = () =>
      //getAllElementsByType
      Array.from(d3.selectAll("text")._groups[0])?.map((text: any) => {
        if (text.getAttribute("fill") === "black" && !isLightMode) {
          text.setAttribute("fill", "white");
        } else if (text.getAttribute("fill") === "white" && isLightMode) {
          text.setAttribute("fill", "black");
        }
      });

    const changeLineOpacity = () => {
      getAllElementsByType("path")?.map((line: any) => {
        if (line.getAttribute("class") === "input") {
          if (isLightMode) {
            line.setAttribute("opacity", "0.4");
          } else {
            line.setAttribute("opacity", "0.7");
          }
        }
      });
    };

    changeTextColor();
    changeLineOpacity();
  }, [isLightMode]);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
          rel="stylesheet"
        />
      </Head>

      <main
        id="main"
        style={{
          display: "flex",
          transition: "350ms",
        }}
      >
        <CreateNodeContext.Provider value={setStateNodes}>
          <StateNodeContext.Provider value={isMouseInEditArea}>
            <IsDraggingContext.Provider value={setIsStateNodeDragging}>
              <IsShiftKeyPressedContext.Provider value={isShiftPressed}>
                <CreateInputContext.Provider value={setCreateInput}>
                  <IsLightModeContext.Provider value={isLightMode}>
                    <MouseOverNodeContext.Provider
                      value={setMouseOverNodePosition}
                    >
                      <indexOfStateMouseIsOverContext.Provider
                        value={mouseOverNodePosition}
                      >
                        <MainSvgOffSetContext.Provider value={mainSvgOffSet}>
                          <StartStateContext.Provider value={startIndexState}>
                            <DarkModeToggle
                              isLightMode={isLightMode}
                              setIsLightMode={setIsLightMode}
                            />
                            <EditorPanel />
                            <FsmExplanationPanel />
                            <HowTo />
                            <EditArea
                              setIsMouseInEditArea={setIsMouseInEditArea}
                              mainSvgRef={mainSvgRef}
                              constructionInput={constructionInput}
                              createdInputIds={createdInputIds}
                              stateNodes={stateNodes}
                              cursor={
                                isStateNodeDragging
                                  ? "grabbing"
                                  : isShiftPressed && createInput && "crosshair"
                              }
                            />
                          </StartStateContext.Provider>
                        </MainSvgOffSetContext.Provider>
                      </indexOfStateMouseIsOverContext.Provider>
                    </MouseOverNodeContext.Provider>
                  </IsLightModeContext.Provider>
                </CreateInputContext.Provider>
              </IsShiftKeyPressedContext.Provider>
            </IsDraggingContext.Provider>
          </StateNodeContext.Provider>
        </CreateNodeContext.Provider>
      </main>
    </div>
  );
};

export default Layout;
