import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { io } from 'socket.io-client';
import ModalsContainer from '../../../components/modals/modalsContainer.jsx';
import { routes } from '../../../utils';
import { setModal } from '../../../slices/modalSlice.js';
import channelsApi, { useGetChannelsQuery } from '../../../api/channelsApi.js';
import { setSelectedChannel } from '../../../slices/channelSlice.js';
import { deleteAuthorization } from '../../../slices/authSlice.js';
import { getSelectedChannel } from '../../../slices/selectors.js';

const Channels = () => {
  const { t } = useTranslation();
  const { data, error, isLoading } = useGetChannelsQuery();
  const selectedChannel = useSelector(getSelectedChannel);
  const dispatch = useDispatch();
  const redirect = useNavigate();

  const modals = {
    add: 'add',
    delete: 'delete',
    rename: 'rename',
  };

  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        dispatch(deleteAuthorization());
        redirect(routes.login);
      } else {
        console.log(error);
        toast(t('errors.networkError'));
      }
    }
  }, [error, redirect, dispatch, t]);

  useEffect(() => {
    const addChannel = (newChannel) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
        draftChannels.push(newChannel);
      }));
    };

    const deleteChannel = ({ id }) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => (
        draftChannels.filter((channel) => channel.id !== id)
      )));
    };

    const renameChannel = (editedChannel) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => (
        draftChannels
          .filter((channel) => channel.id !== editedChannel.id)
          .concat(editedChannel)
      )));
    };

    const socket = io();

    socket.on('newChannel', (payload) => {
      addChannel(payload);
    });

    socket.on('removeChannel', (payload) => {
      deleteChannel(payload);
    });

    socket.on('renameChannel', (payload) => {
      renameChannel(payload);
    });

    return () => {
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [dispatch]);

  const handleClickChannel = (channel) => {
    dispatch(setSelectedChannel(channel));
  };

  const handleRenderModal = (activeModal, editedChannelId = '', editedChannelName = '') => {
    dispatch(setModal({ activeModal, editedChannelId, editedChannelName }));
  };

  const channelsList = !isLoading && !error && data.map(({ id, name, removable }) => (
    <li key={id} className="nav-item w-100">
      <div role="group" className="d-flex dropdown dnt-group">
        <button
          type="button"
          className={cn(
            'w-100',
            'rounded-0',
            'text-start',
            { 'text-truncate': removable },
            'btn',
            { 'btn-secondary': id === selectedChannel.id },
          )}
          onClick={() => handleClickChannel({
            id,
            name,
            removable,
          })}
        >
          <span className="me-1">{t('chatPage.grid')}</span>
          {name}
        </button>
        {removable && (
          <div className="dropdown">
            <button
              className="flex-grow-0 btn dropdown-toggle dropdown-toggle-split"
              type="button"
              id={`dropdownMenuButton${id}`}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="visually-hidden">{t('chatPage.channelManage')}</span>
            </button>
            <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${id}`}>
              <li>
                <a
                  className="dropdown-item"
                  role="button"
                  href="#"
                  onClick={() => handleRenderModal(modals.rename, id, name)}
                >
                  {t('chatPage.rename')}
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  role="button"
                  href="#"
                  onClick={() => handleRenderModal(modals.delete, id)}
                >
                  {t('chatPage.delete')}
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </li>
  ));

  if (isLoading) {
    return (
      <div>{t('chatPage.chatLoading')}</div>
    );
  }

  return !error && (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chatPage.channels')}</b>
        <button
          type="button"
          className="btn-xs btn-outline-primary rounded"
          onClick={() => handleRenderModal(modals.add)}
        >
          +
        </button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channelsList}
      </ul>
      <ModalsContainer />
    </div>
  );
};

export default Channels;
