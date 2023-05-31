const rightContent = document.querySelector(".rightContent");

// Function to create and append a user element

function createFriendRequestElement(user) {
  const friendRequestDiv = document.createElement("div");
  friendRequestDiv.className = "friendRequestDiv";

  const profileImg = document.createElement("img");
  profileImg.className = "profile";
  profileImg.src = "";
  profileImg.alt = "Profile";

  const name = document.createElement("h5");
  name.textContent = user.name;

  const acceptBtn = document.createElement("button");
  acceptBtn.textContent = "Accept";
  const rejectBtn = document.createElement("button");
  rejectBtn.textContent = "Reject";

  friendRequestDiv.appendChild(profileImg);
  friendRequestDiv.appendChild(name);
  friendRequestDiv.appendChild(acceptBtn);
  friendRequestDiv.appendChild(rejectBtn);

  return friendRequestDiv;
}

// Fetch the users from the users API
fetch("http://localhost:8080/users")
  .then((response) => response.json())
  .then((data) => {
    const users = data.users;
    users.forEach((user) => {
      const friendRequestElement = createFriendRequestElement(user);
      rightContent.appendChild(friendRequestElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
  });
