import { useDispatch, useSelector } from "react-redux";
import messagesApi, { useGetMessagesQuery } from "../../../api/messagesApi";
import { useEffect } from "react";
import { io } from "socket.io-client";

export const Messages = ({ children }) => {
  const dispatch = useDispatch();

  const { data = [] } = useGetMessagesQuery();
  const { selectedChannel } = useSelector((state) => state.selectedChannel);
  const selectedChannelMessages = data.filter(({ channelId }) => channelId === selectedChannel.id)

  useEffect(() => {
    const updateMessages = (newMessage) => dispatch(
      messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
        draftMessages.push(newMessage);
      }),
    );

    const socket = io();

    socket.on('newMessage', (payload) => {
      updateMessages(payload);
    });

    return () => {
      socket.off('newMessage');
    }

  }, [dispatch]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{`# ${selectedChannel.name}`}</b>
          </p>
          <span className="text-muted">{`${selectedChannelMessages.length} сообщений`}</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {selectedChannelMessages
            .map(({ id, body, username }) => (
            <div key={id} className="text-break mb-2">
              <b>{username}</b>
              {`: `}
              {body}
            </div>
          ))}
        </div>
        {children}
      </div>
    </div>
  )
};