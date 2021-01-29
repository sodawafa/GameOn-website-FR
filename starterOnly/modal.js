function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modal = document.querySelector(".modal"),
    modalBtn = document.querySelectorAll(".modal-btn"),
    closebtn = document.querySelector('.close');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

closebtn.addEventListener('click', function () {
    closeModal();
});

// launch modal form
function launchModal() {
    modal.style.display = "block";
    initializeValidation();
}

function closeModal() {
    modal.style.display = 'none';
}


let firstName = document.getElementById('first'),
    lastName = document.getElementById('last'),
    email = document.getElementById('email'),
    birthDate = document.getElementById('birthdate'),
    quantity = document.getElementById('quantity'),
    cities = document.getElementsByName('location');

/**
 *
 * @param elem
 * @param message
 */
function sendError(elem, message = 'Merci de remplire ce champ') {
    let error = elem.parentElement.querySelector('.error');
    error.innerHTML = message;
}

/**
 *
 * @description S'il y a un message d'erreur affiché et que le champ est valide, on retire l'erreur
 * @param input
 * @returns {boolean}
 */
function chekError(input) {
    if (input.validity.valid) {
        input.classList.remove('invalid');
        sendError(input, '');
        console.log('valid');
        return false;
    } else {
        input.classList.add('invalid');
        sendError(input);
        console.log('invalid');
        return true
    }
}

/**
 *
 * @description Chaque fois que l'utilisateur saisit quelque chose on vérifie la validité du champ e-mail.
 */
function initializeValidation() {
    firstName.addEventListener("input", function (event) {
        chekError(firstName);
    }, false);
    lastName.addEventListener("input", function (event) {
        chekError(lastName);
    }, false);
    email.addEventListener("input", function (event) {
        chekError(email);
    }, false);
    birthDate.addEventListener("input", function (event) {
        chekError(birthDate);
    }, false);
    quantity.addEventListener("input", function (event) {
        chekError(quantity);
    }, false);
}

function validate() {
    let testForm = true;
    let error;
    if (
        chekError(firstName) ||
        chekError(lastName) ||
        chekError(birthDate) ||
        chekError(email) ||
        chekError(quantity)
    ) {
        testForm = false;

    }

    if (cities[0].checked || cities[1].checked || cities[2].checked || cities[3].checked || cities[4].checked || cities[5].checked) {
        sendError(cities[0], "Vous devez choisir une ville")
        testForm = false;
    }
    let checkBox = document.getElementById('checkbox1');
    if (checkBox.checked == false) {
        testForm = false;
    }

    return testForm;
}




