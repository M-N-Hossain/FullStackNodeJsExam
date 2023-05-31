// Forms
const loginForm = document.querySelector(".loginForm");
const signupForm = document.querySelector(".signupForm");

// Buttons
const changeToSignupForm = document.querySelector(".changeToSignupForm");
const changeToLoginForm = document.querySelector(".changeToLoginForm");

// Changing form visibility
changeToSignupForm.addEventListener("click", () => {
  loginForm.style.visibility = "hidden";
  signupForm.style.visibility = "visible";
});

changeToLoginForm.addEventListener("click", () => {
  signupForm.style.visibility = "hidden";
  loginForm.style.visibility = "visible";
});

// fetching  log in api
function fetchLogInApi(event) {
  event.preventDefault();

  fetch("http://localhost:8080/login", {
    method: "POST",
    body: JSON.stringify({
      username: document.querySelector(".username-login").value,
      password: document.querySelector(".password-login").value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.Status === "user logged in") {
        window.location.replace("http://localhost:8080/feed");
        // if (document.cookie === process.env.SECRET_KEY) {
        // } else {
        //   alert("You are not authorized here. Let's log in");
        //   window.location.replace("http://localhost:8080");
        // }
      } else {
        alert(result.Error);
        window.location.replace("http://localhost:8080");
      }
    });
}

loginForm.addEventListener("submit", fetchLogInApi);

// fetching  Sign up api
function fetchSignUpApi(event) {
  event.preventDefault();

  console.log("I am inside fetch api");

  fetch("http://localhost:8080/signup", {
    method: "POST",
    body: JSON.stringify({
      email: document.querySelector(".email-signup").value,
      username: document.querySelector(".username-signup").value,
      password: document.querySelector(".password-signup").value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      if (result.Status === "a new user signed up") {
        alert("You have signed up. Let's Log in");
        window.location.replace("http://localhost:8080");
      } else {
        alert(result.Error);
        // Changing form visibility
        changeToSignupForm.addEventListener("click", () => {
          loginForm.style.visibility = "hidden";
          signupForm.style.visibility = "visible";
        });
      }
    });
}

signupForm.addEventListener("submit", fetchSignUpApi);
