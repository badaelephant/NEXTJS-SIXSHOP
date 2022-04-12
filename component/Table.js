export default function Table({ datalist }) {
  // console.log(Object.keys(datalist[0]), Object.values(datalist[0]));

  return (
    <div>
      <table>
        <thead>
          <tr>
            {Object.keys(datalist[0]).map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datalist.map((data) => (
            <tr>
              {Object.values(data).map((v) =>
                typeof v === "object" ? <td style={{ width: "180px", fontSize: "13px" }}>{v.join("\r\n")}</td> : <td>{v}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
