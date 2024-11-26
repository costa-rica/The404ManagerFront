import styles from "../styles/NavigationBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.pathname;
  const user = useSelector((state) => state.user.value);
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  return (
    <nav className="nav-custom">
      <div className={styles.divHeaderTop}>
        <div className={styles.divHeaderTopLeft}>
          <h1 className={styles.h1AppName}>The 404 Server Manager</h1>
          <h2 className={styles.h2MachineName}>{user.machineName}</h2>
        </div>
        <div className={styles.divHeaderRight}>
          <button
            className={styles.hamburgerMenu}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <FontAwesomeIcon
              icon={faBars}
              style={{ fontSize: "xx-large", color: "white" }}
            />
          </button>
          <ul
            className={`${styles.divHeaderRightUl} ${
              menuOpen ? styles.menuOpen : ""
            }`}
          >
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
    </nav>
  );
}
