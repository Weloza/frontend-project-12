import { Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useEditChannelMutation } from '../../api/channelsApi';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

export const RenameModal = (props) => {
  const {
    schema,
    editedChannelId,
    handleCloseModal,
  } = props.data;

  const { t } = useTranslation();
  const [editChannel] = useEditChannelMutation();
  const input = useRef(null);                      

  const handleRenameChannel = async (values, { resetForm }) => {
    try {
      await editChannel({
        id: editedChannelId,
        name: values.newChannelName,
      });
      //toast succes rename
      handleCloseModal();
      resetForm();
    } catch (error) {
      console.log('err', error);
      //toast errornetwork
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
        <Modal.Title>{t('modal.renameChannel')}</Modal.Title>
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
            <Form.Label className="visually-hidden">{t('modal.channelName')}</Form.Label>
            <Form.Control.Feedback className="invalid-feedback">
              {formik.errors.newChannelName}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <button 
                type="button" 
                className="me-2 btn btn-secondary" 
                onClick={handleCloseModal}>
                {t('modal.cancel')}
              </button>
              <button type="submit" className="btn btn-primary">{t('modal.send')}</button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
