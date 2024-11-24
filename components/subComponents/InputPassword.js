import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { savePassword } from "../../reducers/user";

export default function InputPassword() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  // const [userInput, setUserInput] = useState("");

  const changeHandler = (e) => {
    setPassword(e.target.value);
    dispatch(savePassword(e.target.value));
  };
  return (
    <div>
      <input
        style={{
          borderRadius: "12px",
          fontSize: "xx-large",
          padding: "1rem",
          marginBottom: "2rem",
        }}
        onChange={changeHandler}
        value={password}
        placeholder="password"
        type={passwordVisible ? "text" : "password"}
      />

      <FontAwesomeIcon
        icon={passwordVisible ? faEyeSlash : faEye}
        onClick={togglePasswordVisibility}
        style={{
          position: "absolute",
          fontSize: "1.5rem",
          transform: "translate(-3rem, 1.6rem)",
          cursor: "pointer",
          color: passwordVisible ? "#000" : "#aaa",
        }}
      />
    </div>
  );
}
