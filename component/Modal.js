import axios from "axios";
import { useEffect } from "react";
import styles from "./Modal.module.css";
import Selectbox from "./SelectBox";
export default function Modal({ fields, defaultData, collection, setOpenModal, callback }) {
  console.log({ fields, defaultData, collection, setOpenModal, callback });
  const handleSubmit = async (e) => {
    e.preventDefault();
    let inputs = defaultData;
    fields.forEach((field, idx) => {
      inputs[field] = e.target[idx].value;
    });
    console.log("collection", collection);
    let result = await axios.post(`/api/${collection}`, { ...inputs });
    console.log("result", result.data);
    if (result.data?.success) callback();
    else {
      alert("Create Failed");
    }

    setOpenModal(false);
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>Title</div>
          <button className={styles.closeButton} onClick={() => setOpenModal(false)}>
            X
          </button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field}>
              <label>{field}</label>
              {field == "collectionName" && <Selectbox name={field} options={["customers", "products", "orders"]} />}
              {field == "fieldType" && (
                <Selectbox name={field} options={["String", "Number", "Boolean", "Array", "Buffer", "Date", "ObjectId", "Mixed"]} />
              )}
              {field !== "collectionName" && field !== "fieldType" && <input name={field} />}
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
