import axios from "axios";
import { useState } from "react";
import styles from "./Login.module.css";
import { useRouter } from "next/router";
import { setCookie } from "../lib/cookie";
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await axios.post("/api/auth/login", { email, password, role }).catch(() => alert("login failed"));
    console.log("result");
    console.log(result);
    if (result?.data?.success) {
      const userInfo = result.data.data;
      let userId = userInfo._id;
      setCookie("userId", userId);

      if (userInfo.role == "owner") {
        console.log("role =>owner");
        router.push("/owner");
      } else {
        console.log("role =>owner");
        router.push("/customer");
      }
    }
  };

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleLogin}>
        <label>email</label>
        <input onChange={(e) => setEmail(e.currentTarget.value)} value={email} type="email" />
        <label>password</label>
        <input onChange={(e) => setPassword(e.currentTarget.value)} value={password} type="password" />
        <div>
          <input type="radio" name="role" value="owner" onChange={() => setRole("owner")} />
          <label>Owner</label>
          <input type="radio" name="role" value="customer" onChange={() => setRole("customer")} />
          <label>Customer</label>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
