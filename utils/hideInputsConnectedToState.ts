import * as d3 from "d3";
import getAllElementsByType from "./getAllElementsByType";
import deleteInputFromStorage from "./localStorage/deleteInput";
import statesConnectedToElement from "./statesConnectedToElement";

const isPathConnectedToState = (index: number, lineId: string) => {
  const statesConnectedToInput = lineId.match(/^\d+|\d+\b|\d+(?=\w)/g);
  if (!!statesConnectedToInput) {
    const originState = parseInt(statesConnectedToInput[0]);
    const destinationState = parseInt(statesConnectedToInput[1]);

    return (
      lineId.startsWith(`selfLoopOnNode${index}`) ||
      ((originState === index || destinationState === index) &&
        !lineId.includes("selfLoop"))
    );
  }
};

const hidePaths = (index: number) =>
  getAllElementsByType("path").map((line: any) => {
    const id = line.getAttribute("id") ?? "";
    if (isPathConnectedToState(index, id)) {
      d3.select("#" + id).attr("visibility", "hidden");
      deleteInputFromStorage(id);
    }
  });

const hideText = (index: number) => {
  getAllElementsByType("text").map((text: any) => {
    const { originState, destinationState } = statesConnectedToElement(
      text.getAttribute("id")
    );

    if (index === originState || index === destinationState) {
      text.remove();
    }
  });

  getAllElementsByType("p").map((text: any) => {
    const id = text?.getAttribute("id");
    if (!!id) {
      const { originState, destinationState } = statesConnectedToElement(
        text.getAttribute("id")
      );

      if (originState === index || destinationState === index) {
        text.style.visibility = "hidden";
      }

      if (
        id.startsWith(`textselfLoopOnNode${index}`) ||
        id === `lineStartTo${index}Text`
      ) {
        text.remove();
      }
    }
  });
};

const hideStartCircle = (index: number, handleRemoveStartState: () => void) =>
  Array.from(d3.selectAll("circle")._groups[0])?.map((circle: any) => {
    const id = circle.getAttribute("id");

    if (
      !id?.startsWith("stateNode") &&
      parseInt(id?.match(/^\d+|\d+\b|\d+(?=\w)/g)?.[0]) === index
    ) {
      handleRemoveStartState();
      localStorage.removeItem("startPoint");
    }
  });

const hideInputsConnectedToState = (
  index: number,
  handleRemoveStartState: () => void
) => {
  hidePaths(index);
  hideText(index);
  hideStartCircle(index, handleRemoveStartState);
};

export default hideInputsConnectedToState;
