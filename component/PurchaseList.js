import { useState } from "react";
import styles from "./PurchaseList.module.css";
export default function PurchaseList({ product, idx, orderInfo }) {
  const [quantity, setQuantity] = useState(0);
  const onChangeQuantity = (e) => {
    let newQuantity = e.currentTarget.value;
    if (newQuantity > 0) {
      orderInfo[product.name] = { ...product, quantity: newQuantity };
      setQuantity(newQuantity);
    }
    console.log(orderInfo);
  };
  return (
    <div className={styles.listItems} key={product.name}>
      <div style={{ width: "30px", textAlign: "center" }}>{idx + 1}</div>

      <div style={{ width: "100px" }}>{product.name}</div>
      <div style={{ width: "100px" }}>{product.price} Won</div>
      <div style={{ width: "100px" }}>{product.categories}</div>
      <input type="number" style={{ width: "30px" }} min="0" max="100" value={quantity} onChange={onChangeQuantity} />
    </div>
  );
}
