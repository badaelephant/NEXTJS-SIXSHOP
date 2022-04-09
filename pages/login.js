import axios from "axios";
import { useState } from "react";
import styles from "./Login.module.css";
import { useRouter } from "next/router";
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("owner");
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("handleLogin", { email, password, role });
    const result = await axios.post("/api/users/login", { email, password, role });
    if (result.data?.success) {
      const userInfo = result.data.data;
      console.log("userInfo", userInfo);
      router.push(`/${userInfo.role}/${userInfo._id}`);
    }
  };

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleLogin}>
        <label>email</label>
        <input onChange={(e) => setEmail(e.currentTarget.value)} value={email} />
        <label>password</label>
        <input onChange={(e) => setPassword(e.currentTarget.value)} value={password} />
        <div>
          <input type="radio" id="owner" value="owner" checked="checked" onChange={() => setRole("owner")} />
          <label for="dewey">Owner</label>
          <input type="radio" id="customer" value="customer" onChange={() => setRole("customer")} />
          <label for="louie">Customer</label>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
