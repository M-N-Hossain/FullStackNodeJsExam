const leftContent = document.querySelector(".leftContent");

// Function to create and append a user element

function createUserElement(user) {
  const userDiv = document.createElement("div");
  userDiv.className = "addFriendDiv";

  const profileImg = document.createElement("img");
  profileImg.className = "profile";
  profileImg.src = "";
  profileImg.alt = "Profile";

  const name = document.createElement("h5");
  name.textContent = user.name;

  const button = document.createElement("button");
  button.textContent = "Send Request";
  button.addEventListener("click", () => {
    sentFriendRequest(user);
  });

  userDiv.appendChild(profileImg);
  userDiv.appendChild(name);
  userDiv.appendChild(button);

  return userDiv;
}

// Fetch the users from the users API
fetch("http://localhost:8080/users")
  .then((response) => response.json())
  .then((data) => {
    const users = data.users;
    users.forEach((user) => {
      const userElement = createUserElement(user);
      leftContent.appendChild(userElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
  });

// Fetch the send friend request API
function sentFriendRequest(user) {
  fetch("http://localhost:8080/sentFriendRequests", {
    method: "POST",
    body: JSON.stringify({
      receiver_id: user.user_id,
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
