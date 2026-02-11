gsap.registerPlugin(ScrollTrigger);

console.log("¡Script cargado!");

// Animamos todo lo que tenga la clase .parallax-img
gsap.to(".parallax-img", {
    y: 210, // Se desplazan Xpx hacia abajo
    ease: "none",
    scrollTrigger: {
        trigger: ".parallax-container",
        start: "top top", 
        end: "+=40", // El efecto dura Xpx de scroll
        scrub: 3,//suavidad
        pin: true,    // Mantiene el contenedor fijo
        markers: true
    }
});

gsap.to(".parallax-img-reverse", {
    y: -150, // Se desplazan hacia abajo
    ease: "none",
    scrollTrigger: {
        trigger: ".parallax-container",
        start: "bottom bottom", 
        end: "-=1500", // El efecto dura Xpx de scroll
        scrub: 3,
        pin: true,    // Mantiene el contenedor fijo
        markers: true//guias BORRAR AL FINAL!!!!!!!!!!!!!!!!!!!!!!!!!<--------
    }
});


//A continuacion SCRIPT para interaccion de FORMULARIO - BACKEND-------------------------------------------------------------

const formulario = document.querySelector('form'); //1º) SELECCIONAR EL FORM con el que voy a trabajar sus datos.

formulario.addEventListener('submit', async (e) => { //2º)AÑADO EVENTO DE ESCUCHA a form, para que cuando submit se clicke ejecute la funcion que le paso como segundo parametro.
                                                    //ASYNC porque dentro de la funcion voy a hacer una peticion al backend que es asincrona, y necesito usar await para esperar a que me responda el backend antes de seguir ejecutando el codigo.
                                                    //(e) porque necesito el evento para evitar que el formulario se envie de forma tradicional, es decir, que recargue la pagina, para poder enviar los datos al backend de forma asincrona.
    
    e.preventDefault();                             //<--- aqui evito que el formulario se envie de forma tradicional y recargue la pagina.

    const datos ={                                      //3º) RECOGIDA DE DATOS DEL FORMULARIO: creo objeto con los datos que quiero enviar 
                                                        // al backend, y los recojo del formulario usando querySelector para 
                                                        // seleccionar cada input por su name, y luego .value para obtener su valor.
        nombre: formulario.querySelector('input[name="nombre"]').value,
        email:formulario.querySelector('input[name="email"]').value,
        telefono:formulario.querySelector('input[name="telefono"]').value,
        mensaje:formulario.querySelector('textarea[name="mensaje"]').value
    };

    console.log("Enviando datos:", datos);              //comprobacion de consola para ver que los datos se recogen correctamente del formulario.

            try{                                        // 4º) EJECUCION DEL ENVIO: intenta ejecutar todo el codigo dentro de este bloque, y si hay algun error, lo captura y lo muestra en la consola.
                const respuesta = await fetch('http://localhost:3000/api/contact', {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body: JSON.stringify(datos)         //5º) ESTO CONVIERTE EL OBJETO JS EN UN TEXTO JSON PARA ENVIARLO AL BACKEND, YA QUE EL BACKEND ESPERA RECIBIR LOS DATOS EN FORMATO JSON.
            });

            const resultado = await respuesta.json(); //6º)PROCESO INVERSO A ANTES pero con la respuesta. 
                                                        // Espero a que el backend me responda con un mensaje en formato json, 
                                                        // y lo convierto en un objeto javascript para poder trabajar con el.

            if (respuesta.ok){                          //RESPUESTA.OK = si el servidor responde con codigo de exito (200-299) entonces hago lo siguiente, sino muestro un mensaje de error.
                alert("Mensaje enviado con éxito");
                formulario.reset();                     //aqui reseteo el formulario para que se borren los datos despues de enviarlos.
            }else{
                alert("Error al enviar el mensaje: " + resultado.error);
            }

    }catch(error){                                  //este es el control del TRY
        console.error("Error de conexion", error);
        alert("Parece que el servidor está apagado. para encenderlo ejecute en la carpeta backend: node server.js ");
    }

});


//SIGUIENTE PASO: enlazar bbdd con la galeria para importar fotos automaticamente al cargar la pagina.
//A continuacion SCRIPT para interaccion de GALERIA - BACKEND-------------------------------------------------------------

const cargarGaleria = async() =>{                   //al crear una funcion asincrona (async) permitimos usar luego await. 
                                                    // Esto es util para web que acceden a servidor porque tarda unos milisegundos en cargar, 
                                                    // de esta forma el resto del contenido de la web no se detiene tambien ese tiempo.

    const contenedor = document.querySelector('.grillaFotos');//Busco el div que incluirá la info
    if (!contenedor) return;                        //esto es el Guard Clause, asegura que si no existe el contenedor seleccionado no siga.

    try{ //intentta pero si el server esta apagado hace el catch
        
        const respuesta = await fetch('http://localhost:3000/api/galeria');//envia una peticion GET al lugar del servidor donde se guardan las fotos
        const fotos = await respuesta.json(); //AWAIT espera a que responda y crea un array de objetos con el resultado

        contenedor.innerHTML='';                    //Limpiar el html original para introducir lo nuevo


        fotos.forEach(foto =>{                      //FOREACH recorre cada elemento del array fotos (el json del resultado)
            const img = document.createElement('img');//esta const crea un elemento img en la memoria del navegador.
            img.src=foto.ruta_url;                  //por cada foto del array, crea un elemento img y le da el valor 
            img.alt=foto.titulo;                    //src=ruta_url y alt=titulo a las propiedades de la img que se creará en html
            img.className='imagenGrilla';           //Para mantener la clase css original
            contenedor.appendChild(img);            //Crea nodos hijos al div donde irán los img creados
         });

    } catch (error) {
        console.error("Error cargando galeria",error);
    }
};

document.addEventListener('DOMContentLoaded',cargarGaleria); //Esto es el DISPARADOR del evento, 
                                                             // cuando carga el Dom del html ejecuta cargarGaleria.








//SIGUIENTE PASO: hacer que la bbdd envíe los datos de "contacto" en un documento legible para el cliente que encargó la web, para que pueda ver los mensajes que le han enviado a través del formulario de contacto.

