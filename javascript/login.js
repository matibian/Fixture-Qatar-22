const formLogin = document.getElementById("formLogin")
formLogin.addEventListener("submit", (e) => {
  const email = document.getElementById("inputEmail");
  const password = document.getElementById("inputPassword");
  const error = document.getElementById("error");
  e.preventDefault();
  console.log(e);

  let request = {
    method: "POST",
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  };


  fetch("http://fprode.nachofernan.com/api/login", request)
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        const userKey = JSON.stringify(data);
        localStorage.setItem("user", userKey);
        window.location = "../index.html";
      } else {
        error.classList.remove("d-none");
      }
    })
    .catch((error) => console.error("Error:", error));
});
