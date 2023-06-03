// const rightContent = document.querySelector(".rightContent");
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

  friendRequestDiv.appendChild(profileImg);
  friendRequestDiv.appendChild(name);
  friendRequestDiv.appendChild(acceptBtn);
  friendRequestDiv.appendChild(rejectBtn);

  return friendRequestDiv;
}

// Fetch the users from the users API
fetch("http://localhost:8080/recieveFriendRequests")
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

  // const acceptBtn = document.createElement("button");
  // acceptBtn.textContent = "Accept";
  // acceptBtn.addEventListener("click", () => {
  //   addToFriendList(user.user_id);
  // });

  // const rejectBtn = document.createElement("button");
  // rejectBtn.textContent = "Reject";

  friendDiv.appendChild(profileImg);
  friendDiv.appendChild(name);
  // friendRequestDiv.appendChild(acceptBtn);
  // friendRequestDiv.appendChild(rejectBtn);

  return friendDiv;
}