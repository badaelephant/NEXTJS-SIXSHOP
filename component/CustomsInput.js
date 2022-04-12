import { useState } from "react";

export default function CustomsInput({ custom, updateCustom, deleteCustom }) {
  const [fieldName, setFieldName] = useState(custom.fieldName);

  return (
    <>
      <div style={{ width: "100px" }}>{custom.collectionName}</div>
      <input value={fieldName} onChange={(e) => setFieldName(e.currentTarget.value)} />

      <button onClick={() => updateCustom(custom, fieldName)}>update</button>
      <button onClick={() => deleteCustom(custom)}>delete</button>
    </>
  );
}
