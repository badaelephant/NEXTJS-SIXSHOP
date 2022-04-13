import axios from "axios";
import { useState } from "react";
import styles from "./Register.module.css";
import { useRouter } from "next/router";
export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("owner");
  const handleRegister = async (e) => {
    e.preventDefault();
    if (name == "" || email == "" || password == "") {
      alert("please write down all information correctly");
    } else {
      const result = await axios.post("/api/auth/register", { name, email, password, role }).catch(() => {
        alert("register failed");
      });
      if (result?.data?.success) {
        router.push("/");
      }
    }
  };

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleRegister}>
        <label>name</label>
        <input onChange={(e) => setName(e.currentTarget.value)} value={name} />
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

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
