import { useGetChannelsQuery } from "../../../api/channelsApi.js";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedChannel } from '../../../slices/channelSlice.js';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AddButton } from '../../../icons';
import { routes } from "../../../utils";
import cn from 'classnames';


export const Channels = () => {
  const { data, error, isLoading } = useGetChannelsQuery();
  const { selectedChannel } = useSelector((state) => state.selectedChannel);
  const dispatch = useDispatch();
  const redirect = useNavigate();

  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        redirect(routes.login);
      } else {
        console.error(error);
        alert('Ошибка сети');
      }
    }
  }, [error, redirect]);

  const handleClick = (channel) => {
    dispatch(setSelectedChannel(channel));
  }

  return isLoading ? (
    <div>Ожидание загрузки чата</div>
  ) : (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>
          <button type="button" className="p-0 text-primary btn btn-group-vertical">
            <AddButton />
          </button>
        </div>
        <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
          {data.map(({ id, name, removable }) => (
            <li key={id} className="nav-item w-100">
              <div role="group" className="d-flex dropdown dnt-group">
                <button 
                  type="button" 
                  className={cn('w-100', 'rounded-0', 'text-start', 'btn', {
                    'btn-secondary': id === selectedChannel.id,
                  })}
                  onClick={() => handleClick({ id, name, removable })}
                >
                  <span className="me-1">#</span>
                  {name}
                </button>
                
                  <div className="dropdown">
                  <button className="flex-grow-0 btn dropdown-toggle dropdown-toggle-split" type="button" id={`dropdownMenuButton${id}`} data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="visually-hidden">Управление каналом</span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${id}`}>
                    <li><a className="dropdown-item" role="button" href="#">Переименовать</a></li>
                    <li><a className="dropdown-item" role="button" href="#">Удалить</a></li>
                  </ul>
                </div>
              
              </div>
            </li>
          ))}
        </ul>
      </div>
  );
};
