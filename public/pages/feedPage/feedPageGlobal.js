const logOutBtn = document.querySelector(".logOutBtn");

logOutBtn.addEventListener("click", () => {
  fetch("http://localhost:8080/logout")
    .then((response) => response.json())
    .then((result) => {
      if (result.Status === "token is deleted") {
        window.location.replace("http://localhost:8080");
      } else {
        console.log("Can not logged out");
      }
    })
    .catch((error) => {
      console.error("Error fetching log out API:", error);
    });
});

const profileName = document.querySelector(".profileName");
fetch("http://localhost:8080/usersProfileName")
  .then((response) => response.json())
  .then((result) => {
    profileName.textContent = result.data[0].name;
  })
  .catch((err) => console.log(err));
