export default function Selectbox({ name, options }) {
  return (
    <select name={name} id={name} style={{ width: "200px", height: "25px" }}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
