const notifications = document.querySelector(".notifications");
// Removing Toast
const removeToast = (toast) => {
  toast.classList.add("hide");
  if (toast.timeoutId) clearTimeout(toast.timeoutId);
  setTimeout(() => toast.remove(), 500);
};

// !Change to input pannel
let personData = [];
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
  let data = JSON.parse(localStorage.getItem("data"));
  if (data.length == 0) return alert("there is no User Available");

  let targetId = prompt("Enter Target Id");
  let deleteIndex = 0;
  if (targetId == "" || targetId == undefined) return false;
  let names = [];
  let deletedName = "";
  data.forEach((e, i) => {
    names.push(e.name);
    if (e.digit === targetId) {
      deleteIndex = i;
    } else {
      deleteIndex = -1;
    }
  });

  deletedName = names[deleteIndex];
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
    (() => {
      const toast = document.createElement("li");
      toast.className = `toast1 warning`;
      toast.innerHTML = `<div class="column">
                         <i class="fa-solid fa-triangle-exclamation"></i>
                         <span>User: "${deletedName}" Deleted Successfully</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
      notifications.appendChild(toast);
      toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
    })();
  } else {
    (() => {
      const toast = document.createElement("li");
      toast.className = `toast1 error`;
      toast.innerHTML = `<div class="column">
                         <i class="fa-solid fa-circle-xmark"></i>
                         <span>Please Enter Correct ID</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
      notifications.appendChild(toast);
      toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
    })();
  }
});

//! Generate User List Logic
generateBtn.addEventListener("click", function () {
  if (localStorage.length === 0) {
    localStorage.setItem("data", JSON.stringify(personData));
  }

  let givenData = JSON.parse(localStorage.getItem("data"));

  if (givenData.length < 1) {
    (() => {
      const toast = document.createElement("li");
      toast.className = `toast1 error`;
      toast.innerHTML = `<div class="column">
                         <i class="fa-solid fa-circle-xmark"></i>
                         <span>Nothing Available: Add Users.</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
      notifications.appendChild(toast);
      toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
    })();
  } else if (indexData.innerText.length > 0) {
    (() => {
      const toast = document.createElement("li");
      toast.className = `toast1 info`;
      toast.innerHTML = `<div class="column">
                         <i class="fa-solid fa-circle-info"></i>
                         <span>Attention:  Already Generated!!</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
      notifications.appendChild(toast);
      toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
    })();
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

    // Show Toast
    (() => {
      const toast = document.createElement("li");
      toast.className = `toast1 success`;
      toast.innerHTML = `<div class="column">
                         <i class="fa-solid fa-circle-check"></i>
                         <span>Congradulations: User Added</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
      notifications.appendChild(toast);
      toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
    })();
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
      return (() => {
        const toast = document.createElement("li");
        toast.className = `toast1 error`;
        toast.innerHTML = `<div class="column">
                           <i class="fa-solid fa-circle-xmark"></i>
                           <span>No User's Available</span>
                        </div>
                        <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
        notifications.appendChild(toast);
        toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
      })();
    } else if (userLogin == "" || emailLogin == "") {
      return (() => {
        const toast = document.createElement("li");
        toast.className = `toast1 info`;
        toast.innerHTML = `<div class="column">
                           <i class="fa-solid fa-circle-info"></i>
                           <span>Please Enter Full Details</span>
                        </div>
                        <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
        notifications.appendChild(toast);
        toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
      })();
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
      (() => {
        const toast = document.createElement("li");
        toast.className = `toast1 success`;
        toast.innerHTML = `<div class="column">
                           <i class="fa-solid fa-circle-check"></i>
                           <span>User: ${userLogin} is Logged in</span>
                        </div>
                        <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
        notifications.appendChild(toast);
        toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
      })();
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
      return (() => {
        const toast = document.createElement("li");
        toast.className = `toast1 error`;
        toast.innerHTML = `<div class="column">
                           <i class="fa-solid fa-circle-xmark"></i>
                           <span>Wrong Name & Email</span>
                        </div>
                        <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
        notifications.appendChild(toast);
        toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
      })();
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
    (() => {
      const toast = document.createElement("li");
      toast.className = `toast1 warning`;
      toast.innerHTML = `<div class="column">
                         <i class="fa-solid fa-triangle-exclamation"></i>
                         <span>You Have been Logged out</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
      notifications.appendChild(toast);
      toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
    })();
  }
});
