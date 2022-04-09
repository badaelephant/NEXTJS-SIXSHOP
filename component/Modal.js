import axios from "axios";
import { useEffect } from "react";
import styles from "./Modal.module.css";
export default function Modal({ fields, defaultData, collection, setOpenModal, callback }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    let inputs = defaultData;
    fields.forEach((field, idx) => {
      inputs[field] = e.target[idx].value;
    });
    await axios.post(`/api/${collection}`, { ...inputs });
    callback();
    setOpenModal(false);
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>Title</div>
          <button className={styles.closeButton}>X</button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field}>
              <label>{field}</label> <input name={field} />
            </div>
          ))}
          <button className={styles.button} type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
