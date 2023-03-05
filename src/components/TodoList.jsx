import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import "./TodoList.css";
import Table from "./Table";
let c = 1;

function TodoList() {
  console.log("TodoList Rendered", c++);
  const intialState = {
    id: "",
    name: "",
    status: "Not Started",
  };
  let cCnt = 0;
  let wcnt = 0;
  let npCount = 0;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoList, setTodoList] = useState([
    { id: 1, name: "Quran Recitation", status: "Not Started" },
    { id: 2, name: "Excercise", status: "Not Started" },
    { id: 3, name: "Programming", status: "In Progress" },
    { id: 4, name: "Writing", status: "Completed" },
    { id: 5, name: "Playing", status: "Not Started" },
    { id: 6, name: "Meeting", status: "Not Started" },
  ]);
  
  const [todo, setTodo] = useState(intialState);
  const [isEdit, setIsEdit] = useState(false);
  const [compCnt, setCompCnt] = useState(0);
  const [wipCnt, setWipCnt] = useState(0);
  const [npCnt, setNpCnt] = useState(0);

  useEffect(() => {
    getCountTodos();
    onEnterKeyPress();
    }, [todoList]);
  
  
  const handleAddTodo = (todo) => {
    setTodoList((todoList) => [
      { ...todo, id: todoList.length + 1 },
      ...todoList,
    ]);
    setIsEdit(false);
  };
  const handleEditTodo = (todo) => {
    setIsModalOpen(true);
    setTodo(todo);
    setIsEdit(true);
  };
  const onUpdateTodo = () => {
    setTodoList(
      todoList.map((data) => {
        if (data.id === todo.id) {
          return todo;
        } else {
          return data;
        }
      })
    );
  };
  const deleteHandler = (todo) => {
    setTodoList(todoList.filter((t) => t.id !== todo.id));
  };
  const getCountTodos = () => {
    todoList.map((todo) => {
      if (todo.status === "Completed") {
        cCnt++;
      }
      if (todo.status === "Not Started") {
        npCount++;
      }
      if (todo.status === "In Progress") {
        wcnt++;
      }
    });
    setCompCnt(cCnt);
    setNpCnt(npCount);
    setWipCnt(wcnt);
  };
  const addTodoTemplate = (
    <>
      <AddTodo
        openModal={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onAddTodo={handleAddTodo}
        onEdit={handleEditTodo}
        onUpdateTodo={onUpdateTodo}
        todo={todo}
        setTodo={setTodo}
        isEdit={isEdit}
      />
    </>
  );
  const reorderTodoList = (event, originalTodoList) => {
    const movedItem = originalTodoList.find(
      (item, index) => index === event.oldIndex
    );
    const remainingItems = originalTodoList.filter(
      (item, index) => index !== event.oldIndex
    );

    const reorderedItems = [
      ...remainingItems.slice(0, event.newIndex),
      movedItem,
      ...remainingItems.slice(event.newIndex),
    ];

    return reorderedItems;
  };

  function changeOrder(index, direction) {
   
    setTodoList(
      reorderTodoList(
        { oldIndex: index, newIndex: index + (direction === "UP" ? -1 : 1) },
        todoList
      )
    );
  }
  const updateStatus = (id, status) => {
    console.log(id, status);
    const updatedList = todoList.map((todo) => {
      if (todo.id === id) {
        todo.status = status;
        return todo;
      }
    });
    setTodoList((updatedList) => [...updatedList]);
  };
  const onEnterKeyPress = () => {
    window.addEventListener("keypress", (e) => {
      console.log(e);
      if (e.code === "Enter") {
        console.log(e.key);
        setIsModalOpen(true);
      }
    });
  };

  return (
    <>
      <div style={{ marginTop: "25px" }}>
        <div className="addTodoBtn">
          <span onClick={() => setIsModalOpen(true)}>TODO +</span>
        </div>
        <div className="banner-pending">
          <p style={{ display: "inline" }}>Total: </p>{" "}
          <b style={{ fontSize: "18px" }}>{npCnt+compCnt+wipCnt}</b>
        </div>
        <div className="banner-completed">
          <p style={{ display: "inline" }}>Completed: </p>{" "}
          <span style={{ fontSize: "18px", display: "inline" }}>{compCnt}</span>
        </div>
        <div className="banner-wip">
          <p style={{ display: "inline" }}>In Progress: </p>{" "}
          <b style={{ fontSize: "18px" }}>{wipCnt}</b>
        </div>
        <div className="banner-pending">
          <p style={{ display: "inline" }}>Not Started: </p>{" "}
          <b style={{ fontSize: "18px" }}>{npCnt}</b>
        </div>
      </div>

     <Table
     todoList={todoList}
     updateStatus={updateStatus}
     handleEditTodo={handleEditTodo}
     deleteHandler={deleteHandler}
     changeOrder={changeOrder}
     />
      {addTodoTemplate}
    </>
  );
}
export default TodoList;
