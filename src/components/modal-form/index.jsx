import { useContext } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  id: yup.string().required(),
  title: yup.string().required('Назва завдання є обов\'язковою'),
  description: yup.string().max(200, 'Опис не може перевищувати 200 символів'),
  deadline: yup.date().nullable().typeError('Дата має бути валідною').notRequired().test('is-valid', 'Дата має бути валідною', (value) => {
    return value === null || !isNaN(new Date(value).getTime());
  }),
});

import { getUID, returnDateFormat } from '../../utils/functions';

import { StoreContext } from '../../context/StoreContext';

const ModalForm = (props) => {

  const { todoItem, handleChangeInput, todoList, setTodoList, setModalFormEvent } = useContext(StoreContext);

  const { register, formState: { errors }, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit (data) {
    let newTodoList = [];
    const { id, title, description, deadline } = data;
    const newDeadline = returnDateFormat(new Date(deadline));
    if (todoItem.id.length > 0) {
      const findTodoItem = todoList.find(item => item.id === todoItem.id);
      const findIndex = todoList.findIndex(item => item.id === todoItem.id);
      findTodoItem.title = title;
      findTodoItem.description = description;
      findTodoItem.deadline = newDeadline;
      const tempTodoList = [...todoList];
      tempTodoList[findIndex] = findTodoItem;
      newTodoList = tempTodoList;
      await axios.put(`http://localhost:5000/todoList/${todoItem.id}`, findTodoItem, {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      const newTodoItem = {
        id,
        title,
        description,
        deadline: newDeadline,
        status: false
      }
      await axios.post('http://localhost:5000/todoList', newTodoItem, {
        headers: { 'Content-Type': 'application/json' }
      });
      newTodoList = [...todoList, newTodoItem];
    }
    setTodoList(newTodoList);
    setModalFormEvent(false);
  };

  const onError = (error) => {
    console.log('ERROR ->', error);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Додати завдання</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit, onError)} id="todo-form">
          <Form.Group className="mb-3 position-relative" controlId="exampleForm.ControlInput1">
            <Form.Label>Назва завдання</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Введіть назву"
              {...register('title')}
              value={'' || todoItem.title}
              onChange={(e) => handleChangeInput(e)}
            />
            {errors.title && (
              <Form.Text className="text-danger">
                {errors.title.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3 position-relative" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Опис завдання</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              {...register("description")}
              value={'' || todoItem.description}
              placeholder="Введіть опис"
              onChange={(e) => handleChangeInput(e)}
            />
            {errors.description && (
              <Form.Text className="text-danger">
                {errors.description.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3 position-relative" controlId="exampleForm.ControlInput2">
            <Form.Label>Дедлайн</Form.Label>
            <Form.Control
              type="date"
              name="deadline"
              {...register('deadline')}
              value={returnDateFormat(new Date(todoItem.deadline))}
              onChange={(e) => handleChangeInput(e)}
            />
            {errors.deadline && (
              <Form.Text className="text-danger">
                {errors.deadline.message}
              </Form.Text>
            )}
          </Form.Group>
          <input type="hidden" value={todoItem.id || getUID()} name="id" {...register('id')} />
          <Button type="submit">Зберегти</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalForm