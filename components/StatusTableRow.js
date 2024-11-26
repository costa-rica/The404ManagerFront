import { useState } from "react";
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

  return (
    <>
      <td>
        <span className={styles.spanAppName}>{props.elem.name}</span>
        <br />
        <span className={styles.spanAppProjectPath}>
          {props.elem.appProjectPath}
        </span>
      </td>
      <td>{props.elem?.port}</td>
      <td>
        <button
          style={{
            backgroundColor: appStatus == "inactive" ? null : "#4ad22b",
            borderRadius: "12px",
            padding: "0.25rem",
          }}
          onClick={() => toggleStatus(props.elem.name)}
        >
          {appStatus}
        </button>
      </td>
    </>
  );
}

// const styles = {
//   spanAppName: {
//     fontSize: "xx-large",
//     color: "#fa9f15",
//   },
//   spanAppProjectPath: {
//     color: "#888787",
//   },
// };
