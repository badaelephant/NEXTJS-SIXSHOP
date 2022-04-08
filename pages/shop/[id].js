import styles from "./Shop.module.css";
import { useRouter } from "next/router";

export default function Shop() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={styles.root}>
      <div className={styles.titleContainer}>
        <div>This is Shop Page</div>
        <div>
          <div>name: sixshop</div>
          <div>owner: chris</div>
          <div>location: yongin</div>
        </div>
      </div>
      <div className={styles.dataContainer}>
        <div>This is Our Admin Part</div>
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
