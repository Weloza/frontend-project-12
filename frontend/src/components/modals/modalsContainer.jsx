import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../slices/modalSlice";
import channelsApi from "../../api/channelsApi";
import { getValidationSchema } from "../../utils";
import { AddModal } from "./addModal";
import { DeleteModal } from "./deleteModal";
import { RenameModal } from "./renameModal";

export const ModalsContainer = () => {
  const dispatch = useDispatch();
  const activeModal = useSelector((state) => state.modal.activeModal);

  const selector = channelsApi.endpoints.getChannels.select();
  const channelsNames = useSelector((state) => selector(state).data)
    .map((channel) => channel.name);
  const schema = getValidationSchema(channelsNames);

  const editedChannelId = useSelector((state) => state.modal.editedChannelId);

  const handleCloseModal = () => {
    dispatch(setModal({ 
      activeModal: '', 
      editedChannelId: '',
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
