
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
    //captura lo que se escribio por el usuario
    let numeroDeUsuario = parseInt(document.getElementById( "valorUsuario" ).value);
     
    if(numeroSecreto === numeroDeUsuario){
        asignarTextoElementos('p',`Acertaste el número en ${intentos} ${intentos === 1? 'vez' : 'veces'}`)
        document.getElementById('reiniciar').removeAttribute('disabled');
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



