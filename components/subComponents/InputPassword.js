import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function InputPassword(props) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const getPassword = (enteredText) => {
    setPassword(enteredText.target.value);
    props.sendPasswordBackToParent(enteredText.target.value);
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
        // onChange={(e) => setPassword(e.target.value)}
        onChange={getPassword}
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
