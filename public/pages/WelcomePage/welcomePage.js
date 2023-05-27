// Forms
const loginForm = document.querySelector(".loginForm");
const signupForm = document.querySelector(".signupForm");

// Buttons
const changeToSignupForm = document.querySelector(".changeToSignupForm");
const changeToLoginForm = document.querySelector(".changeToLoginForm");


changeToSignupForm.addEventListener("click", () => {
  loginForm.style.visibility = "hidden";
  signupForm.style.visibility = "visible";
});

changeToLoginForm.addEventListener("click", () => {
  signupForm.style.visibility = "hidden";
  loginForm.style.visibility = "visible";
});
