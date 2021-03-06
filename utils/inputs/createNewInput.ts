import * as d3 from "d3";
import { MAIN_SVG_ID } from "../../constants/ids";
import { CONSTRUCTION_INPUT_CONTAINER_ID } from "../../constants/inputConstants";
import selectByIdPrefix from "../selectByIdPrefix";

const createNewInput = (id: string, isLightMode: boolean) => {
  createMarker(id);

  const drawnLine = d3
    .select(selectByIdPrefix(CONSTRUCTION_INPUT_CONTAINER_ID))
    .select("line");

  const d = `M ${drawnLine.node().x1.baseVal.value} ${
    drawnLine.node().y1.baseVal.value
  } Q ${drawnLine.node().x2.baseVal.value} ${
    drawnLine.node().y2.baseVal.value
  } ${drawnLine.node().x2.baseVal.value} ${drawnLine.node().y2.baseVal.value}`;

  createPath(id, d, isLightMode);

  saveInputInStorage(id, d);
};

export default createNewInput;

const createMarker = (id: string) =>
  d3
    .select(`#${MAIN_SVG_ID}`)
    .append("marker")
    .attr("id", id + "marker")
    .attr("refY", "3")
    .attr("refX", "5.8")
    .attr("markerUnits", "strokeWidth")
    .attr("markerHeight", "6")
    .attr("markerWidth", "6")
    .attr("orient", "auto")
    .append("path")
    .attr("id", id.replace("Number", "Arrow"))
    .attr("class", "arrow")
    .attr("d", "M 0 0 L 6 3 L 0 6 z")
    .attr("fill", "gray")
    .attr("opacity", "0.9");

const createPath = (id: string, d: string, isLightMode: boolean) =>
  d3
    .select(`#${MAIN_SVG_ID}`)
    .append("path")
    .attr("id", id)
    .attr("class", "input")
    .attr("d", d)
    .attr("marker-end", `url(#${id}marker)`)
    .attr("stroke", "gray")
    .attr("opacity", isLightMode ? "0.4" : "0.7")
    .attr("filter", "drop-shadow(2px 2px 2px rgb(0 0 0 / 0.2))")
    .attr("stroke-width", "3px")
    .attr("width", "3px")
    .attr("fill", "none")
    .attr("cursor", "pointer");

const saveInputInStorage = (id: string, d: string) =>
  localStorage.setItem(
    "inputs",
    JSON.stringify([
      ...(JSON.parse(localStorage.getItem("inputs")) ?? []),
      { id, d },
    ])
  );
