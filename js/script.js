const notifications = document.querySelector(".notifications");
// !Removing Toast
const removeToast = (toast) => {
  toast.classList.add("hide");
  if (toast.timeoutId) clearTimeout(toast.timeoutId);
  setTimeout(() => toast.remove(), 500);
};
// !Show toast
let showNotification = (message, type) => {
  const toast = document.createElement("li");
  toast.className = `toast1 ${type}`;
  toast.innerHTML = `<div class="column">
                      <i class="fa-solid fa-circle-${
                        type === "error"
                          ? "xmark"
                          : type === "info"
                          ? "info"
                          : "check"
                      }"></i>
                      <span>${message}</span>
                    </div>
                    <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
  notifications.appendChild(toast);
  toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
};
// !Change to input pannel
let personData = [];
addUser.addEventListener("click", function () {
  buttonSection.classList.toggle("d-none");
  inputSection.classList.toggle("d-none");
  if (localStorage.length === 0) {
    localStorage.setItem("data", JSON.stringify(personData));
  }
});

//! Delete the User
deleteUser.addEventListener("click", function () {
  let data = JSON.parse(localStorage.getItem("data"));
  if (data.length == 0) {
    return showNotification("No User's Available: Add User's", "warning");
  }

  let targetId = prompt("Enter Target Id");
  if (targetId == "" || targetId == undefined) return false;
  let names = [];
  let digits = [];
  let deletedName = "";
  data.forEach((e) => {
    names.push(e.name);
    digits.push(e.digit);
  });
  deletedName = names[digits.indexOf(targetId)];
  if (digits.includes(targetId)) {
    data.splice(digits.indexOf(targetId), 1);
    localStorage.setItem("data", JSON.stringify(data));
    //! hide Users
    indexData.innerText = "";
    nameData.innerText = "";
    ageData.innerText = "";
    emailData.innerText = "";
    eduData.innerText = "";
    digitData.innerText = "";
    showNotification(`User: "${deletedName}" Deleted Successfully`, "warning");
  } else {
    showNotification("Please Enter Correct ID", "error");
  }
});

//! Generate User List Logic
generateBtn.addEventListener("click", function () {
  if (localStorage.length === 0) {
    localStorage.setItem("data", JSON.stringify(personData));
  }

  let givenData = JSON.parse(localStorage.getItem("data"));

  if (givenData.length < 1) {
    showNotification("Nothing Available: Add Users.", "error");
  } else if (indexData.innerText.length > 0) {
    showNotification("Attention:  Already Generated!!", "info");
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
Save.addEventListener("click", function () {
  let names = [];
  let emails = [];
  let digits = [];
  let data = JSON.parse(localStorage.getItem("data"));
  data.forEach((e) => {
    names.push(e.name);
    emails.push(e.email);
    digits.push(e.digit);
  });
  if (userName.value == "" || education.value == "") {
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
  } else if (age.value < 1 || age.value > 100) {
    alert("UserAge must be between 1 and 100");
  } else if (digits.includes(digit.value)) {
    alert("Id already exists");
  } else if (digit.value.length < 4) {
    alert("Id must be 4 digits");
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
    inputs.forEach((e) => (e.value = ""));

    let h3 = document.querySelectorAll("h3");
    h3.forEach((e) => (e.innerText = ""));

    //! Change inputs
    buttonSection.classList.toggle("d-none");
    inputSection.classList.toggle("d-none");

    return showNotification("Congradulations: User Added", "success");
  }
});

// Login Logic
login.addEventListener("click", function () {
  let data = JSON.parse(localStorage.getItem("data"));
  if (data.length === 0) {
    return showNotification("No User's Available", "error");
  }

  login_input.classList.toggle("d-none");
  buttonSection.classList.toggle("d-none");

  loginForm.addEventListener("click", function () {
    let userLogin = loginUsername.value;
    let emailLogin = loginEmail.value;

    if (userLogin == "" || emailLogin == "") {
      return showNotification("Please Enter Full Details", "info");
    }
    let namesArr = [];
    let emailsArr = [];
    data.forEach((e) => {
      namesArr.push(e.name);
      emailsArr.push(e.email);
    });
    if (
      namesArr.includes(userLogin) &&
      emailsArr.includes(emailLogin) &&
      namesArr.indexOf(userLogin) == emailsArr.indexOf(emailLogin)
    ) {
      showNotification(`User: ${userLogin} is Logged in`, "success");
      loginUsername.value = "";
      loginEmail.value = "";
      ifLogin.innerText = `Welcome ${userLogin}`;
      buttonSection.classList.toggle("d-none");
      login_input.classList.toggle("d-none");
      logout.classList.toggle("d-none");
      login.classList.toggle("d-none");
    } else {
      return showNotification("Wrong Name & Email", "error");
    }
  });
});

// logout logic
logout.addEventListener("click", function () {
  let confirmfromUser = confirm("Are you sure you want to logOut?");
  if (confirmfromUser) {
    ifLogin.innerText = "";
    login.classList.toggle("d-none");
    logout.classList.toggle("d-none");
    return showNotification("You Have been Logged out", "warning");
  }
});
