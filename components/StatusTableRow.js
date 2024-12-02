import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/StatusTableRow.module.css";

export default function StatusTableRow(props) {
  const user = useSelector((state) => state.user.value);
  const [appStatus, appStatusSetter] = useState(
    // props.elem.appName.includes("The404") ? props.elem.status == "online" ? "active" : "inactive"
    props.elem.status == "online" ? "active" : "inactive"
  );
  const toggleStatus = async (appName) => {
    console.log(`- in toggleStatus: ${appName}`);
    console.log(
      'props.elem.name.includes("The404"): ',
      props.elem.name.includes("The404")
    );
    // if (appName == "The404ManagerBack") return;
    const bodyObj = {
      appName: props.elem.name,
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/status/toggle-app`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // Add token to Authorization header
        },
        body: JSON.stringify(bodyObj),
      }
    );

    if (response.status == 200) {
      const responseJson = await response.json();
      console.log(responseJson);
      appStatusSetter(
        props.elem.name.includes("The404")
          ? responseJson.status == "restarted"
            ? "restarted"
            : "inactive"
          : responseJson.status == "started"
          ? "active"
          : "inactive"
      );
    } else {
      window.alert(`There was a server error: ${response.status}`);
    }
  };

  useEffect(() => {
    // Use the dynamically generated class name
    const toggleCells = document.querySelectorAll(`.${styles.toggleCell}`);

    toggleCells.forEach((cell) => {
      cell.addEventListener("click", () => {
        cell.classList.toggle(styles.show); // Use the dynamically generated "show" class
        console.log("toggle in useEffect body");
      });
    });

    // Cleanup listeners on component unmount
    return () => {
      toggleCells.forEach((cell) => {
        cell.removeEventListener("click", () => {
          cell.classList.toggle(styles.show);
          console.log("toggle in useEffect return");
        });
      });
    };
  }, []);

  return (
    <>
      <td className={styles.toggleCell}>
        <span className={styles.spanAppName}>{props.elem.name}</span>
        <br />

        <div className={styles.additionalContent}>
          {" "}
          <span className={styles.spanAppProjectPath}>
            {props.elem.appProjectPath}
          </span>
          <div className={styles.divAddContentTitle}>App urls:</div>
          <div className={styles.divAddContent}>{props.elem.urls}</div>
          <div className={styles.divAddContentTitle}>Local IP & port:</div>
          <div className={styles.divAddContent}>
            {props.elem.localIp}: {props.elem.port}
          </div>
        </div>
      </td>
      <td className={styles.tdPort}>{props.elem?.port}</td>
      <td className={styles.tdBtnStatus}>
        <button
          style={{
            backgroundColor: appStatus == "inactive" ? null : "#4ad22b",
            // borderRadius: "12px",
            // padding: "0.25rem",
          }}
          className={styles.btnStatus}
          onClick={() => toggleStatus(props.elem.name)}
        >
          {appStatus}
        </button>
      </td>
    </>
  );
}
