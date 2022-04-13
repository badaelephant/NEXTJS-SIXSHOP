export default function Table({ datalist, checkIdx }) {
  // console.log(Object.keys(datalist[0]), Object.values(datalist[0]));
  const chekedEvent = (e, idx) => {
    console.log(e.currentTarget.checked, idx);
    if (e.currentTarget.checked) {
      checkIdx.current.push(idx);
    } else {
      checkIdx.current = checkIdx.current.filter((item) => item != idx);
    }
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th class="header" width="30"></th>
            {Object.keys(datalist[0]).map((key) => (
              <th>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datalist.map((data, idx) => (
            <tr>
              <td>
                <span class="btnbox1">
                  <input type="checkbox" onChange={(e) => chekedEvent(e, idx)} />
                </span>
              </td>
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
