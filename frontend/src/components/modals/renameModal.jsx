import { Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useEditChannelMutation } from '../../api/channelsApi';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export const RenameModal = (props) => {
  const {
    schema,
    editedChannelId,
    editedChannelName,
    handleCloseModal,
  } = props.data;

  const { t } = useTranslation();
  const [editChannel] = useEditChannelMutation();
  const input = useRef(null);

  useEffect(() => {
    if (input.current) {
      input.current.focus();
      input.current.select();
    }
  }, []);

  const handleRenameChannel = async (values) => {
    try {
      await editChannel({
        id: editedChannelId,
        name: values.newChannelName,
      });
      toast.success(t('modal.channelRenameSuccess'));
      handleCloseModal();
    } catch (error) {
      console.log('err', error);
      toast.error(t('error.networkError'));
    }
  }

  const formik = useFormik({
    initialValues: {
      newChannelName: editedChannelName,
    },
    validationSchema: schema,
    onSubmit: handleRenameChannel,
    enableReinitialize: true,
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
              id="newChannelName"
              className="mb-2 form-control" 
              value={formik.values.newChannelName} 
              onChange={formik.handleChange}
              isInvalid={formik.errors.newChannelName}
              ref={input}
            />
            <Form.Label className="visually-hidden" htmlFor='newChannelName'>
              {t('modal.channelName')}
            </Form.Label>
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
