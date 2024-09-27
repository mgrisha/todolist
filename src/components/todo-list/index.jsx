import { useContext } from "react";
import Table from 'react-bootstrap/Table';

import TodoItem from "../todo-list-item";

import { StoreContext } from "../../context/StoreContext";

const TodoList = () => {
  const { filteredTodoList } = useContext(StoreContext);

  return (
    <>
    {
      filteredTodoList.length > 0 ? 
      (
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Статус</th>
              <th>Назва</th>
              <th>Функції</th>
            </tr>
          </thead>
          <tbody>
            { filteredTodoList.map((todoItem, index) => <TodoItem todoItem={todoItem} key={todoItem.id} index={index} />) }
          </tbody>
        </Table>
      ) :
      (
        <div>Ваш список завдань поки що пустий</div>
      )
    }
    </>
  )
}

export default TodoList;