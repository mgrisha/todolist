import { useContext } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import styles from './TodoListItem.module.scss';

import { StoreContext } from '../../context/StoreContext';

const TodoItem = ({ todoItem, index }) => {
  const { editTodoItem, handleChangeStatus, deleteTodoItem } = useContext(StoreContext);

  return (
    <tr className={styles['todo-item']}>
      <td>{index + 1}</td>
      <td>
        <Form.Check
          type="switch"
          id="custom-switch"
          onChange={() => handleChangeStatus(todoItem.id)}
          checked={todoItem.status}
        />
      </td>
      <td>
        <span className={styles['todo-item__link']} onClick={() => editTodoItem(todoItem.id)}>{todoItem.title}</span>
      </td>
      <td>
        <Button variant="danger" onClick={() => deleteTodoItem(todoItem.id)}>&times;</Button>
      </td>
    </tr>
  )
}

export default TodoItem;