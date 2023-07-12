let personData = [];
// Change to input pannel
addUser.addEventListener("click", function () {
  if (buttonSection.classList.contains("d-block")) {
    buttonSection.classList.add("d-none");
    inputSection.classList.remove("d-none");
    inputSection.classList.add("d-block");
  }
});

// Generate User List Logic
generateBtn.addEventListener("click", function () {});

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
    // let convertedData = JSON.stringify(data);
    personData.push(data);
    localStorage.setItem("data", JSON.stringify(personData));

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
let data = JSON.parse(localStorage.data);

data.forEach((e, i) => {
  let { name, age, education, digit, email } = e;
});
