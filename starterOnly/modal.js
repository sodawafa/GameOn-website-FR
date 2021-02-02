const ageMin = 10;

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
    modalContent = document.querySelector(".modal > .content");
modalBtn = document.querySelectorAll(".modal-btn"),
    closebtn = document.querySelector('.close'),
    main = document.querySelector(".hero-section");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

closebtn.addEventListener('click', function () {
    closeModal();
});

// launch modal form
function launchModal() {
    main.classList.add("flou");
    modal.style.display = "block";
    initializeValidation();
}

function closeModal() {
    main.classList.remove("flou");
    modal.style.display = 'none';
}


let firstName = document.getElementById('first'),
    lastName = document.getElementById('last'),
    email = document.getElementById('email'),
    birthDate = document.getElementById('birthDate'),
    quantity = document.getElementById('quantity'),
    cities = document.getElementsByName('location'),
    termsOfUse = document.getElementById('termsOfUse');


setTestValue();

function setTestValue() {
    firstName.value = "Wafa";
    lastName.value = "Soo";
    email.value = "wsoo@gmail.com"
    birthDate.valueAsDate = new Date("1999-12-12");
    quantity.valueAsNumber = 1;
    cities[0].checked = true;
}


/**
 *
 * @param elem
 * @param message
 */
function sendError(elem, message = 'Merci de remplire ce champ') {
    let error = elem.parentElement.querySelector('.error');
    if (error !== undefined) {
        if (message.length > 0) {
            error.innerHTML = message;
            error.style.display = "block";
        } else {
            error.innerHTML = message;
            error.style.display = "none";
        }

    } else alert(message);
}

/**
 *
 * @description verifier les erreurs sur les inputs et afficher l'erreur
 * @param input
 * @returns {boolean}
 */
function checkError(input) {
    if (input.validity.valid) {
        input.classList.remove('invalid');
        sendError(input, '');
        return false;
    } else {
        input.classList.add('invalid');
        sendError(input);
        return true
    }
}


/**
 * @description verifier les erreurs sur les inputs radio
 * @param inputs
 * @param message
 * @returns {boolean|*}
 */
function checkErrorInputs(inputs, message) {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            sendError(inputs[i], '');
            return inputs[i];
        }
    }
    sendError(inputs[0], message);
    return false;
    /*inputs.forEach(input => {
      if(input.checked) this.result = input;
    });*/
}

function checkErrorBirthDate(date) {
    let today = new Date();
    if (today.getFullYear() - date.getFullYear() < ageMin) {
        sendError(birthDate, 'Pour vous inscrire à cet événement, vous devez avoir plus de 10 ans')
        return true;
    } else {
        sendError(birthDate, '');
        return false;
    }
}

/**
 *
 * @description Chaque fois que l'utilisateur saisit quelque chose on vérifie la validité du champ e-mail.
 */
function initializeValidation() {
    firstName.addEventListener("input", function (event) {
        checkError(firstName);
    }, false);
    lastName.addEventListener("input", function (event) {
        checkError(lastName);
    }, false);
    email.addEventListener("input", function (event) {
        checkError(email);
    }, false);
    birthDate.addEventListener("input", function (event) {
        checkError(birthDate);
    }, false);
    quantity.addEventListener("input", function (event) {
        checkError(quantity);
    }, false);
}

/**
 * @description validation formulaire
 * @returns {boolean}
 */
function validate() {
    let testForm = true;
    if (
        checkError(firstName) ||
        checkError(lastName) ||
        checkError(birthDate) ||
        checkError(email) ||
        checkError(quantity) ||
        (checkErrorInputs(cities, "Vous devez choisir une ville") === false) ||
        (checkErrorBirthDate(birthDate.valueAsDate))
    ) {
        testForm = false;
    }

    if (termsOfUse.checked === false) {
        alert("Vous devez accepter les conditions d'utilisation");
        testForm = false;
    }

    /*envoie des données et message de confirmation*/
    if (testForm)
        sendData();

    /*bloqué le rechargement de la page*/
    return false;
}


function sendData() {
    modalContent.classList.add("content-success");
    document.getElementById('myForm').style.display = "none";
    document.getElementById("loader").style.display = "block";
    /*on va executer la fonction (showConfirmation) message de confirmation aprés 2secondes*/
    setTimeout(showConfirmation, 2000);
}

function showConfirmation() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("confirmation").style.display = "block";
    /*on va fermé le modal aprés 3secondes*/
    setTimeout(closeModal, 3000);
}



