const messageContainer = document.querySelector(".messageContainer");
const sendForm = document.querySelector(".sendForm");
const messageInput = document.querySelector(".messageInput");

const socket = io();

socket.on("chatMessage", (data) => {
  appendMessage("incoming", data);
});

sendForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const message = messageInput.value;
  appendMessage("outgoing", message);
  socket.emit("sendMessage", message);
  messageInput.value = "";
});

function appendMessage(type, data) {
  if (type === "outgoing") {
    const outgoingMessage = document.createElement("div");
    outgoingMessage.className = "outgoingMessage";
    outgoingMessage.innerText = data;
    messageContainer.append(outgoingMessage);
  } else {
    const incomingMessage = document.createElement("div");
    incomingMessage.className = "incomingMessage";
    incomingMessage.innerText = data;
    messageContainer.append(incomingMessage);
  }
}
