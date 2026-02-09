gsap.registerPlugin(ScrollTrigger);

console.log("¡Script cargado!");

// Animamos todo lo que tenga la clase .parallax-img
gsap.to(".parallax-img", {
    y: 400, // Se desplazan 400px hacia abajo
    ease: "none",
    scrollTrigger: {
        trigger: ".parallax-container",
        start: "top top", 
        end: "+=1500", // El efecto dura 1500px de scroll
        scrub: 1,
        pin: true,    // Mantiene el contenedor fijo
        markers: true
    }
});