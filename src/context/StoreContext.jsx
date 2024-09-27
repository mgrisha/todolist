import { useEffect, useState, createContext } from 'react';
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [todoList, setTodoList] = useState([]);
  const [modalFormEvent, setModalFormEvent] = useState(false);
  const [filter, setFilter] = useState('all');
  const [todoItem, setTodoItem] = useState({
    id: '',
    title: '',
    description: '',
    status: false,
    date: ''
  });
  
  const fetchData = async () => {
    let response = await axios("http://localhost:5000/todoList");
    let newTodoList = response.data;
    setTodoList(newTodoList);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const deleteTodoItem = async (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити це завдання?')) {
      await axios.delete(`http://localhost:5000/todoList/${id}`);
      setTodoList(prevTodoItem => prevTodoItem.filter(item => item.id !== id));
    }
  }

  const editTodoItem = (id) => {
    const findTodoItem = todoList.find(item => item.id === id);
    setTodoItem(findTodoItem);
    setModalFormEvent(true);
  }

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setTodoItem({
      ...todoItem,
      [name]: value
    });
  }

  const filteredTodoList = todoList.filter(item => 
    filter === 'all' ? true : filter === 'completed' ? item.status : !item.status
  );

  const handleChangeStatus = async (id) => {
    const findTodoItem = todoList.find(item => item.id === id);
    const findIndex = todoList.findIndex(item => item.id === id);
    findTodoItem.status = !findTodoItem.status;
    const tempTodoList = [...todoList];
    tempTodoList[findIndex] = findTodoItem;
    await axios.patch(`http://localhost:5000/todoList/${id}`, {'status': findTodoItem.status})
    setTodoItem(tempTodoList);
  }

  const contextValue = {
    todoList,
    setTodoList,
    modalFormEvent,
    setModalFormEvent,
    todoItem,
    setTodoItem,
    deleteTodoItem,
    editTodoItem,
    handleChangeInput,
    handleChangeStatus,
    filteredTodoList,
    setFilter
  }

  return (
    <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>
  )
}

export default StoreContextProvider;