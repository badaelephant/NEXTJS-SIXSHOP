import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./CustomerPage.module.css";
import Modal from "../../component/Modal";
import Nav from "../../component/Nav";
export default function CustomerPage(props) {
  console.log(props);
  const router = useRouter();
  const { id } = router.query;
  const [openModal, setOpenModal] = useState(false);
  const [shopData, setShopData] = useState(props.shops);
  const refetchData = async () => {
    console.log("refetchData");
    const result = await axios.get(`/api/users/${id}`);
    if (result.data?.success) {
      let userData = result.data.data;
      setShopData(userData.shops);
    }
  };
  const goShopDetail = (id) => {
    router.push(`/shop/customer/${id}`);
  };
  return (
    <div className={styles.root}>
      <Nav />
      <div>CustomerPage</div>
      {props.success && (
        <div className={styles.userContainer}>
          <div className={styles.userInfo}>
            <label className={styles.userInfoLabel}>Name:</label>
            <div>{props.userInfo.name}</div>
          </div>
          <div className={styles.userInfo}>
            <label className={styles.userInfoLabel}>Email:</label>
            <div>{props.userInfo.email}</div>
          </div>
          <div className={styles.userInfo}>
            <label className={styles.userInfoLabel}>Role:</label>
            <div>{props.userInfo.role}</div>
          </div>
        </div>
      )}
      <div className={styles.shopContainer}>
        <div>-----ShopList-----Click to go in</div>
        {shopData.map((shop) => (
          <button key={shop._id} onClick={() => goShopDetail(shop._id)}>
            {shop.name}
          </button>
        ))}
      </div>
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          fields={["name", "location"]}
          defaultData={{ ownerId: id }}
          collection={"shops"}
          callback={refetchData}
        />
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const result = await axios.get(`${process.env.BASE_URL}/api/users/${id}`);
  if (result.data?.success) {
    let userData = result.data.data;
    console.log(userData);
    return {
      props: { success: true, userInfo: userData.user, shops: userData.shops },
    };
  } else {
    return { success: false, userInfo: {}, shops: [] };
  }
}
