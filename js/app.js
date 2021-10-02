// Variable
const btnEnviar=document.getElementById('enviar')
const btnReset=document.querySelector('#resetBtn')
const formulario=document.querySelector('#enviar-mail')
let numeroErorres=1;
// variables para campos

const email=document.querySelector('#email')
const asunto=document.querySelector('#asunto')
const mensaje=document.querySelector('#mensaje')
const er= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListeners();
function eventListeners(params) {
    // cuando la app arranca
    document.addEventListener('DOMContentLoaded',iniciarApp)
    // campos formulario
    email.addEventListener('blur',validarFormulario) // blur es cuando entras a un formulario y sales
    asunto.addEventListener('blur',validarFormulario)
    mensaje.addEventListener('blur',validarFormulario)
    formulario.addEventListener('submit',enviarEmail)
   // resetear el form
   btnReset.addEventListener('click',resetearForm)
}

//funciones
function iniciarApp(params) {

   btnEnviar.disabled=true
   btnEnviar.classList.add('cursor-not-allowed','opacity-50')
}
function validarFormulario(e) {
    
    
    if ((e.target.value.length>0)) {
        //elimina los errores
        const error=document.querySelector('p.error')
        if(error !== null){ error.remove()}; 
        

        e.target.classList.remove('border','border-red-500')   
        e.target.classList.add('border','border-green-500')   
        
    } else{
        e.target.classList.remove('border','border-green-500')   
        e.target.classList.add('border','border-red-500')      
      
        
        mostrarError('Todos los campos son obligatorios');
    }
    if (e.target.type=== 'email') {
       
       if (er.test(email.value)) {
        const error=document.querySelector('p.error')
        if(error !== null){ error.remove()}; 
        

        e.target.classList.remove('border','border-red-500')   
        e.target.classList.add('border','border-green-500')  
           
           
        
       }else{

        e.target.classList.remove('border','border-green-500')   
        e.target.classList.add('border','border-red-500')      

            mostrarError('Email no valido');
           
       }    
      
        
        
    }
    if (er.test(email.value) && asunto.value!== '' && mensaje.value !=='') {
        btnEnviar.disabled=false
        btnEnviar.classList.remove('cursor-not-allowed','opacity-50')
        
    }else{
        btnEnviar.disabled=true
        btnEnviar.classList.add('cursor-not-allowed','opacity-50')
        
    }
   
    
}
function mostrarError(mensaje) {
    const mensajeError=document.createElement('p')
    mensajeError.textContent=mensaje;
    mensajeError.classList.add('border','border-red-500','background-color-100','text-red-500','p-3','mt-5','error')
    const errores=document.querySelectorAll('.error')
    if (errores.length===0) {
        formulario.appendChild(mensajeError)
    }
    
}

// funcion que resetea el formulario

function enviarEmail(e) {
    e.preventDefault();
   
    // mostrar el spinner
    const spinner=document.querySelector('#spinner')
    spinner.style.display='flex'

    // despues de 3 segundos ocultar el spinner
    setTimeout(() => {
       spinner.style.display='none'
       //mensaje que dice que se envio correctamente 
       const parrafo=document.createElement('p')
       parrafo.textContent=`El mensaje se envio correctamente a: ${email.value}`
       parrafo.classList.add('text-center','my-10','p.2','bg-green-500','text-white','font-bold')
       // inserta el parrafo antes del spinner
       formulario.insertBefore(parrafo,spinner)

       setTimeout(() => {
           // eliminar el mensaje de exito
           parrafo.remove();
           resetearForm();
       }, 5000);
        
    }, 3000);
}
// funcion que resetea el form
function resetearForm(params) {
    
    formulario.reset()
    iniciarApp();
}