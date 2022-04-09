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
    const result = await axios.post("/api/users/register", { name, email, password, role });
    if (result.data?.success) {
      router.push("/");
    } else {
      alert("register failed");
    }
  };

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleRegister}>
        <label>name</label>
        <input onChange={(e) => setName(e.currentTarget.value)} value={name} />
        <label>email</label>
        <input onChange={(e) => setEmail(e.currentTarget.value)} value={email} />
        <label>password</label>
        <input onChange={(e) => setPassword(e.currentTarget.value)} value={password} />
        <div>
          <input type="radio" id="owner" value="owner" checked="checked" onChange={() => setRole("owner")} />
          <label>Owner</label>
          <input type="radio" id="customer" value="customer" onChange={() => setRole("customer")} />
          <label>Customer</label>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
