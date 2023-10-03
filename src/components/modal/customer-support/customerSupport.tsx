import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import io from "socket.io-client";
import { scrollToBotomEl } from 'utils/helpers/browser';
import { getMsgTime } from 'utils/helpers/date';
import { getRelativeImageSrc } from 'utils/helpers/file';
import { getChatRoomByUser, removeChatRoom, sendMessage } from '../../../service/chatRoom.service';
import AuthContext from "../../../store/context/auth-context";
import { API_ENDPOINT } from '../../../utils/constant/env';
import { initialRoom } from '../../../utils/constant/models/room';
import s from './customerSupport.module.scss';
import { useLocation } from 'react-router-dom';
import { RoomModel } from 'models/Room.model';

const socket = io(API_ENDPOINT, {
  transports: ["websocket"],
});

Modal.setAppElement('#root');

export default function CustomerSupport() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [chatRoom, setChatRoom] = useState<RoomModel>(initialRoom);
  const { currentUser, isAuthenticated } = useContext(AuthContext);

  const loadMessage = useCallback(() => {
    const userId = currentUser?._id;
    if (!userId) {
      setChatRoom(initialRoom);
      return;
    };
    getChatRoomByUser(userId).then((r) => {
      if (r) {
        setChatRoom(r);
        scrollToBottomModal();
      }
    });
  }, [currentUser?._id]);

  useEffect(() => {
    socket.on("to_customer", (data: RoomModel) => {
      if (data?.customerId === currentUser?._id) {
        setChatRoom(data);
        scrollToBottomModal();
      }
    });
    loadMessage();

    if (!currentUser?._id) {
      setIsOpen(false);
    }
  }, [loadMessage]);

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  const [message, setMessage] = useState('');
  function postMessagehandler(content = '') {
    const msg = content?.trim();

    setMessage('');

    if (msg === "/end") {
      endChat();
      return;
    }

    if (!msg || !currentUser?._id) return;

    sendMessage({
      message: [{
        content,
        isCustomer: true,
        createdAt: ''
      }],
      customerId: currentUser?._id,
    }).then((r) => {
      if (r) {
        loadMessage();
      }
    });
  }

  function endChat() {
    if (!chatRoom._id) return;
    removeChatRoom(chatRoom._id).then((r) => {
      setChatRoom(initialRoom);
      setIsOpen(false);
    });
  }

  const modalBodyRef = useRef<HTMLDivElement>(null);

  function scrollToBottomModal() {
    setTimeout(() => {
      scrollToBotomEl(modalBodyRef.current);
    });
  }

  if (!isAuthenticated) {
    return <></>;
  }

  return (
    <>
      <i
        className={s["chat-btn"] + " fa-brands fa-facebook-messenger text-primary hover-effect"}
        onClick={toggleModal}
      >
      </i>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={scrollToBottomModal}
        closeTimeoutMS={200}
        className={s['modal-content']}
      >
        <div className={s["header-modal"]}>
          <div className={s["container-modal"] + " d-flex justify-content-between align-items-center"}>
            <h6 className="mb-0">Customer Support</h6>
            <i className='fa fa-times close-icon' onClick={() => setIsOpen(false)}></i>
          </div>
        </div>
        <div
          ref={modalBodyRef}
          className={s['modal-body']}
        >
          <div className={s["container-modal"] + " d-flex flex-column pb-0"}>
            {chatRoom?.message.map((m, i) => {
              if (m.isCustomer) {
                return (
                  <div key={m.createdAt} className={s["container-chat-right"] + " text-end"} >
                    <p className={s["chat-right"]}>{currentUser?.fullName || 'Customer'}: {m.content}</p>
                    <p className="small ms-3 mb-3 rounded-3 text-muted" >{getMsgTime(m.createdAt)}
                    </p>
                  </div>
                );
              } else {
                return (
                  <div className={s["container-chat-left"]} key={m.createdAt}>
                    <img
                      className={s["img-profile"]}
                      src={getRelativeImageSrc('profile.png')}
                      alt="profile.png"
                    />
                    <p className={s["chat-left"]}>Employee: {m.content}</p>
                    <p className="small ms-5 mb-3 rounded-3 text-muted">{getMsgTime(m.createdAt)}a</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className={s["footer-modal"] + " bg-light"}>
          <div className={s["container-modal"] + " row"}>
            <div className="col-2 col-sm-1">
              <img
                className={s["img-profile"]}
                src={getRelativeImageSrc('profile.png')}
                alt="profile.png"
              />
            </div>
            <div className="col-10 col-sm-7 mb-sm-0 mb-2">
              <input
                className={s["input-modal"] + " text-1 fst-normal w-100"}
                type="text"
                placeholder="Enter Message!"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const text = e.currentTarget.value.trim();
                    postMessagehandler(text);
                    setMessage('');
                  }
                }}
                value={message}
                onChange={(e) => {
                  const text = e.currentTarget.value;
                  setMessage(text);
                }}
              />
            </div>
            <div className="col-12 col-sm-3 text-center">
              <i
                className={s["tool-chat-icon"] + " fa-solid fa-face-smile"}
              ></i>
              <i
                className={s["tool-chat-icon"] + " fa-solid fa-paperclip"}
              ></i>
              <i
                className={`${s["tool-chat-icon"]} ${s["send-msg-icon"]} fa-solid fa-paper-plane`}
                onClick={() => postMessagehandler(message)}
              ></i>
            </div>
          </div>
        </div>
      </Modal >
    </>
  );
}
