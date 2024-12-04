import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/StatusTableRow.module.css";

export default function StatusTableRow(props) {
  const user = useSelector((state) => state.user.value);
  const [appStatus, appStatusSetter] = useState(
    // props.elem.appName.includes("The404") ? props.elem.status == "online" ? "active" : "inactive"
    props.elem.status == "online" ? "active" : "inactive"
  );
  const [additionalRowsVisible, additionalRowsVisibleSetter] = useState(false);
  const toggleAdditionalRowsVisible = () => {
    console.log("--> toggling");
    additionalRowsVisibleSetter((prev) => !prev);
  };
  const toggleStatus = async (appName) => {
    console.log(`- in toggleStatus: ${appName}`);
    console.log(
      'props.elem.name.includes("The404"): ',
      props.elem.name.includes("The404")
    );
    // if (appName == "The404ManagerBack") return;
    const bodyObj = {
      appName: props.elem.appName,
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

  let listOfInnerElements = [];

  let counter = 0;
  for (let item of props.elem.innerListObjects) {
    listOfInnerElements.push(
      <div key={counter}>
        <div className={styles.divAddContentTitle}>filename:</div>
        <div className={styles.divAddContent}>{item.filename}</div>
      </div>
    );
    counter++;
  }

  return (
    <>
      <td>
        <div className={styles.tdDivNameOfApp}>{props.elem.nameOfApp}</div>
        <div className={styles.additionalContent}></div>
      </td>
      <td className={styles.tdPort}>{props.elem.port}</td>
      <td className={styles.tdBtnStatus}>
        <button className={styles.btnStatus}>{props.elem.status}</button>
      </td>
    </>
  );
}
