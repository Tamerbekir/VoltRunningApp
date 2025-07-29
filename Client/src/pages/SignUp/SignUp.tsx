import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import "./assets/signUp.css";

export default function App() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [submitUserInfo, setSubmitUserInfo] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [errorPasswordMessage, setErrorPasswordMessage] = useState(false);

  const handleUserInfoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handlePassword = () => {
    if (userInfo.password.length < 9 || userInfo.confirmPassword.length < 9) {
      setErrorMessage("Password does not meet requirements");
      setError(true);
    }
  };
  const handleSubmitUser = () => {
    if (
      userInfo.firstName === "" ||
      userInfo.lastName === "" ||
      userInfo.email === "" ||
      userInfo.userName === "" ||
      userInfo.password === "" ||
      userInfo.confirmPassword === ""
    ) {
      setError(true);
      setErrorMessage("Please fill out all fields");
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 4000);
    } else {
      setSubmitUserInfo([...submitUserInfo, userInfo]);
      setUserInfo({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="App">
      <div className="userForm">
        <h2 className="signUp">Sign Up</h2>
        <input
          type="text"
          placeholder="First Name"
          onChange={handleUserInfoChange}
          name="firstName"
          value={userInfo.firstName}
        />
        <input
          type="text"
          placeholder="Last Name"
          onChange={handleUserInfoChange}
          name="lastName"
          value={userInfo.lastName}
        />
        <input
          type="text"
          placeholder="Email"
          onChange={handleUserInfoChange}
          name="email"
          value={userInfo.email}
        />
        <input
          type="text"
          className="userName"
          placeholder="Username"
          onChange={handleUserInfoChange}
          name="userName"
          value={userInfo.userName}
        />
        <p className="passwordNote">Password Must Be Minimum 10 Characters</p>
        <input
          type="password"
          className="password"
          placeholder="Password"
          onChange={handleUserInfoChange}
          name="password"
          value={userInfo.password}
        />
        <input
          type="password"
          className="password"
          placeholder="Confirm Password"
          onChange={handleUserInfoChange}
          name="confirmPassword"
          value={userInfo.confirmPassword}
        />
        <button
          onClick={() => {
            handleSubmitUser();
            error;
            handlePassword();
          }}
        >
          Create Account
        </button>
        <p className="errorMessage">{error && errorMessage}</p>
      </div>
      <div>
        <Link to="/">Return Home</Link> or <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

// Log to console
console.log("Hello console");
