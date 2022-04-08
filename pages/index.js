import styles from "./Home.module.css";
import React from "react";
import Link from "next/link";
export default function Home() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div>Welcome to Sixshop</div>
        <Link href={"/login"}>
          <button className={styles.button}>go to Login</button>
        </Link>
        <Link href={"/register"}>
          <button className={styles.button}>go to Register</button>
        </Link>
      </div>
    </div>
  );
}
