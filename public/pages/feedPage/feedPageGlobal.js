const logOutBtn = document.querySelector(".logOutBtn");

// function logOut(event) {
//   event.preventDefault();

//   fetch("http://localhost:8080/logout", {
//     method: "POST",
//   });
// }

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
