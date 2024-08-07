/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById('nav-toggle'),
          nav = document.getElementById('nav-menu');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');            
        });
    }
}

showMenu('nav-toggle','nav-menu');

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href="#' + sectionId + '"]');
        
        if (sectionsClass) { 
            if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
                sectionsClass.classList.add('active-link');
            } else {
                sectionsClass.classList.remove('active-link');
            }                                                    
        }
    });
    
}

window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text, .proyect__container',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img , .cert-grid',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__item, .contact__input',{interval: 200}); 



/*==================== FORM VALIDATION ====================*/
/* Función cuando se envía el formulario */
emailjs.init('WfoWJlZTFieRfi82v');
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formulario-contacto").addEventListener("submit", function(event) {
        event.preventDefault(); 
        if (validarFormulario()) {
            enviarCorreo();
        }
    });
});

function validarFormulario() {
    var nombre = document.getElementById("nombre").value.trim();
    var correo = document.getElementById("correo").value.trim();
    var consulta = document.getElementById("consulta").value.trim();

    if (!nombre || !correo || !consulta) {
        mostrarMensajeError("Todos los campos son obligatorios");
        return false;
    }

    // Validar el campo de mensaje
    if (consulta.length < 10) {
        mostrarMensajeError("El mensaje debe tener al menos 10 caracteres.");
        return; // Detener el proceso si el mensaje es demasiado corto
    }
    // Validar el campo de correo electrónico
    var formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoCorreo.test(correo)) {
        mostrarMensajeError("Por favor, introduce un correo electrónico válido.");
        return; // Detener el proceso si el correo electrónico no es válido
    }
    ocultarMensajes();
    return true;
}

function enviarCorreo() {
    emailjs.send("service_cczrp1m", "template_m4u51nf", {
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        consulta: document.getElementById("consulta").value
    })
    .then(function(response) {
        console.log("Correo enviado con éxito, en breves nos pondremos en contacto!", response);
        mostrarMensajeExito();
        limpiarCampos();
    }, function(error) {
        console.log("Error al enviar el correo", error);
        mostrarMensajeError("Ocurrió un error al enviar el correo. Por favor, inténtalo de nuevo más tarde.");
        limpiarCampos();
    });
}

function mostrarMensajeExito() {
    var mensajeExito = document.getElementById("mensaje-exito");
    mensajeExito.style.display = "block";
    // Ocultar el mensaje de éxito después de 5 segundos
    setTimeout(function() {
        mensajeExito.style.display = "none";
    }, 3000);
}

function mostrarMensajeError(mensaje) {
    var mensajeError = document.getElementById("mensaje-error");
    mensajeError.innerText = mensaje;
    mensajeError.style.display = "block";
    // Ocultar el mensaje de error después de 5 segundos
    setTimeout(function() {
        mensajeError.style.display = "none"; // Aquí se corrige el error
    }, 3000);
}

function ocultarMensajes() {
    var mensajeExito = document.getElementById("mensaje-exito");
    var mensajeError = document.getElementById("mensaje-error");
    mensajeExito.style.display = "none";
    mensajeError.style.display = "none";
}

function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("consulta").value = "";
}

