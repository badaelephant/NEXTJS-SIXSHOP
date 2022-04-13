import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.css";
import Selectbox from "./SelectBox";
export default function Modal({ fields, defaultData, collection, setOpenModal, callback, title, data }) {
  const [categories, setCategories] = useState([]);
  const inputs = useRef({});
  useEffect(() => {
    if (data) setCategories(data.categories);
    inputs.current = defaultData;
    if (data)
      for (const [key, value] of Object.entries(data)) {
        inputs.current[key] = value;
      }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    let failed = false;
    console.log(inputs.current);
    if (fields.includes("categories")) inputs.current["categories"] = categories;

    for (const [key, value] of Object.entries(inputs.current)) {
      if (value === "") failed = true;
    }
    if (!failed) {
      console.log(inputs.current);
      let result = data
        ? await axios.patch(`/api/${collection}/${data._id}`, { ...inputs.current }).catch(() => alert(`${collection} create failed`))
        : await axios.post(`/api/${collection}`, { ...inputs.current }).catch(() => alert(`${collection} create failed`));
      if (result?.data?.success) callback();
      setOpenModal(false);
    } else {
      alert("please put all inputs");
    }
  };
  const deleteCategory = (category) => {
    let newcategory = categories.filter((item) => item !== category);
    console.log("newcategory", newcategory);
    setCategories(newcategory);
  };
  const addCategory = (e) => {
    let value = e.target.previousSibling.value;

    if (categories.includes(value)) {
      alert("you already add that category");
    } else {
      setCategories([...categories, value]);
      e.target.previousSibling.value = "";
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>{title}</div>
          <button className={styles.closeButton} onClick={() => setOpenModal(false)}>
            X
          </button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field} className={styles.fieldPart}>
              <div style={{ width: "100px" }}>{field}</div>
              {field == "collectionName" && <Selectbox name={field} options={["customers", "products", "orders"]} />}
              {field == "fieldType" && (
                <Selectbox name={field} options={["String", "Number", "Boolean", "Array", "Buffer", "Date", "ObjectId", "Mixed"]} />
              )}
              {field == "categories" && (
                <>
                  <input style={{ width: "160px" }} name={field} />
                  <button style={{ width: "40px" }} onClick={addCategory} type="button">
                    Add
                  </button>
                  <div style={{ display: "flex", width: "200px", flexDirection: "column" }}>
                    {categories.map((category) => {
                      return (
                        <div style={{ display: "flex", marginTop: "5px", marginRight: "10px" }}>
                          <div style={{ marginLeft: "10px" }}>-</div>
                          <div style={{ width: "100px", marginLeft: "10px" }}>{category}</div>
                          <button style={{ marginLeft: "5px" }} onClick={() => deleteCategory(category)} type="button">
                            X
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              {field !== "collectionName" &&
                field !== "fieldType" &&
                field !== "categories" &&
                (data ? (
                  <input
                    style={{ width: "200px" }}
                    name={field}
                    defaultValue={data[field]}
                    onChange={(e) => (inputs.current[field] = e.currentTarget.value)}
                  />
                ) : (
                  <input style={{ width: "200px" }} name={field} onChange={(e) => (inputs.current[field] = e.currentTarget.value)} />
                ))}
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
