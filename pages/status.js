import styles from "../styles/Status.module.css";
import { useState, useEffect } from "react";
import StatusTableRow from "../components/StatusTableRow";
import { useDispatch, useSelector } from "react-redux";
import TemplateView from "../components/TemplateView";

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
      if (response.status == 200) {
        const resJson = await response.json();
        // const appsListTemp = resJson.appsList.map((elem, index) => {
        const appsListTemp = resJson.appsListFromDb.map((elem, index) => {
          return (
            <tr key={`tr${index}`}>
              <StatusTableRow elem={elem} />
            </tr>
          );
        });
        appListRowsSetter(appsListTemp);
        console.log("-- resJson.appsList --");
        // console.log(resJson.appsList);
        console.log(resJson.appsListFromDb);
      } else {
        window.alert(`There was a server error: ${response.status}`);
      }
    })(); // end of async ()
  }, []);

  return (
    // <main className={styles.mainStatus}>
    //   <HeaderCustom />
    <TemplateView>
      <div className={styles.mainStatus}>
        <div className={styles.divTable}>
          <table className={styles.tableStyle}>
            <thead>
              <tr>
                <th>App name</th>
                <th className={styles.thPort}>Port</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{appListRows}</tbody>
          </table>
        </div>
      </div>
    </TemplateView>
    // </main>
  );
}
