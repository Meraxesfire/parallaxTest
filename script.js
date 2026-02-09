gsap.registerPlugin(ScrollTrigger);

console.log("¡Script cargado!");

// Animamos todo lo que tenga la clase .parallax-img
gsap.to(".parallax-img", {
    y: 210, // Se desplazan 400px hacia abajo
    ease: "none",
    scrollTrigger: {
        trigger: ".parallax-container",
        start: "top top", 
        end: "+=40", // El efecto dura 1500px de scroll
        scrub: 3,
        pin: true,    // Mantiene el contenedor fijo
        markers: true
    }
});

gsap.to(".parallax-img-reverse", {
    y: -90, // Se desplazan 400px hacia abajo
    ease: "none",
    scrollTrigger: {
        trigger: ".parallax-container",
        start: "bottom bottom", 
        end: "-=500", // El efecto dura 1500px de scroll
        scrub: 3,
        pin: true,    // Mantiene el contenedor fijo
        markers: true
    }
});