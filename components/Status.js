import styles from "../styles/Status.module.css";
import { useState, useEffect } from "react";
import HeaderCustom from "./Header";

export default function Status() {
  // const [appsList, appsListSetter] = useState([]);
  const [appsList, appsListSetter] = useState(fauxReponse.appsList);

  const [appListRows, appListRowsSetter] = useState([]);

  // useEffect(() => {
  //   const appsListTemp = [];
  //   appsList.map((elem, index) => {
  //     let keyVal = `tr${index}`;
  //     console.log(keyVal);
  //     const stuff = (
  //       <tr key={keyVal}>
  //         <td>
  //           <span style={styles2.spanAppName}>{elem.name}</span>
  //           <br />
  //           <span style={styles2.spanAppProjectPath}>
  //             {elem.appProjectPath}
  //           </span>
  //         </td>
  //         <td>{elem?.port}</td>
  //         <td>
  //           <button onClick={() => toggleStatus(elem.name)}>
  //             {elem.status == "online" ? "active" : "inactive"}
  //           </button>
  //         </td>
  //       </tr>
  //     );

  //     appsListTemp.push(stuff);
  //   });
  //   appListRowsSetter(appsListTemp);
  // }, []);
  const toggleStatus = (appName) => {
    console.log(`- in toggleStatus: ${appName}`);
  };

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
          <tbody>
            {appsList.map((elem) => (
              <tr key={elem.id}>
                <td>
                  <span style={styles2.spanAppName}>{elem.name}</span>
                  <br />
                  <span style={styles2.spanAppProjectPath}>
                    {elem.appProjectPath}
                  </span>
                </td>
                <td>{elem?.port || "N/A"}</td>
                <td>
                  <button onClick={() => toggleStatus(elem.name)}>
                    {elem.status === "online" ? "active" : "inactive"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

const fauxReponse = {
  result: true,
  appsList: [
    {
      id: 0,
      name: "The404ManagerBack",
      status: "online",
      port: 8000,
      appProjectPath: "/home/dashanddata_user/applications/The404ManagerBack",
    },
    {
      id: 1,
      name: "DevelopmentWebApp",
      status: "online",
      appProjectPath: "/home/dashanddata_user/applications/DevelopmentWebApp",
    },
    {
      id: 2,
      name: "DevelopmentWebApp02",
      status: "stopped",
      port: 8002,
      appProjectPath: "/home/dashanddata_user/applications/DevelopmentWebApp02",
    },
    {
      id: 3,
      name: "StockPriceModel02",
      status: "stopped",
      port: 8003,
      appProjectPath: "/home/dashanddata_user/applications/StockPriceModel02",
    },
  ],
};

const styles2 = {
  spanAppName: {
    fontSize: "xx-large",
    color: "#fa9f15",
  },
  spanAppProjectPath: {
    color: "#888787",
  },
};
