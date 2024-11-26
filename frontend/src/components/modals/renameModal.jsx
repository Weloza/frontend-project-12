import { Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useEditChannelMutation } from '../../api/channelsApi';
import { useRef } from 'react';

export const RenameModal = (props) => {
  const {
    schema,
    editedChannelId,
    handleCloseModal,
  } = props.data;

  const [editChannel] = useEditChannelMutation();
  const input = useRef(null);                      

  const handleRenameChannel = async (values, { resetForm }) => {
    try {
      await editChannel({
        id: editedChannelId,
        name: values.newChannelName,
      });
      handleCloseModal();
      resetForm();
    } catch (error) {
      console.log('err', error);
    }
  }

  const formik = useFormik({
    initialValues: {
      newChannelName: '',
    },
    validationSchema: schema,
    onSubmit: handleRenameChannel,
  });

  return (
    <Modal show onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control 
              name="newChannelName" 
              className="mb-2 form-control" 
              value={formik.values.newChannelName} 
              onChange={formik.handleChange}
              isInvalid={formik.errors.newChannelName}
              ref={input}
              autoFocus
            />
            <Form.Label className="visually-hidden">Имя канала</Form.Label>
            <Form.Control.Feedback className="invalid-feedback">
              {formik.errors.newChannelName}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <button 
                type="button" 
                className="me-2 btn btn-secondary" 
                onClick={handleCloseModal}>
                Отменить
              </button>
              <button type="submit" className="btn btn-primary">Отправить</button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
