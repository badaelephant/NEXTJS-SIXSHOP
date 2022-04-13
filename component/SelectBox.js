import { useEffect } from "react";

export default function Selectbox({ name, options, inputs }) {
  const handleChange = (e) => {
    inputs[name] = e.currentTarget.value;
  };
  useEffect(() => {
    inputs[name] = options[0];
  });
  return (
    <select name={name} id={name} style={{ width: "200px", height: "25px" }} onChange={handleChange}>
      {options.map((option, idx) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
