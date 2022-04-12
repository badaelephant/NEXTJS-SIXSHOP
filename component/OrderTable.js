import PurchaseList from "./PurchaseList";

export default function OrderTable({ products, orderInfo }) {
  // console.log(Object.keys(datalist[0]), Object.values(datalist[0]));

  return (
    <div>
      <table>
        <thead>
          <tr>
            {Object.keys(products[0]).map((key) => (
              <th>{key}</th>
            ))}
            <th>Q</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <PurchaseList product={product} idx={idx} orderInfo={orderInfo} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
