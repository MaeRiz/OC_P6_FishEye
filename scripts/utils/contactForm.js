const formDOM = document.querySelector("form");

// Keep focus in modal
const  focusableElements =
    'button, input, textarea, [tabindex]:not([tabindex="-1"])';
const modal = document.querySelector('#contact_modal'); // select the modal by it's id

const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
const focusableContent = modal.querySelectorAll(focusableElements);
const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal


document.addEventListener('keydown', function(e) {
  let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

  if (!isTabPressed || modal.style.display === "none") {
    return;
  }

  if (e.shiftKey) { // if shift key pressed for shift + tab combination
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // add focus for the last focusable element
      e.preventDefault();
    }
  } else { // if tab key is pressed
    if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
      firstFocusableElement.focus(); // add focus for the first focusable element
      e.preventDefault();
    }
  }
});


function displayModal() {
    const modal = document.getElementById("contact_modal");
    const mainDOM = document.querySelector("#main-photographer-page");
    const body = document.querySelector("body");

	modal.style.display = "block";
    mainDOM.setAttribute("aria-hidden", true);
    modal.setAttribute("aria-hidden", false);
    body.classList.add("no-scroll");
    firstFocusableElement.focus();
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    const mainDOM = document.querySelector("#main-photographer-page");
    const body = document.querySelector("body");

	modal.style.display = "none";
    mainDOM.setAttribute("aria-hidden", false);
    modal.setAttribute("aria-hidden", true);
    body.classList.remove("no-scroll");
}


document.addEventListener('keydown', event => {

    if (document.querySelector("#contact_modal").getAttribute("aria-hidden") == 'false') {
        
        if (event.key === "Escape") {
            closeModal();
        }
    }
 });

formDOM.surname.addEventListener('change', function() {
    checkField('name', this)
});
formDOM.name.addEventListener('change', function() {
    checkField('name', this)
});
formDOM.email.addEventListener('change', function() {
    checkField('email', this)
});
formDOM.message.addEventListener('change', function() {
    checkField('name', this)
});
  
const checkField = function(type, data) {
    let emailRegEx = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', 'g');
    let nameRegEx = new RegExp("^[a-z ,.'-]{2,}$" ,'i');
  
  
    if (type == 'email') {
        if (!emailRegEx.test(data.value)){
            data.nextElementSibling.innerHTML = 'Veuillez entrer une adresse email valide !';
            data.classList.add('field-error');
            return false;
        }
    } else if (type == 'name') {
        if (!nameRegEx.test(data.value)){
            data.nextElementSibling.innerHTML = 'Veuillez entrer plus de 2 carractères !';
            data.classList.add('field-error');
            return false
        }
    }
    data.nextElementSibling.innerHTML = ''
    data.classList.remove("field-error");
    return true
};

formDOM.addEventListener("submit", function(event) {
    event.preventDefault();
    let field_surname = checkField('name', formDOM.surname);
    let field_name = checkField('name', formDOM.name);
    let field_email = checkField('email', formDOM.email);
    let field_message = checkField('name', formDOM.message);
    if (field_surname && field_name && field_email && field_message) {
        closeModal();
        console.log(
            formDOM.surname.value, '\n',
            formDOM.name.value, '\n',
            formDOM.email.value, '\n',
            formDOM.message.value, '\n'
        );

    }
});
