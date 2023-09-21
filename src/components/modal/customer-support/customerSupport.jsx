import React, { useContext, useEffect, useRef } from "react";
import "./customerSupport.css";
import Modal from "react-modal";
import "animate.css";
import io from "socket.io-client";
import {
  getChatRoom,
  postMessage,
  removeChatRoom,
} from "../../../service/products.service";
import AuthContext from "../../../store/auth-context";
import { getCurrentUser } from "../../../helpers/product.helper";
const socket = io("https://asm3-nodejs-me79.onrender.com", {
  transports: ["websocket"],
});

const customStyles = {
  content: {
    // top: "60%",
    // left: "75%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
    // margin: "0 50%",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

function ExampleModal() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [chatRoom, setChatRoom] = React.useState({
    message: [],
  });
  const ctx = useContext(AuthContext);

  //Hàm này dùng để nhận socket từ server gửi lên
  useEffect(() => {
    //Nhận dữ liệu từ server gửi lên thông qua socket
    socket.on("to_customer", (data) => {
      console.log("getCurrentUser()", getCurrentUser());
      console.log("data.customerId", data.customerId);
      if (data.customerId === getCurrentUser().userId) {
        setChatRoom(data);
      }
    });
    loadMessage();
  }, []);

  function loadMessage() {
    console.log("loadMessage");
    const customerId = ctx.currentUser?.userId;
    if (!customerId) return;
    getChatRoom(customerId).then((r) => {
      console.log("chatroom", r);
      if (r) {
        setChatRoom(r);
      }
    });
  }

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }

  function afterOpenModal() {}

  function postMessagehandler(content) {
    console.log("content?.trim() ", content?.trim());
    if (!content?.trim() || !ctx.currentUser?.userId) return;
    if (content?.trim() == "/end") {
      endChat();
      return;
    }
    inputEl.current.value = "";
    postMessage({
      message: {
        content,
        isCustomer: true,
      },
      customerId: ctx.currentUser?.userId,
      customerName: ctx.currentUser?.fullName || ctx.currentUser?.email,
    }).then((r) => {
      if (r) {
        loadMessage();
      }
    });
  }
  const inputEl = useRef();

  function endChat() {
    removeChatRoom(getCurrentUser().userId).then((r) => {
      setChatRoom({ message: [] });
      setIsOpen(false);
    });
  }

  return (
    <>
      <i
        className="fa-brands fa-facebook-messenger hover-effect-overlay text-primary"
        onClick={toggleModal}
        style={{
          position: "sticky",
          bottom: "5%",
          left: "96%",
          fontSize: "25px",
          zIndex: 20,
        }}
      ></i>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
        closeTimeoutMS={200}
      >
        <div className="out">
          <div className="header-modal">
            <div className="container-modal d-flex justify-content-between align-items-center">
              <h6 className="mb-0">Customer Support</h6>
              <button className="btn btn-light text-2">Let's Chat App</button>
            </div>
          </div>
          <div
            className=""
            style={{
              maxHeight: "300px",
              overflow: "auto",
            }}
          >
            <div className="container-modal d-flex flex-column">
              {chatRoom?.message.map((m, i) => {
                if (m.isCustomer) {
                  return (
                    <p className="chat-right" key={i}>
                      {ctx.currentUser.fullName}: {m.content}
                    </p>
                  );
                } else {
                  return (
                    <div className="container-chat-left" key={i}>
                      <img
                        className="img-profile"
                        src={require("../../../assets/profile.png")}
                        alt=""
                      />
                      <p className="chat-left">ADMIN: {m.content}</p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <div className="footer-modal bg-light">
            <div className="container-modal row">
              <div className="col-1">
                <img
                  className="img-profile"
                  src={require("../../../assets/profile.png")}
                  alt=""
                />
              </div>
              <div className="col-6">
                <input
                  className="input-modal text-1 fst-normal"
                  type="text"
                  placeholder="Enter Message!"
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      postMessagehandler(e.target.value);
                      e.target.value = "";
                    }
                  }}
                  ref={inputEl}
                />
              </div>
              <div className="col-3">
                <i
                  className="fa-solid fa-face-smile"
                  style={{
                    fontSize: "15px",
                    color: "#b8b8b8",
                    marginRight: "15px",
                  }}
                ></i>
                <i
                  className="fa-solid fa-paperclip"
                  style={{
                    fontSize: "15px",
                    color: "#b8b8b8",
                    marginRight: "15px",
                  }}
                ></i>
                <i
                  className="fa-solid fa-paper-plane"
                  style={{
                    fontSize: "15px",
                    color: "#48B0F7",
                    cursor: "pointer",
                  }}
                  onClick={() => postMessagehandler(inputEl?.current?.value)}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ExampleModal;
