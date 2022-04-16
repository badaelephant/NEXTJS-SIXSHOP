import styles from "./Table.module.css";
export default function Table({ datalist, checkIdx }) {
  // console.log(Object.keys(datalist[0]), Object.values(datalist[0]));
  console.log(datalist);
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
      <table className={styles.table}>
        <thead>
          <tr>
            <th></th>
            {Object.keys(datalist[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datalist.map((data, idx) => (
            <tr key={idx}>
              <td key={idx}>
                <span>
                  <input type="checkbox" onChange={(e) => chekedEvent(e, idx)} />
                </span>
              </td>
              {Object.values(data).map((v) =>
                typeof v === "object" ? (
                  <td style={{ width: "180px" }} key={v}>
                    {v.join("\r\n")}
                  </td>
                ) : (
                  <td key={v}>{v}</td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
