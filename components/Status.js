import styles from "../styles/Status.module.css";
import { useState, useEffect } from "react";
import HeaderCustom from "./Header";
import StatusTableRow from "./subComponents/StatusTableRow";
import { useDispatch, useSelector } from "react-redux";

export default function Status() {
  const [appListRows, appListRowsSetter] = useState([]);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    (async () => {
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
      const appsListTemp = responseJson.appsList.map((elem, index) => {
        return (
          <tr key={`tr${index}`}>
            <StatusTableRow elem={elem} />
          </tr>
        );
      });
      appListRowsSetter(appsListTemp);
    })(); // end of async ()
  }, []);

  return (
    <main className={styles.mainStatus}>
      <HeaderCustom />
      <div className="restOfPage">
        <table className={styles.tableStyle}>
          <thead>
            <tr>
              <th>App name</th>
              <th>Port</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{appListRows}</tbody>
        </table>
      </div>
    </main>
  );
}
