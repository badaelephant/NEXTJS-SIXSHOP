import styles from "./Shop.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useRef, useState } from "react";
import Table from "../../component/Table";
import Modal from "../../component/Modal";
export default function Shop(props) {
  const router = useRouter();
  const { id } = router.query;

  const [shop, setShop] = useState(props.data.shop);
  const [customs, setCustoms] = useState(props.data.customs);
  const [customers, setCustomers] = useState(props.data.customers);
  const [products, setProducts] = useState(props.data.products);
  const [orders, setOrders] = useState(props.data.orders);
  const [openModal, setOpenModal] = useState(false);
  const modalInfo = useRef({});

  const updateCustom = async (idx, custom) => {};
  const deleteCustom = async (idx, custom) => {
    const result = await axios.delete(`/api/customs/${custom._id}`);
    if (result.data?.success) {
      let newList = customs.filter((data) => data._id !== custom._id);
      setCustoms(newList);
    }
  };
  const refetchData = async () => {
    console.log("refetchData");
    const result = await axios.get(`/api/shops/${id}`);
    if (result.data?.success) {
      let shopData = result.data.data?.shops;
      //TODO : useSWR로 실시간 데이터 페칭
      setCustoms(shopData.customs);
      setCustomers(shopData.customs);
      setProducts(shopData.products);
      setOrders(shopData.orders);
    }
  };
  const onClickCreate = async (item) => {
    if (item === "customs") {
      //custom create 고정
      modalInfo.current = {
        fields: ["store", "collectionName", "fieldName", "fieldType"],
        defaultData: { store: id },
        collection: item,
      };
    } else {
      //products
      let productCustoms = customs.filter((custom) => custom.collectionName === item);
      modalInfo.current = {
        fields: ["store", "name", "price", "categories", ...productCustoms],
        defaultData: { store: id },
        collection: item,
      };
    }
    setOpenModal(true);
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
        <button style={{ marginBottom: "20px" }} onClick={() => onClickCreate("customs")}>
          Create Custom Field
        </button>
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
        <div>This is Our Product</div>
        <button style={{ marginBottom: "20px" }} onClick={() => onClickCreate("products")}>
          Create Product
        </button>
        {products.length > 0 ? <Table datalist={products} /> : <div>There are no Products</div>}
      </div>
      <div className={styles.dataContainer}>
        <div>This is Our Customer</div>
        {customers.length > 0 && <Table datalist={customers} />}
      </div>

      <div className={styles.dataContainer}>
        <div>This is Our Order</div>
        {orders.length > 0 && <Table datalist={orders} />}
      </div>
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          fields={modalInfo.current.fields}
          defaultData={modalInfo.current.defaultData}
          collection={modalInfo.current.collection}
          callback={refetchData}
        />
      )}
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
