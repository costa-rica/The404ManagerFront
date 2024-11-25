import styles from "../styles/Status.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../reducers/user";
// import { useHistory } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import HeaderCustom from "./Header";

export default function Logs() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [machineName, setMachineName] = useState("");
  // const dispatch = useDispatch();
  // const router = useRouter();
  // const user = useSelector((state) => state.user.value);

  useEffect(() => {
    console.log(
      `process.env.NEXT_PUBLIC_API_BASE_URL: ${process.env.NEXT_PUBLIC_API_BASE_URL}`
    );

    document.title = "Server Manager";
  }, []); // The empty array ensures this runs only on mount

  const stuff = (
    <div className={styles.divTitles}>
      <h1 className={styles.title}>The 404 Server Manager</h1>
      {/* <h2>{user.machineName}</h2> */}
    </div>
  );

  const stuffArray = [];
  for (let i = 0; i < 20; i++) {
    stuffArray.push(stuff);
  }

  return (
    <main className={styles.mainStatus}>
      <HeaderCustom />
      <div className="restOfPage">
        <h1 style={{ backgroundColor: "red" }}>Logs Starts here</h1>
        <div className={styles.divMainSub}>Status page: {stuffArray}</div>
      </div>
    </main>
  );
}
