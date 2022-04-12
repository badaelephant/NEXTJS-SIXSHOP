export default function Selectbox({ name, options }) {
  return (
    <select name={name} id={name}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
