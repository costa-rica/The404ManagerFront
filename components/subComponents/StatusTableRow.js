import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function StatusTableRow(props) {
  const user = useSelector((state) => state.user.value);
  const [appStatus, appStatusSetter] = useState(
    props.elem.status == "online" ? "active" : "inactive"
  );
  const toggleStatus = async (appName) => {
    console.log(`- in toggleStatus: ${appName}`);
    if (appName == "The404ManagerBack") return;
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
      appStatusSetter(responseJson.status == "started" ? "active" : "inactive");
    } else {
      window.alert(
        responseJson?.message ? resJson.message : "There was a server error"
      );
    }
  };

  return (
    <>
      <td>
        <span style={styles.spanAppName}>{props.elem.name}</span>
        <br />
        <span style={styles.spanAppProjectPath}>
          {props.elem.appProjectPath}
        </span>
      </td>
      <td>{props.elem?.port}</td>
      <td>
        <button onClick={() => toggleStatus(props.elem.name)}>
          {appStatus}
        </button>
      </td>
    </>
  );
}

const styles = {
  spanAppName: {
    fontSize: "xx-large",
    color: "#fa9f15",
  },
  spanAppProjectPath: {
    color: "#888787",
  },
};
