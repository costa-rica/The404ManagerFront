import styles from "../styles/Status.module.css";
import { useState, useEffect } from "react";
import HeaderCustom from "./Header";
import StatusTableRow from "./subComponents/StatusTableRow";
import { useDispatch, useSelector } from "react-redux";

export default function Status() {
  const [appsList, appsListSetter] = useState([]);
  // const [appsList, appsListSetter] = useState(fauxReponse.appsList);

  const [appListRows, appListRowsSetter] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    (async () => {
      console.log(`sendign this token: ${user.token}`);

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
      // await appsListSetter(responseJson.appsList);

      const appsListTemp = [];
      // await appsList.map((elem, index) => {
      //   const stuff = (
      //     <tr key={`tr${index}`}>
      //       {/* <StatusTableRow key={index} elem={elem} /> */}

      //       <td>
      //         <span style={styles.spanAppName}>{elem.name}</span>
      //         <br />
      //         <span style={styles.spanAppProjectPath}>
      //           {elem.appProjectPath}
      //         </span>
      //       </td>
      //       <td>{elem?.port}</td>
      //       <td>
      //         <button onClick={() => toggleStatus(elem.name)}>
      //           {/* {appStatus} */}
      //           {elem.status == "online" ? "active" : "inactive"}
      //         </button>
      //       </td>
      //     </tr>
      //   );

      //   appsListTemp.push(stuff);
      // });

      // await appListRowsSetter(
      //   responseJson.appsList[0].name
      //     ? responseJson.appsList[0].name
      //     : "Did not get here in time"
      // );
      // await appListRowsSetter(appsListTemp);

      responseJson.appsList.map((elem, index) => {
        appsListTemp.push(
          <tr key={`tr${index}`}>
            <StatusTableRow elem={elem} />
            {/* <td>
              <span style={styles2.spanAppName}>{elem.name}</span>
              <br />
              <span style={styles2.spanAppProjectPath}>
                {elem.appProjectPath}
              </span>
            </td>
            <td>{elem.port}</td>
            <td>{elem.name}</td> */}
          </tr>
        );
      });
      console.log("--- > finished fauxReponse.appsList.map");
      appListRowsSetter(appsListTemp);
    })(); // end of async ()
  }, []);

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
          <tbody>{appListRows}</tbody>
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
