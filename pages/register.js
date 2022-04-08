import { useState } from "react";
import styles from "./Register.module.css";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("owner");
  const handleRegister = (e) => {
    e.preventDefault();
    console.log("handleRegister", { name, email, password, role });
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
          <label for="dewey">Owner</label>
          <input type="radio" id="customer" value="customer" onChange={() => setRole("customer")} />
          <label for="louie">Customer</label>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
