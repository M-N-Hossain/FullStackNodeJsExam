const profileLink = document.querySelector(".profileLink");

const userInfoDiv = document.querySelector(".userInfo");
const userInfoEmail = document.querySelector(".userInfoEmail");
const userInfoUsername = document.querySelector(".userInfoUsername");
const userInfoName = document.querySelector(".userInfoName");
const userInfoDate = document.querySelector(".userInfoDate");
const userInfoBtn = document.querySelector(".userInfoBtn");

profileLink.addEventListener("click", () => {
  userInfoDiv.style.visibility = "visible";
});

setTimeout(() => {
  fetch("http://localhost:8080/users/" + profileId.textContent)
    .then((response) => response.json())
    .then((result) => {
      userInfoEmail.value = result.data[0].email;
      userInfoUsername.value = result.data[0].username;
      userInfoName.value = result.data[0].name;
    });
}, 500);

// Update the user
function updateUser(user_id) {
  fetch("http://localhost:8080/users/" + user_id, {
    method: "PUT",
    body: JSON.stringify({
      email: userInfoEmail.value,
      username: userInfoUsername.value,
      name: userInfoName.value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      window.location.reload("http://localhost:8080/feed");
    });
}

userInfoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("clicked");
  setTimeout(() => {
    updateUser(profileId.textContent);
  }, 500);
});
