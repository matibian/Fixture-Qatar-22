const formRegister = document.getElementById("formRegister");
console.log(formRegister)
formRegister.addEventListener("submit", (e) => {
  const email = document.getElementById("inputEmail");
  const username = document.getElementById("inputUsername");
  const password = document.getElementById("inputPassword");
  const error = document.getElementById("error");
  const correcto = document.getElementById("correcto");

  error.classList.add("d-none");
  correcto.classList.add("d-none");
  e.preventDefault();
  console.log(e);

  let request = {
    method: "POST",
    body: JSON.stringify({
      email: email.value,
      username: username.value,
      password: password.value,
    }),
  };

  fetch("http://fprode.nachofernan.com/api/register", request)
    .then((res) => res.json())
    .then((data) => {
      if (data.auth) {
        correcto.classList.remove("d-none");
        setTimeout(() => {
          window.location = "./login.html";
        }, 3000);
      } else {
        error.classList.remove("d-none");
      }
    })
    .catch((error) => console.error("Error: ", error));
});
