let personData = [];
// Change to input pannel
addUser.addEventListener("click", function () {
  if (buttonSection.classList.contains("d-block")) {
    buttonSection.classList.add("d-none");
    inputSection.classList.remove("d-none");
    inputSection.classList.add("d-block");
  }
  if (localStorage.length === 0) {
    localStorage.setItem("data", JSON.stringify(personData));
  }
});

// Generate User List Logic
generateBtn.addEventListener("click", function () {
  if (localStorage.length === 0) {
    alert("Please Enter Users");
  } else {
    let data = JSON.parse(localStorage.getItem("data"));
    data.forEach((e, i) => {
      let { name, age, email, education, digit } = e;
      let forIndex = document.createElement("h3");
      forIndex.innerText = `${i + 1} :-`;
      indexData.append(forIndex);

      let forName = document.createElement("h3");
      forName.innerText = `${name}`;
      nameData.append(forName);

      let forAge = document.createElement("h3");
      forAge.innerText = `${age}`;
      ageData.append(forAge);

      let forEmail = document.createElement("h3");
      forEmail.innerText = `${email}`;
      emailData.append(forEmail);

      let forEdu = document.createElement("h3");
      forEdu.innerText = `${education}`;
      eduData.append(forEdu);

      let fordigit = document.createElement("h3");
      fordigit.innerText = `${digit}`;
      digitData.append(fordigit);
    });
  }
});

// Save Date from Inputs
Save.addEventListener("click", function (e) {
  // Cheack if any input is empty or not
  if (
    userName.value == "" ||
    userName.value == "" ||
    email.value == "" ||
    education.value == "" ||
    digit.value == ""
  ) {
    alert("Please enter Full details");
  } else if (!email.value.includes("@gmail.com")) {
    alert("Please enter valid email address");
  } else if (!digit.value.match(/[1234567890]/g) && digit.value.length === 4) {
    alert("Digit value must be a 4 digit number");
  } else if (!age.value.match(/[1234567890]/g)) {
    alert("age must be a numbers");
  } else {
    let data = {
      name: userName.value,
      age: age.value,
      email: email.value,
      education: education.value,
      digit: digit.value,
    };

    let array = JSON.parse(localStorage.getItem("data"));
    array.push(data);
    localStorage.setItem("data", JSON.stringify(array));

    let inputs = document.querySelectorAll("input");
    inputs.forEach((e) => {
      e.value = "";
    });
    // Change inputs
    buttonSection.classList.add("d-block");
    buttonSection.classList.remove("d-none");
    inputSection.classList.remove("d-block");
    inputSection.classList.add("d-none");
  }
});

// data.forEach((e, i) => {
//   let { name, age, education, digit, email } = e;
// });
