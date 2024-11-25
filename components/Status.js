import styles from "../styles/Status.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducers/user";
import { useRouter } from "next/router";
import HeaderCustom from "./Header";
import StatusTableRow from "./subComponents/StatusTableRow";

export default function Status() {
  const [appsList, appsListSetter] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/status/list-apps`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`, // Add token to Authorization header
            },
          }
        );
        const responseJson = await response.json();
        console.log(responseJson);

        appsListSetter(responseJson.appsList);
      } catch {
        console.error("Error fetching data:");
        dispatch(setMachineNameRedux("failed to get API response"));
      }
    })();
  }, []);
  const toggleStatus = (appName) => {
    console.log(`- in toggleStatus: ${appName}`);
  };
  const appListRows = [];
  appsList.map((elem, index) => {
    const stuff = (
      <tr>
        <StatusTableRow elem={elem} />
      </tr>
    );

    appListRows.push(stuff);
  });

  return (
    <main className={styles.mainStatus}>
      <HeaderCustom />
      <div className="restOfPage">
        <table className={styles.tableStyle}>
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
