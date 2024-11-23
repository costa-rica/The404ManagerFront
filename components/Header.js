import styles from "../styles/Header.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function HeaderCustom() {
  const router = useRouter();
  const currentPath = router.pathname;
  //   const [currentPath, setCurrentPath] = useState(router.pathname);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  console.log("currentPath: ", currentPath);
  useEffect(() => {
    console.log(
      `process.env.NEXT_PUBLIC_API_BASE_URL: ${process.env.NEXT_PUBLIC_API_BASE_URL}`
    );

    document.title = "Server Manager";
  }, []); // The empty array ensures this runs only on mount

  return (
    // <div className={styles.mainHeader}>
    <div className="header-custom">
      <div className={styles.divHeaderTop}>
        <div className={styles.divHeaderTopLeft}>
          <h1 className={styles.h1AppName}>The 404 Server Manager</h1>
          <h2 className={styles.h2MachineName}>{user.machineName}</h2>
        </div>
        <div className={styles.divHeaderRight}>
          <ul className={styles.divHeaderRightUl}>
            <li>
              <a
                className={
                  currentPath === "/status"
                    ? styles.btnNavActive
                    : styles.btnNav
                }
                href="/status"
              >
                Status
              </a>
            </li>
            <li>
              <a
                className={
                  currentPath === "/logs" ? styles.btnNavActive : styles.btnNav
                }
                href="/logs"
              >
                Logs
              </a>
            </li>
            <li>
              <a
                className={
                  currentPath === "/create"
                    ? styles.btnNavActive
                    : styles.btnNav
                }
                href="/create"
              >
                Create
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.divLine}></div>
    </div>
  );
}
