import Modal from "../component/Modal";

export default function ModalTest() {
  const fields = ["name", "password"];
  return (
    <div>
      <Modal fields={fields} />
    </div>
  );
}
