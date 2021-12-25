import { useContext, useState } from "react";
import {
  DARK_MODE_BACKGROUND,
  DARK_MODE_BOX_SHADOW,
} from "../../constants/styleConstants";
import IsLightModeContext from "../../contexts/IsLightModeContext";
import styles from "./FsmExplanationPanel.module.scss";
import Image from "next/image";

interface IResource {
  text: string;
  href: string;
}

const RESOURCES: IResource[] = [
  {
    text: "MIT Prof Scott Aaronson’s lecture notes: Deterministic finite automata (DFAs) and nondeterministic finite automata (NFAs)",
    href: "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-045j-automata-computability-and-complexity-spring-2011/lecture-notes/MIT6_045JS11_lec03.pdf",
  },
  {
    text: "Wikipedia (probably the best resource for a quick introduction)",
    href: "https://en.wikipedia.org/wiki/Finite-state_machine",
  },
  {
    text: "If videos are your thing, this one from Neso Academy is great",
    href: "https://www.youtube.com/watch?v=Qa6csfkK7_I&t=535s",
  },
];

const LINK_HOVER_COLOR = "#4D7FEB";

const FsmExplanationPanel = () => {
  const isLightMode = useContext(IsLightModeContext);

  const [isMouseOverResource, setIsMouseOverResource] = useState<boolean[]>(
    Array(RESOURCES.length).fill(false)
  );

  const toggleLinkColor = (index: number) =>
    setIsMouseOverResource((prev) => [
      ...prev.slice(0, index),
      !prev[index],
      ...prev.slice(index + 1),
    ]);

  return (
    <div
      className={styles.panel}
      style={{
        backgroundColor: !isLightMode && DARK_MODE_BACKGROUND,
        color: !isLightMode && "white",
        boxShadow: !isLightMode && DARK_MODE_BOX_SHADOW,
      }}
    >
      <h3 style={{ textAlign: "center" }}>What is a Finite State Machine?</h3>
      <p>
        From Wikipedia: “A finite-state machine (FSM) or finite-state
        automaton (FSA, plural: automata), finite automaton, or simply a state
        machine, is a mathematical model of computation. It is an abstract
        machine that can be in exactly one of a finite number of states at any
        given time.”
      </p>

      <p>
        The FSM will transition from one state to another based on given inputs.
        For example, if we model a traffic light with an FSM.
      </p>

      <Image
        className={styles.image}
        src={"/traffic_light.PNG"}
        alt={"Finite state machine model of traffic light"}
        height={270}
        width={350}
      />

      <br />
      <p>
        Where the inputs are t=0, when no time has elapsed, and t=1, when enough
        time has elapsed for the traffic light to change states. The FSM
        communicates that if we are in state green, after t=1 amount of time we
        will be in the yellow state.
      </p>
      <p>
        Here are some resources if you’d like to read more:
        <br />
        <ul>
          {RESOURCES.map((resource, index) => (
            <>
              <li key={resource.href}>
                <a
                  onMouseEnter={() => toggleLinkColor(index)}
                  onMouseLeave={() => toggleLinkColor(index)}
                  style={{
                    color: isMouseOverResource[index]
                      ? LINK_HOVER_COLOR
                      : isLightMode
                      ? "black"
                      : "white",
                  }}
                  className={styles.resourceLink}
                  href={resource.href}
                  target="_blank"
                >
                  {resource.text}
                </a>
              </li>
              <br />
            </>
          ))}
        </ul>
      </p>
    </div>
  );
};

export default FsmExplanationPanel;
