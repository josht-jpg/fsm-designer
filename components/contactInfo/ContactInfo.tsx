import { useContext } from "react";
import styles from "./ContactInfo.module.scss";
import IsLightModeContext from "../../contexts/IsLightModeContext";

const ContactInfo = () => {
  const isLightMode = useContext(IsLightModeContext);

  return (
    <p
      className={styles.contactInfo}
      style={{ color: !isLightMode && "white" }}
    >
      Built by{" "}
      <a
        className={styles.link}
        style={{ color: !isLightMode && "white" }}
        href={"https://www.joshuataylor.blog/"}
        target={"_blank"}
      >
        Joshua Taylor
      </a>
      .
    </p>
  );
};

export default ContactInfo;
