import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../slices/modalSlice";
import { getNewChannelSchema } from "../../utils";
import { AddModal, DeleteModal, RenameModal } from "../modals";
import { useTranslation } from "react-i18next";
import { getActiveModal, getChannels, getEditedChannelId, getEditedChannelName } from "../../slices/selectors";

export const ModalsContainer = () => {
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
  }

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
  )
};
