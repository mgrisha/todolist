import { useContext } from 'react';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import TodoList from './components/todo-list'
import ModalForm from './components/modal-form';

import { StoreContext } from './context/StoreContext';

function App() {
  const { modalFormEvent, setModalFormEvent, setTodoItem, todoItem, setFilter } = useContext(StoreContext);

  const triggerChnageForm = () => {
    const todoForm = document.getElementById('todo-form');
    todoForm.id.value = todoItem.id;
    todoForm.title.value = todoItem.title;
    todoForm.description.value = todoItem.description;
    todoForm.deadline.value = todoItem.deadline;
  }

  const addNewTodoItem = () => {
    setTodoItem({
      id: '',
      title: '',
      description: '',
      deadline: ''
    });
    setModalFormEvent(true)
  }

  return (
    <Container fluid="md">
      <Row>
        <Col className="pt-4 d-flex justify-content-between">
          <h3>ToDo List</h3>
          <Button onClick={addNewTodoItem}>Додати завдання</Button>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <FloatingLabel controlId="floatingSelect" label="Фільтрувати список">
            <Form.Select onChange={(e) => setFilter(e.target.value)}>
              <option value="all">Усі</option>
              <option value="completed">Виконані</option>
              <option value="incompleted">Невиконані</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <TodoList />
        </Col>
      </Row>
      <ModalForm
        show={modalFormEvent}
        onHide={() => setModalFormEvent(false)}
        onEnter={() => triggerChnageForm()}
      />
    </Container>
  )
}

export default App;
