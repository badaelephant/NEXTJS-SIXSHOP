import styles from "./Shop.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { useRef, useState } from "react";
import Table from "../../../component/Table";
import Modal from "../../../component/Modal";
import CustomsInput from "../../../component/CustomsInput";
import OwnerOrderTable from "../../../component/OwnerOrderTable";
export default function Shop(props) {
  const router = useRouter();
  const { id } = router.query;

  const [shop, setShop] = useState(props.data.shop);
  const [customs, setCustoms] = useState(props.data.customs);
  const [customers, setCustomers] = useState(props.data.customers);
  const [products, setProducts] = useState(props.data.products);
  const [orders, setOrders] = useState(props.data.orders);
  const [openModal, setOpenModal] = useState(false);
  const checkIdx = useRef([]);
  const modalInfo = useRef({});

  const updateCustom = async (custom, fieldName) => {
    console.log("fieldName", fieldName);
    if (fieldName !== custom.fieldName) {
      const result = await axios.patch(`/api/customs/${custom._id}`, { fieldName }).catch(() => alert("update custom failed"));
      if (result.data?.success) {
        refetchData();
      }
    }
  };
  const deleteCustom = async (custom) => {
    console.log("custom", custom);
    const result = await axios.delete(`/api/customs/${custom._id}`).catch(() => alert("delete custom failed"));
    if (result.data?.success) {
      refetchData();
    }
  };
  const refetchData = async () => {
    console.log("refetchData");
    const result = await axios.get(`/api/shops/${id}`).catch(() => alert("refetch data failed"));
    if (result.data?.success) {
      console.log("result.data.data", result.data.data);
      let shopData = result.data.data;

      setCustoms(shopData.customs);
      setCustomers(shopData.customers);
      setProducts(shopData.products);
      setOrders(shopData.orders);
    }
  };
  const onClickCreate = async (item) => {
    if (item === "customs") {
      modalInfo.current = {
        title: item,
        fields: ["collectionName", "fieldName", "fieldType"],
        defaultData: { store: id },
        collection: item,
      };
    } else {
      let fieldList = [];
      customs.filter((custom) => custom.collectionName === item && fieldList.push(custom.fieldName));
      console.log(fieldList);
      modalInfo.current = {
        title: item,
        fields: ["name", "price", "categories", ...fieldList],
        defaultData: { store: id },
        collection: item,
      };
    }
    setOpenModal(true);
  };
  const onClickUpdate = async (item, idx) => {
    console.log(checkIdx.current, products[0]);
    let checkedIndex = checkIdx.current;
    if (checkedIndex.length == 1) {
      let fieldList = [];
      customs.filter((custom) => custom.collectionName === item && fieldList.push(custom.fieldName));
      console.log(fieldList);
      let idx = checkedIndex[0];
      modalInfo.current = {
        title: item,
        fields: ["name", "price", "categories", ...fieldList],
        defaultData: { store: id },
        data: products[idx],
        collection: item,
      };
      setOpenModal(true);
    } else {
      alert("please choose one item to update");
    }
  };
  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        <div>///////////This is Shop Page////////////</div>

        {props.success && (
          <div>
            <div>name: {shop.name}</div>
            <div>location: {shop.location}</div>
          </div>
        )}
      </div>
      <div className={styles.dataContainer}>
        <div>/////////Custom Field////////</div>
        <button style={{ marginBottom: "20px" }} onClick={() => onClickCreate("customs")}>
          Create Custom Field
        </button>
        {customs.length > 0 ? (
          customs.map((custom, idx) => (
            <div className={styles.listItems} key={custom.fieldName}>
              <div style={{ width: "30px", textAlign: "center" }}>{idx + 1}</div>

              <CustomsInput custom={custom} updateCustom={updateCustom} deleteCustom={deleteCustom} />
            </div>
          ))
        ) : (
          <div style={{ width: "100%", textAlign: "center", marginTop: "30px", color: "red" }}>There are no Customs...</div>
        )}
      </div>
      <div className={styles.dataContainer}>
        <div>///////////Product////////////</div>
        <button style={{ marginBottom: "20px" }} onClick={() => onClickCreate("products")}>
          Create Product
        </button>
        {products.length > 0 ? (
          <>
            <button onClick={() => onClickUpdate("products")}>Update Product</button>
            <Table datalist={products} checkIdx={checkIdx} />
          </>
        ) : (
          <div style={{ width: "100%", textAlign: "center", marginTop: "30px", color: "red" }}>There are no Products...</div>
        )}
      </div>
      <div className={styles.dataContainer}>
        <div>///////////Customer////////////</div>
        {customers.length > 0 ? (
          <Table datalist={customers} />
        ) : (
          <div style={{ width: "100%", textAlign: "center", marginTop: "70px", color: "red" }}>There are no Customers...</div>
        )}
      </div>

      <div className={styles.dataContainer}>
        <div>/////////////Order/////////////</div>
        {orders.length > 0 ? (
          <OwnerOrderTable datalist={orders} callback={refetchData} />
        ) : (
          <div style={{ width: "100%", textAlign: "center", marginTop: "70px", color: "red" }}>There are no Orders...</div>
        )}
      </div>
      {openModal && (
        <Modal
          title={modalInfo.current.title}
          setOpenModal={setOpenModal}
          fields={modalInfo.current.fields}
          defaultData={modalInfo.current.defaultData}
          collection={modalInfo.current.collection}
          callback={refetchData}
          data={modalInfo.current.data}
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
