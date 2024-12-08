import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setModal } from '../../slices/modalSlice';
import { getNewChannelSchema } from '../../utils';
import AddModal from './addModal';
import RenameModal from './renameModal';
import DeleteModal from './deleteModal';
import {
  getActiveModal,
  getChannels,
  getEditedChannelId,
  getEditedChannelName,
} from '../../slices/selectors';

const ModalsContainer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const activeModal = useSelector(getActiveModal);

  const channelsNames = useSelector(getChannels)
    .map((channel) => channel.name);
  const schema = getNewChannelSchema(t, channelsNames);

  const editedChannelId = useSelector(getEditedChannelId);
  const editedChannelName = useSelector(getEditedChannelName);

  const handleCloseModal = () => {
    dispatch(setModal({
      activeModal: '',
      editedChannelId: '',
      editedChannelName: '',
    }));
  };

  const defaultChannel = {
    id: '1',
    name: 'general',
    removable: false,
  };

  const modals = {
    add: AddModal,
    rename: RenameModal,
    delete: DeleteModal,
  };

  const props = {
    handleCloseModal,
    schema,
    editedChannelId,
    editedChannelName,
    defaultChannel,
  };

  const ActiveModal = modals[activeModal];

  if (!ActiveModal) {
    return null;
  }

  return (
    <ActiveModal data={props} />
  );
};

export default ModalsContainer;
