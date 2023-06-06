const friendRequestDiv = document.querySelector(".friendRequestDiv");

// Function to create and append a friend element in friendRequestDiv
function createFriendRequestElement(user) {
  const friendRequestDiv = document.createElement("div");
  friendRequestDiv.className = "friendRequest";

  const profileImg = document.createElement("img");
  profileImg.className = "profile";
  profileImg.src = "";
  profileImg.alt = "Profile";

  const name = document.createElement("h5");
  name.textContent = user.name;

  const acceptBtn = document.createElement("button");
  acceptBtn.textContent = "Accept";
  acceptBtn.addEventListener("click", () => {
    addToFriendList(user.user_id);
  });

  const rejectBtn = document.createElement("button");
  rejectBtn.textContent = "Reject";
  rejectBtn.addEventListener("click", () => {
    rejectFriendRequests(user.user_id);
  });

  friendRequestDiv.appendChild(profileImg);
  friendRequestDiv.appendChild(name);
  friendRequestDiv.appendChild(acceptBtn);
  friendRequestDiv.appendChild(rejectBtn);

  return friendRequestDiv;
}

// Fetch the friend request API to see recieve friend requests
fetch("http://localhost:8080/friendRequests")
  .then((response) => response.json())
  .then((data) => {
    const users = data.users;
    users.forEach((user) => {
      const friendRequestElement = createFriendRequestElement(user);
      friendRequestDiv.appendChild(friendRequestElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
  });

// Fetch add to friend list and delete from friend request list API
function addToFriendList(senderID) {
  fetch("http://localhost:8080/friends", {
    method: "POST",
    body: JSON.stringify({
      sender_id: senderID,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      window.location.reload("http://localhost:8080/feed");
    })
    .catch((error) => {
      console.error("Error fetching submit posts API:", error);
    });
}

// Fetch reject/delete friend request API
function rejectFriendRequests(id) {
  fetch(`http://localhost:8080/friendRequests/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((result) => {
      window.location.reload("http://localhost:8080/feed");
    })
    .catch((error) => {
      console.error("Error:", error.Error);
    });
}

// Contact Area's
const contactDiv = document.querySelector(".contactDiv");

// Fetch friend list API
fetch("http://localhost:8080/friends")
  .then((response) => response.json())
  .then((data) => {
    const friends = data.friends;
    friends.forEach((friend) => {
      const friendElement = createFriendElement(friend);
      contactDiv.appendChild(friendElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
  });

// Function to create and append a friend element in contactDiv

function createFriendElement(friend) {
  const friendDiv = document.createElement("div");
  friendDiv.className = "friendDiv";

  const profileImg = document.createElement("img");
  profileImg.className = "profile";
  profileImg.src = "";
  profileImg.alt = "Profile";

  const name = document.createElement("h5");
  name.textContent = friend.name;

  const messageBtn = document.createElement("button");
  messageBtn.textContent = "Send Message";
  messageBtn.addEventListener("click", () => {
    messageReceiverName.innerText = friend.name;
    messageReceiverId.value = friend.user_id;
    messagediv.style.visibility = "visible";
  });

  friendDiv.appendChild(profileImg);
  friendDiv.appendChild(name);
  friendDiv.appendChild(messageBtn);
  // friendRequestDiv.appendChild(rejectBtn);

  return friendDiv;
}

// Send message functionality
const messagediv = document.querySelector(".messagediv");
const messageCloseBtn = document.querySelector(".messageCloseBtn");
const messageReceiverName = document.querySelector(".messageReceiverName");
const messageReceiverId = document.querySelector(".messageReceiverId");

messageCloseBtn.addEventListener("click", () => {
  messagediv.style.visibility = "hidden";
});

//  ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
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

  // recipientID: messageReceiverId.value,
  // console.log(messageReceiverId.value);
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
