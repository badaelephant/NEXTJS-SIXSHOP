import styles from "./Shop.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";

export default function Shop(props) {
  const router = useRouter();
  const { id } = router.query;
  console.log(props);
  const [shop, setShop] = useState(props.data.shop);
  const [customs, setCustoms] = useState(props.data.customs);
  const [customers, setCustomers] = useState(props.data.customers);
  const [products, setProducts] = useState(props.data.products);
  const [orders, setOrders] = useState(props.data.orders);

  const updateCustom = async (idx, custom) => {};
  const deleteCustom = async (idx, custom) => {
    const result = await axios.delete(`/api/customs/${custom._id}`);
    if (result.data?.success) {
      let newList = customs.filter((data) => data._id !== custom._id);
      setCustoms(newList);
    }
  };
  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        <div>This is Shop Page</div>
        {props.success && (
          <div>
            <div>name: {shop.name}</div>
            <div>location: {shop.location}</div>
          </div>
        )}
      </div>
      <div className={styles.dataContainer}>
        <div>Custom Field List</div>
        <button style={{ marginBottom: "20px" }}>Create Custom Field</button>
        {customs.map((custom, idx) => (
          <div className={styles.listItems} key={custom.fieldName}>
            <div style={{ width: "30px", textAlign: "center" }}>{idx + 1}</div>
            <input value={custom.fieldName} />
            <button onClick={() => updateCustom(idx, custom)}>update</button>
            <button onClick={() => deleteCustom(idx, custom)}>delete</button>
          </div>
        ))}
      </div>
      <div className={styles.dataContainer}>
        <div>This is Our Customer</div>
      </div>
      <div className={styles.dataContainer}>
        <div>This is Our Product</div>
      </div>
      <div className={styles.dataContainer}>
        <div>This is Our Order</div>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { id } = context.query;
  console.log(process.env.BASE_URL, id);
  const result = await axios.get(`${process.env.BASE_URL}/api/shops/${id}`);
  if (result.data?.success) {
    let shopData = result.data.data;
    console.log("shopData", shopData);
    return {
      props: { success: true, data: shopData },
    };
  } else {
    return { success: false };
  }
}
