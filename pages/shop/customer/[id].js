import styles from "./Shop.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Table from "../../../component/Table";
import Modal from "../../../component/Modal";
import CustomsInput from "../../../component/CustomsInput";
import PurchaseList from "../../../component/PurchaseList";
import OrderTable from "../../../component/OrderTable";
import { getCookie } from "../../../lib/cookie";
export default function Shop(props) {
  const router = useRouter();
  const { id } = router.query;

  const [shop, setShop] = useState(props.data.shop);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const modalInfo = useRef({});
  const orderInfo = useRef({});

  const refetchData = async () => {
    console.log("refetchData");
    const result = await axios.get(`/api/shops/${id}`);
    if (result.data?.success) {
      console.log("result.data.data", result.data.data);
      let shopData = result.data.data;
      //TODO : useSWR로 실시간 데이터 페칭

      setProducts(shopData.products);
      setOrders(shopData.orders);
    }
  };
  useEffect(() => {
    setProducts(props.data.products);
    setOrders(props.data.orders);
  }, []);
  const purchaseOrder = async () => {
    let purchaseInfo = {};
    purchaseInfo.store = id;
    purchaseInfo.status = "REQUESTED";
    purchaseInfo.customer = getCookie("userId");

    let products = [];
    let totalprice = 0;
    Object.entries(orderInfo.current).map((item) => {
      console.log(item);
      if (item[1].quantity > 0) {
        products.push(item[1]._id);
        totalprice += item[1].price * item[1].quantity;
      }
    });
    purchaseInfo.products = products;
    purchaseInfo.price = totalprice;
    if (products.length > 0) {
      const result = await axios.post(`/api/orders`, purchaseInfo).catch(() => {
        alert("order failed");
      });
      if (result) {
        refetchData();
      }
    } else {
      alert("please purchase more than one item");
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
        <div>This is Our Product</div>
        <button onClick={purchaseOrder}>Order</button>
        {products.length > 0 ? <OrderTable products={products} orderInfo={orderInfo.current} /> : <div>There are no Products</div>}
      </div>

      <div className={styles.dataContainer}>
        <div>My Order</div>
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
