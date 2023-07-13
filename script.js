let personData = [];
// !Change to input pannel
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

//! Delete the User
deleteUser.addEventListener("click", function () {
  let targetId = prompt("Enter Target Id");
  let data = JSON.parse(localStorage.getItem("data"));
  let deleteIndex = 0;
  data.forEach((e, i) => {
    if (e.digit === targetId) {
      deleteIndex = i;
    }
  });
  if (deleteIndex >= 0) {
    data.splice(deleteIndex, 1);
    localStorage.setItem("data", JSON.stringify(data));
    //! hide Users
    indexData.innerText = "";
    nameData.innerText = "";
    ageData.innerText = "";
    emailData.innerText = "";
    eduData.innerText = "";
    digitData.innerText = "";
    alert("User Deleted Successfully (-_-)");
  } else {
    alert("Please Enter Valid Id");
  }
});

//! Generate User List Logic
generateBtn.addEventListener("click", function () {
  let givenData = JSON.parse(localStorage.getItem("data"));
  if (givenData.length < 1) {
    alert("Nothing to Display Please Add User!!");
  } else if (indexData.innerText.length > 0) {
    return alert("Already Generated!!");
  } else {
    //! Add data in form
    givenData.forEach((e, i) => {
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

// !Save Date from Inputs
Save.addEventListener("click", function (e) {
  // !Cheack if any input is empty or not
  let names = [];
  let emails = [];
  let digits = [];
  let data = JSON.parse(localStorage.getItem("data"));
  data.forEach((e) => {
    names.push(e.name);
    emails.push(e.email);
    digits.push(e.digit);
  });
  if (
    userName.value == "" ||
    age.value == "" ||
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
  } else if (names.includes(userName.value)) {
    alert("UserName already exists");
  } else if (emails.includes(email.value)) {
    alert("UserEmail already exists");
  } else if (age.value < 1) {
    alert("UserAge must be between 1 and 100");
  } else if (digits.includes(digit.value)) {
    alert("Id already exists");
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

    // !clear Display Data
    indexData.innerText = "";
    nameData.innerText = "";
    ageData.innerText = "";
    emailData.innerText = "";
    eduData.innerText = "";
    digitData.innerText = "";

    //! Change inputs
    buttonSection.classList.add("d-block");
    buttonSection.classList.remove("d-none");
    inputSection.classList.remove("d-block");
    inputSection.classList.add("d-none");
  }
});

// Login Logic
login.addEventListener("click", function () {
  login_input.classList.remove("d-none");
  login_input.classList.add("d-block");
  buttonSection.classList.add("d-none");
  buttonSection.classList.remove("d-block");

  loginForm.addEventListener("click", function () {
    let data = JSON.parse(localStorage.getItem("data"));
    let userLogin = loginUsername.value;
    let emailLogin = loginEmail.value;
    if (data.length === 0) {
      login_input.classList.remove("d-block");
      login_input.classList.add("d-none");
      buttonSection.classList.add("d-block");
      buttonSection.classList.remove("d-none");
      return alert("NO user Available Add User's");
    }
    let namesArr = [];
    let emailsArr = [];
    data.forEach((e) => {
      namesArr.push(e.name);
      emailsArr.push(e.email);
    });
    if (namesArr.indexOf(userLogin) == emailsArr.indexOf(emailLogin)) {
      alert(`${userLogin} is Logged in`);
      loginUsername.value = "";
      loginEmail.value = "";
      ifLogin.innerText = `Welcome ${userLogin}`;
      buttonSection.classList.add("d-block");
      buttonSection.classList.remove("d-none");
      login_input.classList.remove("d-block");
      login_input.classList.add("d-none");
      login.classList.add("d-none");
      logout.classList.add("d-block");
      logout.classList.remove("d-none");
    } else {
      alert("enter valid Name or email");
    }
  });
});

// logout logic
logout.addEventListener("click", function () {
  let confirmfromUser = confirm("Are you sure you want to logOut?");
  if (confirmfromUser) {
    ifLogin.innerText = "";
    login.classList.add("d-block");
    login.classList.remove("d-none");
    logout.classList.add("d-none");
    logout.classList.remove("d-block");
  }
});
