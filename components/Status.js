import styles from "../styles/Status.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducers/user";
// import { useHistory } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import HeaderCustom from "./Header";

export default function Status() {
  const [appsList, appsListSetter] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/status/list-apps`
        );
        const responseJson = await response.json();
        console.log(responseJson);

        appsListSetter(responseJson.appsList);
      } catch {
        console.error("Error fetching data:");
        dispatch(setMachineNameRedux("failed to get API response"));
      }
    })();

    document.title = "Server Manager";
  }, []); // The empty array ensures this runs only on mount

  const appListRows = [];
  appsList.map((elem, index) => {
    const stuff = (
      <tr>
        <td>{elem.name}</td>
        <td>{elem?.port}</td>
        <td>{elem.status}</td>
      </tr>
    );

    appListRows.push(stuff);
  });

  return (
    <main className={styles.mainStatus}>
      <HeaderCustom />
      <div className="restOfPage">
        <h1 style={{ backgroundColor: "red" }}>Status Starts here</h1>
        <table>
          <tr>
            <th>App name</th>
            <th>Port</th>
            <th>Status</th>
          </tr>

          {appListRows}
        </table>
      </div>
    </main>
  );
}
