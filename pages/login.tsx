import React from "react";
import styles from "/styles/pages/Login.module.scss";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const login = async () => {
    await router.push("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.loginWrapper}>
        <div className={styles.loginBox}>
          <h1 className={styles.title}>Log In</h1>
          <form className={styles.loginForm}>
            <label className="input-container">
              <input className="input" required />
              <p className="input-label">Email</p>
            </label>
            <label className="input-container">
              <input className="input" required />
              <p className="input-label">Password</p>
            </label>
            <button onClick={login} className="green-button">
              Login Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
