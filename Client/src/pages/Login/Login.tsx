import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import "./assets/login.css";

export default function Login() {
  const [userLoginInfo, setUserLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [errorPasswordMessage, setErrorPasswordMessage] = useState(false);

  const handleUserInfoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserLoginInfo({ ...userLoginInfo, [name]: value });
  };

  const handleSubmitUser = () => {
    if (userLoginInfo.email === "" || userLoginInfo.password === "") {
      setError(true);
      setErrorMessage("Please fill out all fields");
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 4000);
    }
  };

  return (
    <div className="App">
      <div className="userForm">
        <input
          type="text"
          placeholder="Email"
          onChange={handleUserInfoChange}
          name="email"
          value={userLoginInfo.email}
        />
        <input
          type="password"
          className="password"
          placeholder="Password"
          onChange={handleUserInfoChange}
          name="password"
          value={userLoginInfo.password}
        />

        <button onClick={handleSubmitUser}>Login</button>
        <p className="errorMessage">{error && errorMessage}</p>
      </div>
      <div>
        <Link to="/">Return Home</Link>
        <br />
        <Link to="/signup">No account? Sign up</Link>
      </div>
    </div>
  );
}
