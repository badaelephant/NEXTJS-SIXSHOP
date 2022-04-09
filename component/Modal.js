import styles from "./Modal.module.css";
export default function Modal({ fields }) {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>Title</div>
          <button className={styles.closeButton}>X</button>
        </div>
        <div>
          {fields.map((field) => (
            <div>
              <label>{field}</label> <input />
            </div>
          ))}
        </div>
        <button className={styles.button}>Save</button>
      </div>
    </div>
  );
}
