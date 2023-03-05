
import { Modal, Input } from "antd";
function AddTodo({
  openModal,
  setIsModalOpen,
  onAddTodo,
  onUpdateTodo,
  isEdit,
  todo,
  setTodo,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((todo) => ({
      ...todo,
      name: value,
    }));
  };
  const handleOk = () => {
    if (!isEdit) {
      onAddTodo(todo);
    } else {
      onUpdateTodo(todo);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Add New Todo"
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form>
          <Input
            type="text"
            name={todo.name}
            value={todo.name}
            onChange={handleChange}
            placeholder="Enter new Todo Task"
          />
        </form>
      </Modal>
    </>
  );
}
export default AddTodo;
