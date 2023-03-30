const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const registerLink = document.getElementById("registerLink");

registerLink.addEventListener("click", function (e) {
  e.preventDefault();
  if (signupForm.classList.contains("hidden")) {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
  } else {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
  }
});

signupForm.addEventListener("submit", function (e) {
  // handle form submission
});

loginForm.addEventListener("submit", function (e) {
  // handle form submission
});
