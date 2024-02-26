let numeroSecreto = 0;
let intentos = 0;
let arrNumerosSorteados = [];
let numeroMaximo = 10;

//recibe dos string como parametro, uno es el elemento y el otro texto a mostrar.
function asignarTextoElementos (elemento , texto){
    let titulo = document.querySelector(elemento);
    titulo.innerHTML = texto;
}

//para darle funcionalidad al boton de intentar en el juego
function verificarIntento(){
     // Captura lo que se escribió por el usuario
     let valorInput = document.getElementById("valorUsuario").value.trim(); // Elimina espacios en blanco al inicio y al final
     // Convertir el valor a número
     let numeroDeUsuario = parseInt(valorInput);
     // Obtener el elemento <p> del mensaje de error
     let mensajeError = document.querySelector('.texto__parrafo');
     // Verificar si el número ingresado está dentro del rango permitido o si el input está vacío
     if (valorInput === "" || numeroDeUsuario < 1 || numeroDeUsuario > numeroMaximo || isNaN(numeroDeUsuario)) {
         // Mostrar mensaje de error correspondiente
         if (valorInput === "") {
             asignarTextoElementos('p.texto__parrafo', "Por favor, ingresa un número.");
         } else {
             asignarTextoElementos('p.texto__parrafo', `Por favor, ingresa un número dentro del rango de 1 a ${numeroMaximo}.`);
         }
         mensajeError.classList.add('error-message');
         limpiarInput();
         return;
    }
    // Si el número ingresado está dentro del rango, eliminar la clase de error
    mensajeError.classList.remove('error-message');
     
    if(numeroSecreto === numeroDeUsuario){
        asignarTextoElementos('p',`Acertaste el número en ${intentos} ${intentos === 1? 'vez' : 'veces'}`)
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('intento').setAttribute( 'disabled', 'true' );
    }else{
        if(numeroSecreto  > numeroDeUsuario){
            asignarTextoElementos('p', 'El número secreto es mayor');
        }else {
            asignarTextoElementos('p', 'El número secreto es menor');
        }
        intentos++;
        limpiarInput();
    }
     
}

//resetea las condiciones y mensajes iniciales del juego 
function condicionesIniciales(){
    asignarTextoElementos('h1','Juego del número secreto');
    asignarTextoElementos('p',`indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

//para reiniciar el juego desde boton
function reiniciarJuego(){
    //limpiar el input
    limpiarInput();
    //indicar mensaje de intervalo numeros
    //generar numero secreto
    //inicializar intentos
    condicionesIniciales();
    //deshabilitar el boton de nuevo juego
    document.getElementById('reiniciar').setAttribute('disabled','true');
    document.getElementById('intento').removeAttribute('disabled');
}

//limpia el input cuando el numero no es el correcto.
function limpiarInput(){
    document.querySelector('#valorUsuario').value =  '';
}

//genera numero random o secreto
function generarNumeroSecreto(){

   let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

   if(arrNumerosSorteados.length === numeroMaximo){
    asignarTextoElementos('p', 'Se han sorteado todos los números posibles');
   }else{
        if(arrNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }else{
            arrNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;   
        }
   }
}

condicionesIniciales();



