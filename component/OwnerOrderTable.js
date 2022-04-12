import axios from "axios";

export default function OwnerOrderTable({ datalist, callback }) {
  // console.log(Object.keys(datalist[0]), Object.values(datalist[0]));
  const updateOrder = async (e) => {
    if (e.status !== "ACCEPTED") {
      const result = await axios.patch(`/api/orders/${e._id}`, { status: "ACCEPTED" });
      if (result.data.success) callback();
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {Object.keys(datalist[0]).map((key) => (
              <th>{key}</th>
            ))}
            <th>Accept</th>
          </tr>
        </thead>
        <tbody>
          {datalist.map((data) => (
            <tr>
              {Object.values(data).map((v) =>
                typeof v === "object" ? <td style={{ width: "180px", fontSize: "13px" }}>{v.join("\r\n")}</td> : <td>{v}</td>
              )}
              <td>
                <button onClick={() => updateOrder(data)}>OK</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
