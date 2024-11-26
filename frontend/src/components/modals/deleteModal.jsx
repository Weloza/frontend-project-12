import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useRemoveChannelMutation } from '../../api/channelsApi';
import { setSelectedChannel } from '../../slices/channelSlice';

export const DeleteModal = (props) => {
  const {
    editedChannelId,
    handleCloseModal,
    defaultChannel,
  } = props.data;

  const dispatch = useDispatch();
  const selectedChannelId = useSelector((state) => state.selectedChannel.selectedChannel.id);
  const [removeChannel] = useRemoveChannelMutation();

  const handleDeleteChannel = async (id) => {
    try {
      await removeChannel(id);
      handleCloseModal();
      if (selectedChannelId === id) {
        dispatch(setSelectedChannel(defaultChannel));
      }
    } catch (error) {
      console.log('err', error);
    }
  }

  return (
    <Modal show onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="modal-body">
          <p className="lead">Уверены?</p>
          <div className="d-flex justify-content-end">
            <button 
              type="button" 
              className="me-2 btn btn-secondary" 
              onClick={handleCloseModal}>
              Отменить
            </button>
            <button 
              type="submit" 
              className="btn btn-danger" 
              onClick={() => handleDeleteChannel(editedChannelId)}>
              Удалить
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
