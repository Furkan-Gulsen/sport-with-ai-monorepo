const contactForm = document.querySelector(".formContact");
let name = document.getElementById("name");
let subject = document.getElementById("subject");
let email = document.getElementById("email");
let message = document.getElementById("message");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = {
    name: name.value,
    subject: subject.value,
    email: email.value,
    message: message.value,
  };
  console.log(formData);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function () {
    console.log(xhr.responseText);
    if (xhr.responseText == "success") {
      alert("Email sent");
      name.value = "";
      subject.value = "";
      email.value = "";
      message.value = "";
    } else {
      alert("Something went wrong!");
    }
  };

  xhr.send(JSON.stringify(formData));
});
