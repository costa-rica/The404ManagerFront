import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";

export default function InputPassword(props) {
  const [passwordVisible, passwordVisibleSetter] = useState(false);
  const [password, passwordSetter] = useState("");

  const togglePasswordVisibility = () => {
    passwordVisibleSetter((prev) => !prev);
  };

  const changeHandler = (e) => {
    passwordSetter(e.target.value);
    // dispatch(savePassword(e.target.value));
    props.sendPasswordBackToParent(e.target.value);
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
