export default function ({ datalist }) {
  return (
    <table>
      <thead>
        <tr>
          {Object.keys(datalist[0]).map((key) => {
            <th>{key}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {datalist.map((data) => {
          return (
            <tr>
              {Object.values(data).map((v) => {
                <td>{v}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
