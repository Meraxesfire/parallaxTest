gsap.registerPlugin(ScrollTrigger);

console.log("¡Script cargado!");

// Animamos todo lo que tenga la clase .parallax-img
gsap.to(".parallax-img", {
    y: 80, // Se desplazan 400px hacia abajo
    ease: "none",
    scrollTrigger: {
        trigger: ".parallax-container",
        start: "top top", 
        end: "+=200", // El efecto dura 1500px de scroll
        scrub: 3,
        pin: true,    // Mantiene el contenedor fijo
        markers: true
    }
});