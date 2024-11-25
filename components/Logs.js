import styles from "../styles/Status.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderCustom from "./Header";

export default function Logs() {
  const [logs, logsSetter] = useState([]);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/logs/combined`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Add token to Authorization header
          },
        }
      );
      const responseJson = await response.json();
      console.log("response: ");
      console.log(responseJson);
      const pm2CombinedOutput = (
        <div>
          <h1>pm2CombinedOutput</h1>
          <div>{responseJson.responseBody.pm2CombinedOutput}</div>
        </div>
      );
      const dataPm2CombinedError = (
        <div>
          <h1>dataPm2CombinedError</h1>
          <div>{responseJson.responseBody.dataPm2CombinedError}</div>
        </div>
      );
      const syslog = (
        <div>
          <h1>syslog</h1>
          <div>{responseJson.responseBody.syslog}</div>
        </div>
      );

      const combinedLogs = (
        <div>
          <div>{pm2CombinedOutput}</div>
          <div>{dataPm2CombinedError}</div>
          <div>{syslog}</div>
        </div>
      );
      // const logsTemp = responseJson.responseBody.map((elem, index) => {
      //   return <div>elem</div>;
      // });
      logsSetter(combinedLogs);
    })(); // end of async ()
  }, []);

  // const stuff = (
  //   <div className={styles.divTitles}>
  //     <h1 className={styles.title}>The 404 Server Manager</h1>
  //     {/* <h2>{user.machineName}</h2> */}
  //   </div>
  // );

  // const stuffArray = [];
  // for (let i = 0; i < 20; i++) {
  //   stuffArray.push(stuff);
  // }

  return (
    <main className={styles.mainStatus}>
      <HeaderCustom />
      <div className="restOfPage">
        <h1 style={{ backgroundColor: "red" }}>Logs Starts here</h1>
        <div className={styles.divMainSub}>Status page: </div>
        {logs}
      </div>
    </main>
  );
}
