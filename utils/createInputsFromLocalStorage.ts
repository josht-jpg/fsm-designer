import * as d3 from "d3";
import { MAIN_SVG_ID } from "../constants/ids";
import removeWhiteSpace from "./removeWhiteSpace";

const createMarker = (input) =>
  d3
    .select(`#${MAIN_SVG_ID}`)
    .append("marker")
    .attr("id", input.id + "marker")
    .attr("refY", "3")
    .attr("refX", "5.8")
    .attr("markerUnits", "strokeWidth")
    .attr("markerHeight", "6")
    .attr("markerWidth", "6")
    .attr("orient", "auto")
    .append("path")
    .attr("id", input.id.replace("Number", "Arrow"))
    .attr("class", "arrow")
    .attr("d", "M 0 0 L 6 3 L 0 6 z")
    .attr("fill", input.color ?? "gray")
    .attr("opacity", "0.9");

const createPath = (input, isLightMode: boolean) =>
  d3
    .select(`#${MAIN_SVG_ID}`)
    .append("path")
    .attr("id", input.id)
    .attr("class", "input")
    .attr("d", input.d)
    .attr("marker-end", `url(#${input.id}marker)`)
    .attr("stroke", removeWhiteSpace(input.color) ?? "gray")
    .attr("opacity", isLightMode ? "0.4" : "0.7")
    .attr("filter", "drop-shadow(2px 2px 2px rgb(0 0 0 / 0.2))")
    .attr("stroke-width", "3px")
    .attr("width", "3px")
    .attr("fill", "none")
    .attr("cursor", "pointer");

const createInputsFromLocalStorage = (isLightMode: boolean) =>
  (JSON.parse(localStorage.getItem("inputs")) ?? []).map((input) => {
    createMarker(input);
    createPath(input, isLightMode);
  });

export default createInputsFromLocalStorage;
