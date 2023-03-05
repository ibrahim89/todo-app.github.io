function Table({todoList,updateStatus,handleEditTodo,deleteHandler,changeOrder}){
 return (<>
  <table className="todoTbl">
       
        <thead>
          <tr key={"head"}>
            <th>S.No</th>
            <th>Task Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((todo, i) => {
            let count = i;
            return (
              <>
                <tr
                  key={todo.id}
                 
                >
                  <th>{i + 1}</th>
                  <th style={{textAlign:'left'}}>{todo.name}</th>
                  <th
                    style={
                      (todo.status == "Completed" && { color: "green" }) ||
                      (todo.status == "In Progress" && { color: "orange" }) ||
                      (todo.status == "Not Started" && { color: "gray" })
                    }
                  >
                    {todo.status}{" "}
                    <div className="dropdown">
                      <button className="dropbtn">update status</button>
                      <div className="dropdown-content">
                        <a
                          href="#"
                          onClick={() => updateStatus(todo.id, "Not Started")}
                        >
                          Not Started
                        </a>
                        <a
                          href="#"
                          onClick={() => updateStatus(todo.id, "In Progress")}
                        >
                          In Progress
                        </a>
                        <a
                          href="#"
                          onClick={() => updateStatus(todo.id, "Completed")}
                        >
                          Completed
                        </a>
                      </div>
                    </div>
                  </th>
                  <th>
                    <button className="btn edit">
                      <i
                        className="fa fa-edit"
                        onClick={() => handleEditTodo(todo)}
                      ></i>
                    </button>
                    <button className="btn trash">
                      <i
                        className="fa fa-trash"
                        onClick={() => {
                          deleteHandler(todo);
                        }}
                      ></i>
                    </button>
                    <button
                      onClick={() => changeOrder(i, "UP")}
                      disabled={i === 0 && "disabled"}
                    >
                      ⬆️
                    </button>
                    <button
                      onClick={() => changeOrder(i, "DOWN")}
                      disabled={i + 1 === todoList.length && "disabled"}
                    >
                      ⬇️
                    </button>
                  </th>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
 
 </>);
}
export default Table;