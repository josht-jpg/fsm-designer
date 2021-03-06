import * as d3 from "d3";
import { MAIN_SVG_ID } from "../constants/ids";
import {
  INPUTS_LOCAL_STORAGE_KEY,
  TEXT_POSITION_CONSTANTS,
} from "../constants/inputConstants";
import getCoordinatesOfPath from "./getCoordinates";
import isPathCurved from "./isPathCurved";
import removeWhiteSpace from "./removeWhiteSpace";

const INPUT_ATTRIBUTES_CONSTANTS = {
  NAME: "name",
  COLOR: "color",
  TEXT_COLOR: "textColor",
};

export const inputTextPosition = (line) => {
  const { x1, y1, x2, y2, c1, c2 } = getCoordinatesOfPath(line.attr("d"));

  const x = isPathCurved(x2, c1, y2, c2) ? (x1 + x2 + c1) / 3 : (x1 + x2) / 2;
  const y = isPathCurved(x2, c1, y2, c2)
    ? (y1 + y2 + c2 * TEXT_POSITION_CONSTANTS.C2_MULTIPLIER) /
      TEXT_POSITION_CONSTANTS.Y_DIVISOR
    : (y1 + y2) / 2;

  return {
    left: x + document.getElementById(MAIN_SVG_ID).getBoundingClientRect().left,
    top: y,
  };
};

export const removeInputFromStorage = (inputId: string) =>
  localStorage.setItem(
    INPUTS_LOCAL_STORAGE_KEY,
    JSON.stringify(
      JSON.parse(localStorage.getItem(INPUTS_LOCAL_STORAGE_KEY)).filter(
        (input) => input.id !== inputId
      )
    )
  );

export const changeInputColor = (inputId: string, color: string) => {
  d3.select(inputId).attr("stroke", removeWhiteSpace(color));
  d3.select(inputId.replace("line", "path")).attr(
    "fill",
    removeWhiteSpace(color)
  );
  d3.select(inputId.replace("Number", "Arrow")).attr(
    "fill",
    removeWhiteSpace(color)
  );
  d3.select(inputId.replace("Number", "Circle")).attr(
    "fill",
    removeWhiteSpace(color)
  );
  changeInputColorInStorage(inputId.replace("#", ""), color);
};

const getInputAttributeFromStorage = (inputId: string, attribute: string) =>
  JSON.parse(localStorage.getItem(INPUTS_LOCAL_STORAGE_KEY))?.find(
    (input) => input.id === inputId
  )?.[attribute] ?? "";

export const getInputNameFronStorage = (inputId: string) =>
  JSON.parse(localStorage.getItem(INPUTS_LOCAL_STORAGE_KEY))?.find(
    (input) => input.id === inputId
  )?.name ?? "";

export const getInputTextColorFromStorage = (inputId: string) =>
  getInputAttributeFromStorage(inputId, INPUT_ATTRIBUTES_CONSTANTS.TEXT_COLOR);

export const changeInputNameInStorage = (inputId: string, newName: string) =>
  changeInputAttributeInStorage(
    INPUT_ATTRIBUTES_CONSTANTS.NAME,
    newName,
    inputId
  );

export const changeInputColorInStorage = (inputId: string, color: string) =>
  changeInputAttributeInStorage(
    INPUT_ATTRIBUTES_CONSTANTS.COLOR,
    color,
    inputId
  );

export const changeInputTextColorInStorage = (
  inputId: string,
  textColor: string
) =>
  changeInputAttributeInStorage(
    INPUT_ATTRIBUTES_CONSTANTS.TEXT_COLOR,
    textColor,
    inputId
  );

const changeInputAttributeInStorage = (
  attributeToChange: string,
  newAttribute: any,
  inputId: string
) =>
  localStorage.setItem(
    INPUTS_LOCAL_STORAGE_KEY,
    JSON.stringify(
      (JSON.parse(localStorage.getItem(INPUTS_LOCAL_STORAGE_KEY)) ?? []).map(
        (input) => {
          if (input.id === inputId) {
            input[attributeToChange] = newAttribute;
            return input;
          } else {
            return input;
          }
        }
      )
    )
  );
